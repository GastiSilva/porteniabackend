# 🧾 Backend - Sistema de Gestión para Tesis  "La Porteña S.RL"

Este repositorio contiene el backend de un sistema de gestión desarrollado como parte de una tesis. El backend está construido con Node.js, Express y*Sequelize. Se encarga de manejar la lógica del negocio, relaciones entre modelos y la persistencia de datos en una base de datos relacional.

## 🚀 Tecnologías principales

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL (dependiendo de la configuración)
- CORS, dotenv, y otras utilidades comunes

## 📁 Estructura de carpetas
├── models/ # Modelos Sequelize
├── routes/ # Rutas Express 
├── controllers/ # Lógica de negocio por cada recurso
├── uploads/ # Archivos PDF guardados (si aplica)
├── config/ # Configuraciones (DB, etc.)
├── migrations/ # Migraciones
├── app.js # Punto de entrada principal

 ## Instalar dependencias
-npm install

## Ejecutar Proyecto
- npm run dev
