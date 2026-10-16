import { readFile, mkdir, writeFile } from 'node:fs/promises';

const essay = JSON.parse(await readFile(new URL('../src/content/who-spreads-the-jam.json', import.meta.url), 'utf8'));
const output = new URL('../dist/', import.meta.url);
const shell = await readFile(new URL('index.html', output), 'utf8');
const escape = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const pages = [
  {
    file: 'writing.html',
    title: 'Writing — Krish Vazirani',
    description: 'Essays by Krish Vazirani.',
    type: 'website',
  },
  {
    file: 'writing/who-spreads-the-jam.html',
    title: `${essay.title} — Krish Vazirani`,
    description: essay.blocks[0].text,
    type: 'article',
  },
];

await mkdir(new URL('writing/', output), { recursive: true });
for (const page of pages) {
  const title = escape(page.title);
  const description = escape(page.description);
  const html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', `  <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="${page.type}" />
    <meta name="twitter:card" content="summary" />
  </head>`);
  await writeFile(new URL(page.file, output), html);
}
