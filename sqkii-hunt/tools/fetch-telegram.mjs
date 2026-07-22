#!/usr/bin/env node
// Fetch the PUBLIC Telegram web preview for SQKII (@sqkiisg) and extract the
// latest posts — dated text + hint image URLs — then download the images so an
// agent can read them. This uses only the public t.me/s/ web view (the same page
// any browser shows); it touches no app, API, or account.
//
// Usage: node fetch-telegram.mjs [outputDir]
//   Prints a JSON summary of recent posts and saves images to <outputDir>/img_<n>.jpg

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHANNEL = 'https://t.me/s/sqkiisg';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const outDir = process.argv[2] || '.';

async function get(url, binary = false) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return binary ? Buffer.from(await res.arrayBuffer()) : res.text();
}

function parsePosts(html) {
  const blocks = html.split('tgme_widget_message_wrap').slice(1);
  const posts = [];
  for (const b of blocks) {
    const dt = (b.match(/datetime="([^"]+)"/) || [])[1] || '';
    let text = '';
    const tm = b.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/);
    if (tm) {
      text = tm[1]
        .replace(/<br\/?>/g, '\n').replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&').replace(/&#036;/g, '$')
        .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
        .replace(/&#33;/g, '!').trim();
    }
    const imgs = [...b.matchAll(/background-image:url\(&#39;(https:[^&]+)&#39;\)/g)]
      .map(m => m[1]).filter(u => /telesco|telegram|cdn/.test(u));
    posts.push({ dt, text, imgs });
  }
  return posts;
}

const html = await get(CHANNEL);
const posts = parsePosts(html);
const recent = posts.slice(-12);

mkdirSync(outDir, { recursive: true });
let n = 0;
const manifest = [];
for (const p of recent) {
  const saved = [];
  for (const u of p.imgs) {
    try {
      const buf = await get(u, true);
      const f = join(outDir, `img_${n}.jpg`);
      writeFileSync(f, buf);
      saved.push(f); n++;
    } catch (e) { /* skip a failed image, keep going */ }
  }
  manifest.push({ date: p.dt, text: p.text.slice(0, 500), images: saved });
}

console.log(JSON.stringify({ channel: CHANNEL, fetched: manifest.length, posts: manifest }, null, 2));
console.error(`\nSaved ${n} image(s) to ${outDir}. Read them to transcribe any hint text.`);
