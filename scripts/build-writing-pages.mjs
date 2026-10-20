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
    url: 'https://www.krishvazirani.com/writing',
  },
  {
    file: 'writing/who-spreads-the-jam.html',
    title: `${essay.title} — Krish Vazirani`,
    description: essay.blocks[0].text,
    type: 'article',
    url: 'https://www.krishvazirani.com/writing/who-spreads-the-jam',
    image: {
      url: 'https://www.krishvazirani.com/images/writing/who-spreads-the-jam/social-preview.png',
      width: 1200,
      height: 800,
      alt: 'Watercolor and ink illustration of toast with unevenly spread red jam and a butter knife.',
    },
  },
];

await mkdir(new URL('writing/', output), { recursive: true });
for (const page of pages) {
  const title = escape(page.title);
  const description = escape(page.description);
  const imageTags = page.image ? `
    <meta property="og:image" content="${escape(page.image.url)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="${page.image.width}" />
    <meta property="og:image:height" content="${page.image.height}" />
    <meta property="og:image:alt" content="${escape(page.image.alt)}" />
    <meta name="twitter:image" content="${escape(page.image.url)}" />
    <meta name="twitter:image:alt" content="${escape(page.image.alt)}" />` : '';
  const html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', `  <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="${page.type}" />
    <meta property="og:url" content="${escape(page.url)}" />${imageTags}
    <meta name="twitter:card" content="${page.image ? 'summary_large_image' : 'summary'}" />
  </head>`);
  await writeFile(new URL(page.file, output), html);
}
