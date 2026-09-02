import Image from "next/image";
import Link from "next/link";
import { Lab001Workbench } from "./workbench";

export default function Lab001Page() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" aria-label="Sites Dev Lab ホーム">
            <Image
              className="brand-logo"
              src="/sites-dev-lab-logo.png"
              alt="Sites Dev Lab"
              width={2048}
              height={544}
              priority
            />
          </Link>
          <span className="header-record">DATABASE VERIFICATION</span>
        </div>
      </header>

      <main className="lab-main lab-001-main">
        <nav className="lab-breadcrumb" aria-label="パンくず">
          <Link href="/">LAB INDEX</Link>
          <span aria-hidden="true">/</span>
          <span>LAB-001</span>
        </nav>

        <section className="lab-001-intro" aria-labelledby="lab-001-title">
          <div>
            <p className="lab-code">LAB-001</p>
            <h1 id="lab-001-title">Sites × D1</h1>
            <p>
              NotesのCRUD操作と、D1へ発行するSQL・bind parametersを
              一画面で観測する基本検証。
            </p>
          </div>
          <div className="flow-strip" aria-label="検証経路">
            <span>CRUD UI</span><b>→</b><span>SQL</span><b>→</b><span>D1</span><b>→</b><span>RESULT</span>
          </div>
        </section>

        <Lab001Workbench />
      </main>

      <footer className="site-footer">
        <p>Sites Dev Lab — 動いた記憶ではなく、再現できる証拠を。</p>
      </footer>
    </div>
  );
}
