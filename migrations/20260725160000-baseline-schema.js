import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Esta migracion es la "foto" del schema real que tenia la base al momento de
// ordenar las migraciones (25/07/2026). Las 21 migraciones anteriores a esta
// (ver migrations/_archived_pre_baseline/) quedaron desincronizadas de la base
// real y nunca se llegaron a aplicar con sequelize-cli (no existia SequelizeMeta).
// A partir de esta migracion, cada cambio de schema debe ir en una migracion nueva.
//
// El SQL fue generado con:
//   pg_dump --schema-only --no-owner --no-privileges --no-comments
// contra la base de desarrollo, y vive en migrations/baseline/schema.sql.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaSql = readFileSync(
  path.join(__dirname, 'baseline', 'schema.sql'),
  'utf-8'
);

export default {
  async up(queryInterface) {
    await queryInterface.sequelize.query(schemaSql);
  },

  async down() {
    throw new Error(
      'La migracion baseline no es reversible. Restaurar desde un backup ' +
      '(pg_restore) si hace falta volver atras.'
    );
  },
};
