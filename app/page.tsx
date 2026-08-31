import Image from "next/image";

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Image className="brand-logo" src="/sites-dev-lab-logo.png" alt="Sites Dev Lab" width={2048} height={544} priority />
        </div>
      </header>

      <main className="lab-main">
        <article className="lab-panel" aria-labelledby="lab-title">
          <div className="panel-marker" aria-hidden="true" />
          <div className="lab-copy">
            <p className="lab-code">LAB-000</p>
            <h1 id="lab-title">Minimal Site</h1>
            <p className="lab-greeting">Hello, Sites Dev Lab!</p>
            <p className="lab-description">This site verifies the minimum GitHub synchronization workflow.</p>
          </div>

          <aside className="status-card" aria-label="Lab status: Ready">
            <span className="status-label">STATUS</span>
            <span className="status-value"><span className="status-dot" aria-hidden="true" />READY</span>
          </aside>
        </article>
      </main>

      <footer className="site-footer">
        <p>Sites Dev Lab — 動いた記憶ではなく、再現できる証拠を。</p>
      </footer>
    </div>
  );
}
