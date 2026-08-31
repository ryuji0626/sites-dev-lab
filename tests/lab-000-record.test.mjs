import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("LAB-000 verification record includes required evidence", () => {
  const requiredContent = [
    "COMPLETED",
    "検証目的",
    "検証環境",
    "実施手順",
    "検証結果",
    "証拠リンク",
    "ISSUE #1",
    "ISSUE #2",
    "pull/3",
    "pull/4",
    "2026-08-31",
  ];

  for (const content of requiredContent) {
    assert.equal(page.includes(content), true, `missing required content: ${content}`);
  }
});

test("LAB-000 remains a capability-free single page", () => {
  assert.doesNotMatch(page, /fetch\(|useState|useEffect|\/api\//);
});

test("verification record includes mobile responsive styles", () => {
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /\.record-section/);
  assert.match(css, /\.evidence-grid/);
});
