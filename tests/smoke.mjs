import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
for (const locale of ['es', 'en']) {
  const response = await fetch(`${base}/${locale}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const heading = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0];
  assert.ok(heading, 'Hero heading is present in server HTML');
  assert.doesNotMatch(
    heading,
    /opacity:\s*0(?:[;"}]|$)|visibility:\s*hidden|translateY\(110/,
  );
  assert.doesNotMatch(
    html.split('<main')[1]?.split('</main>')[0] ?? '',
    /style="opacity:0;y:/,
  );
  assert.match(
    html,
    /rel="icon"[^>]*href="\/favicon.ico|href="\/favicon.ico"[^>]*rel="icon"/,
  );
  assert.match(html, /<section id="features"/);
  assert.match(html, /<section id="comparison"/);
  assert.match(html, /id="waitlist-email"/);
  const schema = JSON.parse(
    html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1] ?? 'null',
  );
  assert.equal(schema?.['@type'], 'SoftwareApplication');
  assert.equal(schema.inLanguage, locale);
  const og = await fetch(`${base}/${locale}/opengraph-image`);
  assert.equal(og.status, 200);
  assert.match(og.headers.get('content-type'), /image\/png/);
  const png = Buffer.from(await og.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.match(html, new RegExp(`href="/${locale}/legal/privacy"`));
  const privacy = await fetch(`${base}/${locale}/legal/privacy`);
  assert.equal(privacy.status, 200);
  const privacyHtml = await privacy.text();
  assert.match(privacyHtml, /<h1\b[^>]*id="privacy-title"/);
  assert.match(
    privacyHtml,
    new RegExp(`rel="canonical" href="[^"]*/${locale}/legal/privacy"`),
  );
  assert.match(privacyHtml, /hrefLang="es" href="[^"]*\/es\/legal\/privacy"/);
  console.log(
    `${locale}: HTML visible, features, comparison, waitlist, schema, favicon, OG and privacy pass`,
  );
}
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.equal((sitemap.match(/<url>/g) || []).length, 4);
assert.match(sitemap, /\/es<\/loc>/);
assert.match(sitemap, /\/en<\/loc>/);
assert.match(sitemap, /\/es\/legal\/privacy<\/loc>/);
assert.match(sitemap, /\/en\/legal\/privacy<\/loc>/);
assert.match(sitemap, /hreflang="es"/);
const favicon = Buffer.from(
  await (await fetch(`${base}/favicon.ico`)).arrayBuffer(),
);
assert.equal(favicon.readUInt16LE(2), 1);
assert.equal(favicon.readUInt16LE(4), 3);
for (const [i, size] of [16, 32, 48].entries())
  assert.equal(favicon[6 + i * 16], size);
const icons = await fetch(`${base}/icon.svg`);
assert.equal(icons.status, 200);
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.match(robots, /Sitemap: .*\/sitemap.xml/);
const spanish = await fetch(base, {
  headers: { 'Accept-Language': 'es' },
  redirect: 'manual',
});
assert.match(spanish.headers.get('location'), /\/es$/);
const en = JSON.parse(
  await readFile(new URL('../messages/en.json', import.meta.url)),
);
const es = JSON.parse(
  await readFile(new URL('../messages/es.json', import.meta.url)),
);
const keys = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === 'object'
      ? keys(value, `${prefix}${key}.`)
      : `${prefix}${key}`,
  );
assert.deepEqual(keys(en).sort(), keys(es).sort());
console.log(
  'Sitemap, locale detection, robots, ICO sizes and translation parity pass',
);
