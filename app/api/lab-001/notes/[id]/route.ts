import { getD1 } from "@/db/d1";
import {
  executionResult,
  SELECT_NOTES_SQL,
  toErrorMessage,
  type Note,
  type SqlExecution,
} from "@/lib/lab-001";

const UPDATE_NOTE_SQL = `UPDATE notes
SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?`;
const DELETE_NOTE_SQL = "DELETE FROM notes WHERE id = ?";

async function listNotes() {
  return (await getD1()).prepare(SELECT_NOTES_SQL).all<Note>();
}

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseId((await context.params).id);
    if (!id) return Response.json({ error: "IDが不正です。" }, { status: 400 });

    const payload = (await request.json()) as { title?: string; content?: string };
    const title = payload.title?.trim() ?? "";
    const content = payload.content?.trim() ?? "";
    if (!title) {
      return Response.json({ error: "タイトルは必須です。" }, { status: 400 });
    }

    const result = await (await getD1()).prepare(UPDATE_NOTE_SQL).bind(title, content, id).run();
    if ((result.meta.changes ?? 0) === 0) {
      return Response.json({ error: "対象のNoteが見つかりません。" }, { status: 404 });
    }
    const query = await listNotes();
    const execution: SqlExecution = {
      operation: "UPDATE",
      sql: UPDATE_NOTE_SQL,
      parameters: [title, content, id],
      result: executionResult(result.meta),
      executedAt: new Date().toISOString(),
    };
    return Response.json({ notes: query.results, execution });
  } catch (error) {
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseId((await context.params).id);
    if (!id) return Response.json({ error: "IDが不正です。" }, { status: 400 });

    const result = await (await getD1()).prepare(DELETE_NOTE_SQL).bind(id).run();
    if ((result.meta.changes ?? 0) === 0) {
      return Response.json({ error: "対象のNoteが見つかりません。" }, { status: 404 });
    }
    const query = await listNotes();
    const execution: SqlExecution = {
      operation: "DELETE",
      sql: DELETE_NOTE_SQL,
      parameters: [id],
      result: executionResult(result.meta),
      executedAt: new Date().toISOString(),
    };
    return Response.json({ notes: query.results, execution });
  } catch (error) {
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
