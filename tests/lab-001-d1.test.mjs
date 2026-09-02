import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const rootPage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const labPage = await readFile(new URL("../app/labs/lab-001/page.tsx", import.meta.url), "utf8");
const workbench = await readFile(new URL("../app/labs/lab-001/workbench.tsx", import.meta.url), "utf8");
const collectionRoute = await readFile(new URL("../app/api/lab-001/notes/route.ts", import.meta.url), "utf8");
const itemRoute = await readFile(new URL("../app/api/lab-001/notes/[id]/route.ts", import.meta.url), "utf8");
const schema = await readFile(new URL("../db/schema.ts", import.meta.url), "utf8");
const hosting = JSON.parse(await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"));

test("LAB-000 and LAB-001 coexist in the LAB index", () => {
  assert.match(rootPage, /LAB-000/);
  assert.match(rootPage, /LAB-001/);
  assert.match(rootPage, /\/labs\/lab-000/);
  assert.match(rootPage, /\/labs\/lab-001/);
});

test("LAB-001 exposes CRUD UI and SQL evidence", () => {
  for (const content of ["CRUD AREA", "SQL AREA", "Last Executed SQL", "BIND PARAMETERS", "RESULT"]) {
    assert.equal(`${labPage}\n${workbench}`.includes(content), true, `missing ${content}`);
  }
  assert.match(workbench, /method: editingId \? "PUT" : "POST"/);
  assert.match(workbench, /method: "DELETE"/);
  assert.match(workbench, /タイトルは必須です/);
});

test("D1 routes use prepared SQL with separated bind values", () => {
  assert.match(collectionRoute, /prepare\(INSERT_NOTE_SQL\)\.bind\(title, content\)/);
  assert.match(itemRoute, /prepare\(UPDATE_NOTE_SQL\)\.bind\(title, content, id\)/);
  assert.match(itemRoute, /prepare\(DELETE_NOTE_SQL\)\.bind\(id\)/);
  assert.match(collectionRoute, /operation: "SELECT"/);
  assert.match(collectionRoute, /operation: "INSERT"/);
  assert.match(itemRoute, /operation: "UPDATE"/);
  assert.match(itemRoute, /operation: "DELETE"/);
});

test("notes schema and Sites D1 binding are declared", () => {
  for (const column of ["id", "title", "content", "created_at", "updated_at"]) {
    assert.equal(schema.includes(column), true, `missing schema column ${column}`);
  }
  assert.equal(hosting.d1, "DB");
  assert.equal(hosting.r2, null);
});
