# Guia de deploy — La Porteña

Tres piezas independientes:

| Pieza | Que es | Donde puede ir |
|---|---|---|
| Frontend (`laporteniafront`) | SPA estatica de Quasar/Vue | Cloudflare Pages, Netlify, Vercel, nginx |
| Backend (`porteniabackend`) | API Express + Sequelize | Render, Railway, Fly.io, VPS |
| Base de datos | PostgreSQL 16 | Neon, Supabase, Render, el mismo VPS |

El backend genera los PDF y Excel en memoria y los streamea en la respuesta:
**no necesita disco persistente**, cualquier hosting efimero sirve.

---

## 1. Variables de entorno del backend

Ver [.env.example](.env.example). En produccion:

| Variable | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | lo inyecta el hosting; el codigo ya lo respeta |
| `DATABASE_URL` | connection string que te da el proveedor de Postgres |
| `DB_SSL` | `true` (obligatorio en Postgres manejados) |
| `JWT_SECRET` | uno **nuevo**, generado con `openssl rand -hex 64` |
| `JWT_EXPIRES_IN` | `8h` |
| `CORS_ORIGIN` | URL exacta del frontend, **sin barra final** |

`DATABASE_URL` tiene prioridad sobre `DB_HOST`/`DB_NAME`/etc. En local se siguen
usando las variables sueltas, no hace falta cambiar nada.

> Generar un `JWT_SECRET` distinto al de desarrollo. Si se reutiliza, cualquier
> token emitido en tu maquina sirve tambien contra produccion.

---

## 2. Migrar la base de datos

**Importante:** la tabla `SequelizeMeta` no existe en la base actual. Las 21
migraciones de [migrations/](migrations/) nunca se aplicaron con `sequelize-cli`
— el schema vigente salio de un dump SQL. Por eso **no corras `npm run migrate`
contra una base vacia esperando que reproduzca el estado actual**: el camino
confiable es dump + restore.

La base pesa ~10 MB, entra en cualquier free tier.

### Exportar desde local

```bash
pg_dump --no-owner --no-privileges -Fc -U portenia_app -d LaPortenia2 -f laportenia.dump
```

`--no-owner --no-privileges` evita que el restore falle por roles que no existen
en el servidor destino.

### Importar al servidor

```bash
pg_restore --no-owner --no-privileges -d "postgresql://usuario:pass@host/basededatos" laportenia.dump
```

Verificar que quedaron las 21 tablas:

```sql
SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';
```

> Si el proveedor corre PostgreSQL 16 o superior, el dump es compatible
> (tu servidor local es 16.6). Con un destino de version menor, usar
> `pg_dump --format=plain` y revisar el SQL.

---

## 3. Deploy del backend

Requisitos que ya estan resueltos en el repo:

- `npm start` ejecuta `node app.js`
- `engines.node` declara `>=20`
- `app.listen` escucha en todas las interfaces
- SSL configurable via `DB_SSL`

Pasos genericos en cualquier PaaS:

1. Conectar el repo, root directory `porteniabackend`
2. Build command: `npm install` — Start command: `npm start`
3. Cargar las variables de entorno de la seccion 1
4. Deployar y probar:

```bash
curl -X POST https://TU-BACKEND/api/login \
  -H "Content-Type: application/json" \
  -d '{"Usuario":"Gasti","Contrasenia":"TU_PASSWORD"}'
```

Tiene que devolver un `token`.

---

## 4. Deploy del frontend

### La URL del backend se hornea en el build

`API_BASE_URL` se lee en build time desde `.env.prod`. Cambiarla despues del
build **no tiene efecto**: hay que recompilar.

Antes de buildear, editar `.env.prod`:

```
API_BASE_URL=https://TU-BACKEND/api
```

Luego:

```bash
npm install
npm run build      # genera dist/spa
```

Publicar el contenido de `dist/spa`. En Cloudflare Pages / Netlify:

- Build command: `npm run build`
- Output directory: `dist/spa`

### Fallback del SPA

El router usa `createWebHistory`, asi que el servidor tiene que devolver
`index.html` en cualquier ruta desconocida. Sin esto, entrar directo a
`/adminHome/remitos` o refrescar la pagina da 404.

- **Netlify / Cloudflare Pages**: ya resuelto con [`public/_redirects`](../FrontPorteña/laporteniafront/public/_redirects)
- **Vercel**: agregar `vercel.json` con un rewrite de `/(.*)` a `/index.html`
- **nginx**: `location / { try_files $uri $uri/ /index.html; }`
- **Apache**: `FallbackResource /index.html`

---

## 5. Checklist post-deploy

- [ ] `CORS_ORIGIN` del backend apunta a la URL real del frontend, sin barra final
- [ ] `API_BASE_URL` del frontend apunta al backend **y se rebuildeo despues de cambiarla**
- [ ] `JWT_SECRET` nuevo, distinto al de desarrollo
- [ ] `DB_SSL=true`
- [ ] Login funciona y devuelve token
- [ ] Refrescar `/adminHome/remitos` no da 404 (fallback SPA)
- [ ] Generar un remito en PDF y una exportacion a Excel
- [ ] Backups de la base activados en el proveedor

---

## 6. Detalles a tener en cuenta

**Frontend y backend en dominios distintos.** Es la configuracion normal aca y
por eso `CORS_ORIGIN` tiene que ser exacto. El token viaja en el header
`Authorization`, no en cookies, asi que no hay problemas de SameSite.

**Cold starts.** En los free tier (Render, por ejemplo) el servicio se duerme tras
~15 min de inactividad y la primera request tarda 30-60s. Para uso diario en la
fabrica conviene un plan pago o un VPS.

**Sesiones existentes.** El esquema de `localStorage` cambio (`auth_token` y
`auth_user` separados). Los usuarios con sesion vieja tienen que volver a
loguearse.

**`rejectUnauthorized: false`.** Necesario porque Neon, Render y Supabase usan
cadenas de certificados que Node no valida por defecto. La conexion sigue
cifrada. Si el proveedor publica su CA, se puede endurecer pasando `ca`.
