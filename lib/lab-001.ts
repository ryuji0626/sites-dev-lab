export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type SqlExecution = {
  operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE";
  sql: string;
  parameters: Array<string | number>;
  result: Record<string, unknown>;
  executedAt: string;
};

export const SELECT_NOTES_SQL = `SELECT id, title, content, created_at, updated_at
FROM notes
ORDER BY created_at DESC, id DESC
LIMIT 50`;

export function toErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  if (message.includes("no such table")) {
    return "notesテーブルがありません。生成済みmigrationを適用してください。";
  }
  return message;
}

export function executionResult(meta: unknown) {
  if (!meta || typeof meta !== "object") return {};
  const value = meta as Record<string, unknown>;
  return {
    changes: value.changes ?? 0,
    lastRowId: value.last_row_id ?? null,
    durationMs: value.duration ?? null,
  };
}
