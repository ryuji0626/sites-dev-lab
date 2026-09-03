import Image from "next/image";
import Link from "next/link";

const workflowSteps = [
  "ChatGPT Sitesで最小構成サイトを作成",
  "Sites Dev Labの横長ロゴを設定",
  "サイトを公開",
  "GitHubリポジトリへ初回同期",
  "GitHub Issueを作成",
  "最新mainから作業ブランチを作成",
  "実装・テスト・Push・PR作成",
  "PRをmainへマージし、作業ブランチを削除",
];

const results = [
  "ChatGPT Sitesで作成したサイトをGitHubへ同期できた",
  "Sitesの生成物をGitHub上で確認できた",
  "同期後のソースをIssue駆動で改善できた",
  "ブランチ・PR・レビュー・マージの開発フローを継続できた",
  "シェルスクリプトはLFで生成されていた",
  ".gitattributesによってWindows環境でもLFを維持できるようにした",
];

const evidence = [
  {
    label: "PUBLIC SITE",
    title: "Sites Dev Lab",
    href: "https://sites-dev-lab.millennium-farming-s.chatgpt.site",
  },
  {
    label: "REPOSITORY",
    title: "ryuji0626/sites-dev-lab",
    href: "https://github.com/ryuji0626/sites-dev-lab",
  },
  {
    label: "ISSUE / PR",
    title: "#1 → PR #3 — シェルをLFに固定",
    href: "https://github.com/ryuji0626/sites-dev-lab/pull/3",
  },
  {
    label: "ISSUE / PR",
    title: "#2 → PR #4 — Issueテンプレートを追加",
    href: "https://github.com/ryuji0626/sites-dev-lab/pull/4",
  },
  {
    label: "COMMIT",
    title: "LAB-000 初回同期",
    href: "https://github.com/ryuji0626/sites-dev-lab/commit/b4ea1a73d9906f152d012ee29e6b8b91c1dfecaa",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Image
            className="brand-logo"
            src="/sites-dev-lab-logo.png"
            alt="Sites Dev Lab"
            width={2048}
            height={544}
            priority
          />
          <span className="header-record">VERIFICATION RECORD</span>
        </div>
      </header>

      <main className="lab-main">
        <section className="lab-index" aria-labelledby="lab-index-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">LAB INDEX</p>
              <h2 id="lab-index-title">検証一覧</h2>
            </div>
          </div>
          <div className="lab-index-grid">
            <Link href="/labs/lab-000" className="lab-index-card">
              <span>LAB-000</span><strong>Minimal Site</strong><p>GitHub同期とIssue駆動開発</p><b>COMPLETED ↗</b>
            </Link>
            <Link href="/labs/lab-001" className="lab-index-card lab-index-current">
              <span>LAB-001</span><strong>Sites × D1</strong><p>CRUD・SQL・永続性の基本検証</p><b>COMPLETED ↗</b>
            </Link>
          </div>
        </section>

        <article className="lab-panel" aria-labelledby="lab-title">
          <div className="panel-marker" aria-hidden="true" />
          <div className="lab-copy">
            <p className="lab-code">LAB-000</p>
            <h1 id="lab-title">Minimal Site</h1>
            <p className="lab-greeting">Hello, Sites Dev Lab!</p>
            <p className="lab-description">
              This site verifies the minimum GitHub synchronization workflow.
            </p>
          </div>

          <aside className="status-card" aria-label="Lab status: Completed">
            <span className="status-label">STATUS</span>
            <span className="status-value">
              <span className="status-dot" aria-hidden="true" />
              COMPLETED
            </span>
          </aside>
        </article>

        <section className="record-section" aria-labelledby="record-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">VERIFICATION LOG</p>
              <h2 id="record-title">検証記録</h2>
            </div>
            <p className="record-date">
              <span>VERIFIED</span>
              2026-08-31
            </p>
          </div>

          <div className="overview-grid">
            <article className="record-card record-purpose">
              <p className="card-index">01 / PURPOSE</p>
              <h3>検証目的</h3>
              <p>
                ChatGPT Sitesで作成したWebサイトをGitHubリポジトリへ同期し、
                同期後もIssue駆動の開発フローを継続できることを確認する。
              </p>
            </article>

            <article className="record-card">
              <p className="card-index">02 / ENVIRONMENT</p>
              <h3>検証環境</h3>
              <dl className="environment-list">
                <div><dt>PLATFORM</dt><dd>ChatGPT Sites</dd></div>
                <div><dt>SOURCE</dt><dd>GitHub repository</dd></div>
                <div><dt>STRUCTURE</dt><dd>Vinext / single page</dd></div>
                <div><dt>CAPABILITIES</dt><dd>DB・認証・API・外部連携なし</dd></div>
              </dl>
            </article>
          </div>

          <article className="record-card workflow-card">
            <p className="card-index">03 / PROCEDURE</p>
            <h3>実施手順</h3>
            <ol className="workflow-list">
              {workflowSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </article>

          <div className="record-grid">
            <article className="record-card">
              <p className="card-index">04 / CHANGES</p>
              <h3>GitHub同期後の改善実績</h3>
              <div className="change-list">
                <div>
                  <span>ISSUE #1 / PR #3</span>
                  <p>シェルスクリプトの改行コードをLFに固定</p>
                  <code>*.sh text eol=lf</code>
                </div>
                <div>
                  <span>ISSUE #2 / PR #4</span>
                  <p>Sites Dev Lab用のIssueテンプレートを追加</p>
                  <code>LAB / IMPROVEMENT / BUG</code>
                </div>
              </div>
            </article>

            <article className="record-card result-card">
              <p className="card-index">05 / RESULT</p>
              <h3>検証結果</h3>
              <ul className="result-list">
                {results.map((result) => (
                  <li key={result}>
                    <span aria-hidden="true">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="record-card evidence-card">
            <p className="card-index">06 / EVIDENCE</p>
            <h3>証拠リンク</h3>
            <div className="evidence-grid">
              {evidence.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <span className="external-mark" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>

          <aside className="verification-note">
            <span className="status-dot" aria-hidden="true" />
            <p>
              <strong>VERDICT: VERIFIED</strong>
              ChatGPT Sitesで作成したサイトをGitHubへ同期し、Issue駆動で改善を継続できることを確認した。
            </p>
          </aside>
        </section>
      </main>

      <footer className="site-footer">
        <p>Sites Dev Lab — 動いた記憶ではなく、再現できる証拠を。</p>
      </footer>
    </div>
  );
}
