import puppeteer from 'puppeteer';

let browserPromise = null;

// Reutiliza una única instancia de Chromium entre requests en vez de lanzar
// (y cerrar) un browser nuevo por cada PDF, que es lento y costoso en memoria.
export const getBrowser = () => {
  if (!browserPromise) {
    browserPromise = puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    browserPromise.catch(() => {
      browserPromise = null;
    });
  }
  return browserPromise;
};

export const renderHtmlToPdf = async (html) => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBytes = await page.pdf({ format: 'A4', printBackground: true });
    // page.pdf() devuelve Uint8Array (no Buffer) en Puppeteer >=22; sin esta
    // conversión, res.send() de Express no lo reconoce como Buffer y lo
    // serializa como JSON en vez de enviar los bytes crudos del PDF.
    return Buffer.from(pdfBytes);
  } finally {
    await page.close();
  }
};

export default { getBrowser, renderHtmlToPdf };
