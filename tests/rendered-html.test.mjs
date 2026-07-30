import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Intent Studio landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Intent Studio \| Enterprise Digital Brain<\/title>/i);
  assert.match(html, /Build your/);
  assert.match(html, /Enterprise Digital Brain/);
  assert.match(html, /Human intent/);
  assert.match(html, /CEO · CFO · CSO · CHRO/);
  assert.match(html, /intent-banner\.png/);
});

test("includes company setup, daily access, LLM and upload capabilities", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /return `Edb-\$\{dd\}\$\{mm\}`/);
  assert.match(page, /type Role = "CEO" \| "CFO" \| "CSO" \| "CHRO"/);
  assert.match(page, /Create Digital Brain/);
  assert.match(page, /OpenAI GPT-5/);
  assert.match(page, /lastQuestion/);
  assert.match(page, /IMF World Economic Outlook/);
  assert.match(page, /\.ppt,\.pptx/);
  assert.match(page, /type="file" multiple/);

  await access(new URL("../public/intent-banner.png", import.meta.url));
  await access(new URL("../public/intent-cover.jpg", import.meta.url));
});
