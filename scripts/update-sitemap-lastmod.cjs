// Update all <lastmod> tags in sitemap.xml to today's date (YYYY-MM-DD)
// CommonJS version for projects with "type": "module" in package.json
const fs = require('fs');
const path = require('path');

const distFile = path.resolve(__dirname, '..', 'dist', 'sitemap.xml');
const publicFile = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

const targetFile = fs.existsSync(distFile) ? distFile : publicFile;

function formatDateYYYYMMDD(d) {
  return d.toISOString().slice(0, 10);
}

function main() {
  if (!fs.existsSync(targetFile)) {
    console.warn(`[sitemap] File not found: ${targetFile}`);
    process.exit(0);
  }

  const today = formatDateYYYYMMDD(new Date());
  const xml = fs.readFileSync(targetFile, 'utf8');
  const updated = xml.replace(
    /<lastmod>[^<]*<\/lastmod>/g,
    `<lastmod>${today}<\/lastmod>`
  );

  if (updated !== xml) {
    fs.writeFileSync(targetFile, updated, 'utf8');
    console.log(
      `[sitemap] lastmod updated to ${today} in ${path.basename(targetFile)}`
    );
  } else {
    console.log('[sitemap] No <lastmod> tags found or already up-to-date.');
  }
}

main();
