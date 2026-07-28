"use client";

import { FormEvent, useState } from "react";

const initialActions = [
  { title: "Recover the South region pipeline", detail: "8 late-stage opportunities worth ₹12.4Cr are slipping beyond quarter end.", impact: "+₹3.8Cr", owner: "Regional Sales Manager", tone: "urgent" },
  { title: "Increase enterprise deal velocity", detail: "Discovery-to-proposal conversion is 11 pts below the best-performing segment.", impact: "+₹2.1Cr", owner: "Sales Leader", tone: "focus" },
  { title: "Protect high-margin category share", detail: "Cloud & Data demand is rising, but win rate has fallen for two consecutive months.", impact: "+₹1.6Cr", owner: "Sales Leader", tone: "watch" },
];

const answers = [
  "Revenue is growing, but the next-quarter outlook is exposed by a weak South region pipeline. Prioritize late-stage deal recovery before adding more top-of-funnel activity.",
  "The clearest growth lever is enterprise conversion: the current proposal-to-win rate is 31%, versus 42% in the strongest segment. Focus coaching on discovery quality and executive sponsorship.",
  "Projection risk is concentrated in 8 opportunities. Recovering just three of them would close 38% of the current gap to target.",
];

export default function Home() {
  const [setupOpen, setSetupOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [actions, setActions] = useState(initialActions);
  const [intent, setIntent] = useState("Grow Sales");
  const [status, setStatus] = useState("Demo profile ready");

  function ask(event: FormEvent) {
    event.preventDefault();
    const chosen = answers[Math.floor(Math.random() * answers.length)];
    setAnswer(chosen);
    setQuery("");
  }

  function decide(title: string, decision: string) {
    setActions((items) => items.map((item) => item.title === title ? { ...item, detail: `${item.detail} · Marked ${decision.toLowerCase()}.` } : item));
    setStatus(`Action ${decision.toLowerCase()}`);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">i</span><span>intent<br/><b>studio</b></span></div>
        <div className="company-pill"><span className="accent-dot"/> ACCENTURE <span className="chev">⌄</span></div>
        <nav>
          {["Overview", "Ask Intent Studio", "Strategic Intents", "Daily Brief", "Data Sources"].map((item) => (
            <button key={item} className={activeNav === item ? "nav-item active" : "nav-item"} onClick={() => setActiveNav(item)}>
              <span>{item === "Overview" ? "◫" : item === "Ask Intent Studio" ? "⌁" : item === "Strategic Intents" ? "◎" : item === "Daily Brief" ? "◷" : "◌"}</span>{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="source-state"><span className="pulse"/> Data brain active<br/><small>Public + synthetic demo data</small></div>
          <button className="setup-link" onClick={() => setSetupOpen(true)}>⚙ Company setup</button>
          <div className="profile"><div className="avatar">AM</div><div><b>Alex Morgan</b><small>Chief Executive Officer</small></div><span>⌄</span></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">CEO DIGITAL BRAIN <span>●</span> Updated today, 08:40 IST</p><h1>Good morning, Alex.</h1><p className="subhead">Your business is moving forward. Here’s where your attention has the greatest impact.</p></div>
          <div className="header-actions"><button className="icon-button" aria-label="Notifications">♧<i/></button><button className="setup-button" onClick={() => setSetupOpen(true)}>Customize demo <span>→</span></button></div>
        </header>

        <section className="intent-banner">
          <div className="intent-symbol">↗</div><div className="intent-copy"><span className="eyebrow">ACTIVE STRATEGIC INTENT</span><h2>{intent}</h2><p>Focus the organization on the highest-confidence levers for sustainable revenue growth.</p></div>
          <div className="intent-children"><span>Improve pipeline conversion</span><span>Increase average deal value</span></div>
          <button className="intent-edit" onClick={() => setIntent(intent === "Grow Sales" ? "Improve Profits" : "Grow Sales")}>Edit intent</button>
        </section>

        <section className="metrics" aria-label="Business metrics">
          <Metric label="REVENUE (YTD)" value="₹1,842Cr" change="↑ 8.4%" note="vs. prior year" />
          <Metric label="FORECAST TO TARGET" value="92.6%" change="₹147Cr gap" note="Q3 target" warning />
          <Metric label="QUALIFIED PIPELINE" value="₹624Cr" change="↑ 14.2%" note="vs. last month" />
          <Metric label="WIN RATE" value="34.8%" change="↓ 2.1 pts" note="trailing 90 days" warning />
        </section>

        <section className="dashboard-grid">
          <article className="card performance-card">
            <div className="card-head"><div><span className="eyebrow">PERFORMANCE TRAJECTORY</span><h3>Revenue is ahead of plan — but momentum is softening</h3></div><button className="more">•••</button></div>
            <div className="legend"><span><i className="line blue"/>Actual revenue</span><span><i className="line muted"/>Plan</span><span><i className="line dashed"/>Forecast</span></div>
            <div className="chart-wrap">
              <div className="y-axis"><span>₹2,000Cr</span><span>₹1,500Cr</span><span>₹1,000Cr</span><span>₹500Cr</span><span>₹0</span></div>
              <svg viewBox="0 0 760 245" preserveAspectRatio="none" className="chart" role="img" aria-label="Revenue performance line chart">
                <defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#19b58a" stopOpacity=".2"/><stop offset="1" stopColor="#19b58a" stopOpacity="0"/></linearGradient></defs>
                {[28,78,128,178,228].map(y => <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="#e8eeef" strokeWidth="1"/>)}
                <path d="M0,198 C60,190 78,168 130,166 S210,134 260,143 S350,98 410,105 S480,68 545,78 S625,55 690,65 S735,52 760,44" fill="none" stroke="#b7c5c9" strokeWidth="3" strokeDasharray="7 7"/>
                <path d="M0,203 C42,182 75,179 110,170 S185,154 218,133 S280,125 315,116 S360,98 400,103 S456,79 488,81 S535,50 575,59" fill="none" stroke="#13a77e" strokeWidth="4"/>
                <path d="M0,203 C42,182 75,179 110,170 S185,154 218,133 S280,125 315,116 S360,98 400,103 S456,79 488,81 S535,50 575,59 L575,245 L0,245Z" fill="url(#fill)"/>
                <path d="M575,59 C620,67 655,81 698,74 S735,78 760,89" fill="none" stroke="#13a77e" strokeWidth="4" strokeDasharray="8 8"/>
                <circle cx="575" cy="59" r="6" fill="#fff" stroke="#13a77e" strokeWidth="4"/>
              </svg>
              <div className="months"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span></div>
              <div className="chart-callout"><b>Forecast confidence: 78%</b><span>Based on pipeline quality & public market signals</span></div>
            </div>
          </article>

          <article className="card action-card"><div className="card-head"><div><span className="eyebrow">DAILY PRIORITIES</span><h3>Where to focus now</h3></div><button className="text-button" onClick={() => setActiveNav("Daily Brief")}>View full brief →</button></div>
            <div className="action-list">{actions.map((action, index) => <div className="action" key={action.title}><div className={`action-index ${action.tone}`}>0{index + 1}</div><div className="action-body"><div className="action-title"><b>{action.title}</b><strong>{action.impact}</strong></div><p>{action.detail}</p><div><span className="owner">Owner: {action.owner}</span><button onClick={() => decide(action.title, "Accepted")}>Accept</button><button className="quiet" onClick={() => decide(action.title, "Deferred")}>Defer</button></div></div></div>)}</div>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="card regions"><div className="card-head"><div><span className="eyebrow">GROWTH HOTSPOTS</span><h3>Regional performance</h3></div><button className="more">•••</button></div><div className="region-bars">{[["North", 88, "+12.3%"], ["West", 72, "+8.8%"], ["South", 45, "−4.1%"], ["East", 61, "+6.2%"]].map(([name, width, growth]) => <div className="region" key={String(name)}><span>{name}</span><div className="bar"><i style={{width: `${width}%`}}/></div><b className={String(growth).includes("−") ? "negative" : "positive"}>{growth}</b></div>)}</div></article>
          <article className="ask-panel"><div><span className="eyebrow">ASK INTENT STUDIO</span><h3>What would you like to understand?</h3><p>Ask about performance, projections, risks, or the actions behind your strategic intent.</p></div><form onSubmit={ask}><input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. Why is our forecast below target?" aria-label="Ask a question"/><button aria-label="Ask question">↑</button></form>{answer && <div className="answer"><span>AI insight · sources available</span><p>{answer}</p></div>}<div className="question-chips"><button onClick={() => setAnswer(answers[0])}>What is our biggest growth risk?</button><button onClick={() => setAnswer(answers[1])}>Where should I intervene?</button></div></article>
        </section>
        <footer>Demo mode · Operational data is synthetic. Public facts are cited in the data-source view. <span>{status}</span></footer>
      </section>

      {setupOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Customize demonstration"><div className="setup-modal"><button className="close" onClick={() => setSetupOpen(false)}>×</button><span className="eyebrow">DEMO CONFIGURATION</span><h2>Create a company digital brain</h2><p>Public company context is combined with transparently labeled synthetic operating data.</p><label>Company name<input defaultValue="Accenture"/></label><label>Official website<input defaultValue="https://www.accenture.com"/></label><div className="data-check"><span>✓</span><div><b>Prepared demo profile</b><small>Accenture public context, 24-month history, and synthetic CRM + ERP data are ready to reuse.</small></div></div><button className="primary" onClick={() => { setSetupOpen(false); setStatus("Company brain refreshed at 08:40 IST"); }}>Use prepared digital brain <span>→</span></button></div></div>}
    </main>
  );
}

function Metric({ label, value, change, note, warning = false }: {label: string; value: string; change: string; note: string; warning?: boolean}) {
  return <article className="metric"><span className="eyebrow">{label}</span><div className="metric-value">{value}</div><div className={warning ? "metric-change warning" : "metric-change"}>{change}<small>{note}</small></div></article>;
}
