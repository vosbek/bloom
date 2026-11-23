// Minimal static server for the reconstructed blume.codes mirror.
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/devl/ships/blume-rea/local-site';
const PORT = 8377;
const LOG = 'C:/devl/ships/blume-rea/serve-404.log';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf', '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm'
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let p = path.normalize(urlPath).replace(/^([/\\])+/, '');
  let file = path.resolve(ROOT, p);
  const rootAbs = path.resolve(ROOT);
  if (!file.startsWith(rootAbs)) { res.writeHead(403).end('forbidden'); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    fs.appendFileSync(LOG, `404 ${req.method} ${req.url}\n`);
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found: ' + urlPath);
    return;
  }
  const ext = path.extname(file).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  // HTML pages saved without extension (about, docs, privacy, terms, product-preview children)
  const type = (ext === '' && /\.(about|docs|privacy|terms)$/.test(urlPath)) || /product-preview/.test(urlPath)
    ? 'text/html; charset=utf-8' : mime;
  res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`serving ${ROOT} at http://127.0.0.1:${PORT}`));
