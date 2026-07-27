Estas 21 migraciones nunca llegaron a aplicarse con `sequelize-cli` (la tabla
`SequelizeMeta` no existía en la base real) y quedaron desincronizadas del
schema real: crean tablas que ya no existen (`Solicitantes`, `Rubros`,
`Conceptos`) y no cubren tablas que sí existen (`MateriaPrima`,
`MateriaPrimaPorProducto`, `CompraMateriaPrima`, `TipoGastos`).

Se archivaron acá (fuera de `migrations/`, que `sequelize-cli` no recorre en
subcarpetas) el 25/07/2026, reemplazadas por una única migración baseline
(`../20260725160000-baseline-schema.js`) que refleja el schema real de ese
momento. Se conservan solo como referencia histórica.
