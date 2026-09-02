"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Note, SqlExecution } from "@/lib/lab-001";

type ApiResponse = {
  notes?: Note[];
  execution?: SqlExecution;
  error?: string;
};

async function requestJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const payload = (await response.json()) as ApiResponse;
  if (!response.ok) throw new Error(payload.error ?? "リクエストに失敗しました。");
  return payload;
}

export function Lab001Workbench() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [execution, setExecution] = useState<SqlExecution | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  const applyResponse = useCallback((payload: ApiResponse) => {
    if (payload.notes) setNotes(payload.notes);
    if (payload.execution) setExecution(payload.execution);
  }, []);

  const loadNotes = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      applyResponse(await requestJson("/api/lab-001/notes"));
    } catch (value) {
      setError(value instanceof Error ? value.message : "読み込みに失敗しました。");
    } finally {
      setBusy(false);
    }
  }, [applyResponse]);

  useEffect(() => {
    let cancelled = false;
    requestJson("/api/lab-001/notes")
      .then((payload) => {
        if (!cancelled) applyResponse(payload);
      })
      .catch((value: unknown) => {
        if (!cancelled) {
          setError(value instanceof Error ? value.message : "読み込みに失敗しました。");
        }
      })
      .finally(() => {
        if (!cancelled) setBusy(false);
      });

    return () => {
      cancelled = true;
    };
  }, [applyResponse]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError("タイトルは必須です。");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const url = editingId ? `/api/lab-001/notes/${editingId}` : "/api/lab-001/notes";
      const payload = await requestJson(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      applyResponse(payload);
      setTitle("");
      setContent("");
      setEditingId(null);
    } catch (value) {
      setError(value instanceof Error ? value.message : "保存に失敗しました。");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    setBusy(true);
    setError("");
    try {
      applyResponse(await requestJson(`/api/lab-001/notes/${id}`, { method: "DELETE" }));
      if (editingId === id) cancelEdit();
    } catch (value) {
      setError(value instanceof Error ? value.message : "削除に失敗しました。");
    } finally {
      setBusy(false);
    }
  }

  function edit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
  }

  return (
    <div className="workbench-grid">
      <section className="record-card crud-card" aria-labelledby="crud-title">
        <div className="workbench-heading">
          <div><p className="card-index">01 / CRUD AREA</p><h2 id="crud-title">Notes</h2></div>
          <button className="text-button" type="button" onClick={() => void loadNotes()} disabled={busy}>再読込</button>
        </div>

        <form className="note-form" onSubmit={submit}>
          <label>タイトル <span>必須</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} disabled={busy} />
          </label>
          <label>本文
            <textarea value={content} onChange={(event) => setContent(event.target.value)} rows={4} maxLength={2000} disabled={busy} />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={busy}>{editingId ? "UPDATE" : "INSERT"}</button>
            {editingId && <button className="text-button" type="button" onClick={cancelEdit} disabled={busy}>キャンセル</button>}
          </div>
        </form>

        <div className="note-list" aria-busy={busy}>
          {!busy && notes.length === 0 && <p className="empty-state">D1にNoteはまだありません。</p>}
          {notes.map((note) => (
            <article key={note.id} className="note-row">
              <div><span>#{note.id}</span><h3>{note.title}</h3><p>{note.content || "（本文なし）"}</p><time>{note.updated_at} UTC</time></div>
              <div className="row-actions">
                <button type="button" onClick={() => edit(note)} disabled={busy}>編集</button>
                <button type="button" className="danger-button" onClick={() => void remove(note.id)} disabled={busy}>削除</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="record-card sql-card" aria-labelledby="sql-title">
        <div className="workbench-heading">
          <div><p className="card-index">02 / SQL AREA</p><h2 id="sql-title">Last Executed SQL</h2></div>
          {execution && <span className={`operation-badge operation-${execution.operation.toLowerCase()}`}>{execution.operation}</span>}
        </div>
        {execution ? (
          <div className="sql-output" aria-live="polite">
            <div><span>SQL</span><pre><code>{execution.sql}</code></pre></div>
            <div><span>BIND PARAMETERS</span><pre><code>{JSON.stringify(execution.parameters, null, 2)}</code></pre></div>
            <div><span>RESULT</span><pre><code>{JSON.stringify(execution.result, null, 2)}</code></pre></div>
            <dl className="execution-meta"><dt>EXECUTED AT</dt><dd>{execution.executedAt}</dd></dl>
          </div>
        ) : (
          <p className="empty-state">最初のSELECTを実行しています…</p>
        )}
      </section>
    </div>
  );
}
