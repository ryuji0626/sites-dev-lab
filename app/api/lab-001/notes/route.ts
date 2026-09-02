import { getD1 } from "@/db/d1";
import {
  executionResult,
  SELECT_NOTES_SQL,
  toErrorMessage,
  type Note,
  type SqlExecution,
} from "@/lib/lab-001";

const INSERT_NOTE_SQL = `INSERT INTO notes (title, content, created_at, updated_at)
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

async function listNotes() {
  return (await getD1()).prepare(SELECT_NOTES_SQL).all<Note>();
}

export async function GET() {
  try {
    const query = await listNotes();
    const execution: SqlExecution = {
      operation: "SELECT",
      sql: SELECT_NOTES_SQL,
      parameters: [],
      result: { rows: query.results.length },
      executedAt: new Date().toISOString(),
    };
    return Response.json({ notes: query.results, execution });
  } catch (error) {
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { title?: string; content?: string };
    const title = payload.title?.trim() ?? "";
    const content = payload.content?.trim() ?? "";

    if (!title) {
      return Response.json({ error: "タイトルは必須です。" }, { status: 400 });
    }

    const result = await (await getD1()).prepare(INSERT_NOTE_SQL).bind(title, content).run();
    const query = await listNotes();
    const execution: SqlExecution = {
      operation: "INSERT",
      sql: INSERT_NOTE_SQL,
      parameters: [title, content],
      result: executionResult(result.meta),
      executedAt: new Date().toISOString(),
    };
    return Response.json({ notes: query.results, execution }, { status: 201 });
  } catch (error) {
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
