import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoBase64 = fs.readFileSync(path.join(__dirname, 'assets', 'laportenia-logo.png')).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

const currencyARS = (value) =>
  Number(value ?? 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 });

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

export const buildRemitoHtml = ({ remito, estado, productos, total, dia, mes, anio }) => {
  const filas = productos.map((item, i) => `
    <tr class="${i % 2 === 1 ? 'alt' : ''}">
      <td class="codigo">${escapeHtml(item.codigo)}</td>
      <td>${escapeHtml(item.producto)}</td>
      <td class="num">${escapeHtml(item.cantidad)}</td>
      <td class="num">${currencyARS(item.precio)}</td>
      <td class="num subtotal">${currencyARS(item.subtotal)}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="color-scheme" content="light" />
<style>
  @page { size: A4; margin: 0; }
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html, body {
    background: #ffffff;
  }
  body {
    margin: 0;
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    color: #1f2937;
    padding: 42px 48px;
    font-size: 12px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    padding-bottom: 20px;
    border-bottom: 3px solid #b45309;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .brand-logo {
    width: 90px;
    height: auto;
    flex-shrink: 0;
  }

  .brand h1 {
    margin: 0 0 2px 0;
    font-size: 17px;
    letter-spacing: 0.3px;
    color: #111827;
  }

  .brand .tagline {
    font-style: italic;
    color: #b45309;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .brand .address {
    color: #6b7280;
    line-height: 1.5;
    font-size: 11px;
  }

  .doc-box {
    min-width: 230px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
  }

  .doc-box .doc-title {
    background: #111827;
    color: #fff;
    padding: 8px 14px;
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 13px;
  }

  .doc-box .doc-body {
    padding: 10px 14px;
  }

  .doc-box .doc-warning {
    font-size: 9.5px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 8px;
  }

  .doc-box .doc-number {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
  }

  .doc-box .doc-date {
    color: #4b5563;
    font-size: 11px;
  }

  .client-card {
    margin-top: 22px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    gap: 36px;
  }

  .client-card .field-label {
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #9ca3af;
    margin-bottom: 3px;
  }

  .client-card .field-value {
    font-size: 13px;
    font-weight: 600;
    color: #111827;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 26px;
  }

  thead th {
    background: #111827;
    color: #fff;
    text-align: left;
    padding: 10px 12px;
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  thead th.num, td.num {
    text-align: right;
  }

  thead th:first-child { border-top-left-radius: 8px; }
  thead th:last-child { border-top-right-radius: 8px; }

  tbody td {
    padding: 9px 12px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 11.5px;
    color: #1f2937;
  }

  tbody tr.alt td {
    background: #f9fafb;
  }

  td.codigo {
    color: #6b7280;
    font-variant-numeric: tabular-nums;
  }

  td.subtotal {
    font-weight: 600;
    color: #111827;
  }

  .summary {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 16px;
    margin-top: 22px;
  }

  .estado-box {
    flex: 1;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .estado-box .field-label {
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #9ca3af;
  }

  .estado-pill {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 999px;
    background: #fef3c7;
    color: #92400e;
    font-weight: 700;
    font-size: 11px;
  }

  .total-box {
    min-width: 220px;
    background: #b45309;
    border-radius: 10px;
    padding: 12px 18px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .total-box .total-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.85;
  }

  .total-box .total-value {
    font-size: 17px;
    font-weight: 700;
  }

  .footer-banner {
    margin-top: 26px;
    text-align: center;
    padding: 12px;
    border-radius: 10px;
    border: 1px dashed #d1d5db;
    color: #b45309;
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 13px;
  }
</style>
</head>
<body>

  <div class="header">
    <div class="brand">
      <img class="brand-logo" src="${logoDataUri}" alt="La Porteña" />
      <div>
        <h1>LA PORTEÑA S.R.L.</h1>
        <div class="tagline">El gusto casero</div>
        <div class="address">
          Pablo de Guzmán 481 &middot; Tel 4764838<br/>
          B° Marqués de Sobremonte &middot; CP 5008 &middot; Córdoba<br/>
          IVA Responsable Inscripto
        </div>
      </div>
    </div>
    <div class="doc-box">
      <div class="doc-title">PRESUPUESTO</div>
      <div class="doc-body">
        <div class="doc-warning">Documento no válido como factura</div>
        <div class="doc-number">N&deg; 0001-${String(remito.Id_Remito).padStart(8, '0')}</div>
        <div class="doc-date">${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${anio}</div>
      </div>
    </div>
  </div>

  <div class="client-card">
    <div>
      <div class="field-label">Señor(es)</div>
      <div class="field-value">${escapeHtml(remito.Senior)}</div>
    </div>
    <div>
      <div class="field-label">Domicilio</div>
      <div class="field-value">${escapeHtml(remito.Domicilio)}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Código</th>
        <th>Producto</th>
        <th class="num">Cantidad</th>
        <th class="num">Precio Unitario</th>
        <th class="num">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${filas}
    </tbody>
  </table>

  <div class="summary">
    <div class="estado-box">
      <span class="field-label">Estado</span>
      <span class="estado-pill">${escapeHtml(estado)}</span>
    </div>
    <div class="total-box">
      <span class="total-label">Total</span>
      <span class="total-value">${currencyARS(total)}</span>
    </div>
  </div>

  <div class="footer-banner">&ldquo;EL GUSTO CASERO&rdquo;</div>

</body>
</html>`;
};

export default { buildRemitoHtml };
