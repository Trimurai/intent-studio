"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type Role = "CEO" | "CFO" | "CSO" | "CHRO";
type Screen = "landing" | "access" | "studio";
type SourceItem = { name: string; type: string; detail: string; status: string };
type Company = { name: string; website: string; industry: string };
type RoleProfile = {
  name: string;
  title: string;
  lead: string;
  hero: string;
  intent: string;
  metrics: [string, string, string][];
  priorities: string[];
  question: string;
};

const companies: Company[] = [
  { name: "Accenture", website: "https://www.accenture.com", industry: "Technology services" },
  { name: "Reliance Retail", website: "https://relianceretail.com", industry: "Retail" },
  { name: "Tata Consultancy Services", website: "https://www.tcs.com", industry: "Technology services" },
  { name: "HDFC Bank", website: "https://www.hdfcbank.com", industry: "Financial services" },
  { name: "Mahindra & Mahindra", website: "https://www.mahindra.com", industry: "Manufacturing" },
];

const roleData: Record<Role, RoleProfile> = {
  CEO: {
    name: "Alex Morgan",
    title: "Chief Executive Officer",
    lead: "Your business is moving forward. Here is where your attention has the greatest impact.",
    hero: "92.6%",
    intent: "Grow profitable revenue",
    metrics: [["Revenue YTD", "₹1,842Cr", "↑ 8.4%"], ["Forecast to target", "92.6%", "₹147Cr gap"], ["Qualified pipeline", "₹624Cr", "↑ 14.2%"], ["Win rate", "34.8%", "↓ 2.1 pts"]],
    priorities: ["Recover South region pipeline", "Increase enterprise deal velocity", "Protect high-margin category share"],
    question: "Why is our forecast below target?",
  },
  CFO: {
    name: "Priya Shah",
    title: "Chief Financial Officer",
    lead: "Capital is working harder. Focus now on the margins, cash and choices that protect the plan.",
    hero: "18.6%",
    intent: "Expand operating leverage",
    metrics: [["EBITDA margin", "18.6%", "↑ 1.2 pts"], ["Free cash flow", "₹286Cr", "↑ 16.8%"], ["Working capital", "42 days", "↓ 4 days"], ["Cost-to-serve", "11.4%", "↓ 0.8 pts"]],
    priorities: ["Release ₹32Cr from working capital", "Protect cloud delivery margin", "Reallocate underperforming spend"],
    question: "Where is margin pressure building?",
  },
  CSO: {
    name: "Maya Chen",
    title: "Chief Strategy Officer",
    lead: "The portfolio is changing. Place the next bets where market momentum and distinctive capability meet.",
    hero: "3.4×",
    intent: "Win the next growth horizon",
    metrics: [["Strategic growth index", "3.4×", "↑ 0.6×"], ["Addressable whitespace", "₹980Cr", "↑ 21%"], ["Priority bets on-track", "7 / 9", "2 at risk"], ["Capability advantage", "74%", "↑ 5 pts"]],
    priorities: ["Accelerate AI services expansion", "Decide the health-tech partnership", "Protect data platform differentiation"],
    question: "Which strategic bet deserves more capital?",
  },
  CHRO: {
    name: "Leena Rao",
    title: "Chief Human Resources Officer",
    lead: "Your workforce strategy is becoming a growth strategy. Focus on the skills, leaders and capacity the plan needs next.",
    hero: "84%",
    intent: "Build a future-ready workforce",
    metrics: [["Critical role coverage", "84%", "↑ 6 pts"], ["Skills readiness", "71%", "↑ 9 pts"], ["Regrettable attrition", "8.2%", "↓ 1.4 pts"], ["Leadership bench", "2.3×", "↑ 0.4×"]],
    priorities: ["Close the AI delivery skill gap", "Strengthen succession for growth roles", "Retain high-impact frontline leaders"],
    question: "Where is workforce capacity putting the plan at risk?",
  },
};

const defaultSources: SourceItem[] = [
  { name: "FY26 operating plan", type: "Enterprise document", detail: "Strategy, targets and initiatives", status: "Ready" },
  { name: "CRM pipeline", type: "Synthetic internal", detail: "Opportunities, stages and conversion", status: "Ready" },
  { name: "ERP sales ledger", type: "Synthetic internal", detail: "Revenue, orders and profitability", status: "Ready" },
];

const modelOptions = ["OpenAI GPT-5", "Google Gemini 2.5 Pro", "Kimi K3"];

function todayAccessCode() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `Edb-${dd}${mm}`;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [role, setRole] = useState<Role>("CEO");
  const [page, setPage] = useState("Command center");
  const [setup, setSetup] = useState(false);
  const [model, setModel] = useState(modelOptions[0]);
  const [company, setCompany] = useState<Company>({ name: "", website: "", industry: "Technology services" });
  const [sources, setSources] = useState<SourceItem[]>(defaultSources);
  const [query, setQuery] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("Digital Brain is ready for setup");
  const profile = roleData[role];
  const uploaded = sources.filter((source) => source.type === "Private upload" || source.type === "Website");

  function enterStudio() {
    setScreen("studio");
    if (!company.name) setSetup(true);
  }

  function ingest(files: FileList | null) {
    if (!files?.length) return;
    const additions = Array.from(files).map((file) => ({
      name: file.name,
      type: "Private upload",
      detail: `${file.type || "Document"} · encrypted demo index`,
      status: "Indexing",
    }));
    setSources((old) => [...additions, ...old.filter((source) => !additions.some((addition) => addition.name === source.name))]);
    setStatus(`${additions.length} source${additions.length > 1 ? "s" : ""} being added to the Enterprise Digital Brain`);
    window.setTimeout(() => {
      setSources((old) => old.map((source) => additions.some((addition) => addition.name === source.name) ? { ...source, status: "Ready" } : source));
      setStatus("Digital Brain is active");
    }, 900);
  }

  function addLink(value: string) {
    const website = value.trim();
    if (!website) return;
    const name = website.replace(/^https?:\/\//, "").replace(/\/$/, "");
    setSources((old) => [
      { name, type: "Website", detail: "Public website · indexed for demo", status: "Ready" },
      ...old.filter((source) => source.name !== name),
    ]);
    setStatus("Website added to the Enterprise Digital Brain");
  }

  function configureCompany(nextCompany: Company) {
    setCompany(nextCompany);
    const privateSources = sources.filter((source) => source.type === "Private upload");
    const websiteName = nextCompany.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
    setSources([
      { name: websiteName, type: "Website", detail: `${nextCompany.name} public website`, status: "Ready" },
      { name: `${nextCompany.name} investor information`, type: "Public company", detail: "Public results and corporate disclosures · synthetic summary", status: "Ready" },
      { name: `${nextCompany.name} CRM pipeline`, type: "Synthetic internal", detail: "24 months of opportunities and conversion", status: "Ready" },
      { name: `${nextCompany.name} ERP sales`, type: "Synthetic internal", detail: "24 months of revenue and profitability", status: "Ready" },
      { name: "IMF World Economic Outlook · July 2026", type: "Public market", detail: "Macro outlook and growth signals", status: "Ready" },
      ...privateSources,
    ]);
    setStatus(`${nextCompany.name} Enterprise Digital Brain is active`);
    setSetup(false);
  }

  function ask(event: FormEvent) {
    event.preventDefault();
    const question = query.trim();
    if (!question) return;
    const sourceNames = uploaded.length
      ? uploaded.slice(0, 2).map((source) => source.name).join(" and ")
      : "the operating plan, ERP and CRM signals";
    const lens = role === "CHRO" ? "workforce capacity and skills" : role === "CSO" ? "market momentum and strategic fit" : role === "CFO" ? "margin, cash and capital impact" : "growth, execution and enterprise value";
    setLastQuestion(question);
    setAnswer(
      `${company.name || "The company"} should treat this as a focused decision, not a broad diagnostic. Under the ${role} lens, the strongest evidence points to ${lens}. Using ${sourceNames}, Intent Studio recommends validating the top three drivers with the accountable leaders and converting the highest-confidence lever into a seven-day action. This response is grounded in ${sources.length} connected sources and generated in demo mode with ${model}.`,
    );
    setQuery("");
  }

  if (screen === "landing") return <Landing onStart={() => setScreen("access")} />;
  if (screen === "access") return <AccessGate onBack={() => setScreen("landing")} onSuccess={enterStudio} />;

  return (
    <main className="studio-shell">
      <aside className="rail">
        <button className="logo" onClick={() => setScreen("landing")}><i>i</i><span>Intent<br /><b>Studio</b></span></button>
        <div className="workspace">{company.name ? company.name.toUpperCase() : "COMPANY SETUP"} <span>⌄</span></div>
        <nav>
          {["Command center", "Ask the Brain", "Strategic intents", "Daily brief", "Enterprise Brain"].map((item) => (
            <button key={item} className={page === item ? "active" : ""} onClick={() => setPage(item)}>
              <span>{item === "Command center" ? "◫" : item === "Ask the Brain" ? "✦" : item === "Strategic intents" ? "◎" : item === "Daily brief" ? "▷" : "◉"}</span>{item}
            </button>
          ))}
        </nav>
        <div className="rail-bottom">
          <div className="brain-state"><i /> <b>{status}</b><small>{sources.length} sources · governed retrieval</small></div>
          <button className="company-settings" onClick={() => setSetup(true)}>⚙ Company setup</button>
          <div className="user"><div>{profile.name.split(" ").map((part) => part[0]).join("")}</div><span><b>{profile.name}</b><small>{profile.title}</small></span><em>⌄</em></div>
        </div>
      </aside>
      <section className="canvas">
        <header className="top">
          <div><span className="kicker">{role} DIGITAL BRAIN <i /> UPDATED JUST NOW</span><h1>Good morning, {profile.name.split(" ")[0]}.</h1><p>{profile.lead}</p></div>
          <div className="top-actions">
            <select aria-label="Choose LLM" value={model} onChange={(event) => setModel(event.target.value)}>{modelOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <button className="round" aria-label="Notifications">⌁</button>
            <button className="dark-button" onClick={() => setSetup(true)}>Configure brain <b>→</b></button>
          </div>
        </header>
        <div className="role-switcher"><span>Leadership lens</span>{(["CEO", "CFO", "CSO", "CHRO"] as Role[]).map((item) => <button key={item} className={role === item ? "selected" : ""} onClick={() => { setRole(item); setPage("Command center"); setAnswer(""); }}>{item}<small>{roleData[item].title.replace("Chief ", "")}</small></button>)}</div>
        {page === "Command center" && <Dashboard profile={profile} role={role} company={company} setPage={setPage} />}
        {page === "Ask the Brain" && <AskBrain profile={profile} query={query} setQuery={setQuery} lastQuestion={lastQuestion} answer={answer} onAsk={ask} sources={sources} model={model} />}
        {page === "Enterprise Brain" && <BrainPage company={company} sources={sources} onFiles={ingest} onLink={addLink} onOpenSetup={() => setSetup(true)} />}
        {page === "Strategic intents" && <Intents profile={profile} />}
        {page === "Daily brief" && <Brief profile={profile} />}
      </section>
      {setup && <Setup company={company} model={model} setModel={setModel} onFiles={ingest} onSave={configureCompany} onClose={company.name ? () => setSetup(false) : undefined} />}
    </main>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <main className="landing landing-v2">
      <header>
        <button className="logo"><i>i</i><span>Intent<br /><b>Studio</b></span></button>
        <div><a href="#digital-brain">Enterprise Digital Brain</a><a href="#leadership">Leadership lenses</a><button onClick={onStart}>Enter Intent Studio <b>→</b></button></div>
      </header>
      <section className="hero hero-v2">
        <div className="hero-copy">
          <span className="pill">HUMAN INTENT · AI EXECUTION · ENTERPRISE OUTCOMES</span>
          <h1>Build your<br /><em>Enterprise Digital Brain.</em></h1>
          <p>Intent Studio turns enterprise knowledge into governed intelligence, role-aware answers and daily actions that help leaders move the business forward.</p>
          <div className="hero-actions"><button onClick={onStart}>Enter the studio <b>→</b></button><span>Built for leaders<br /><strong>CEO · CFO · CSO · CHRO</strong></span></div>
          <div className="trust-row"><span>01<br /><b>Human-led</b></span><span>02<br /><b>Grounded in evidence</b></span><span>03<br /><b>Action-oriented</b></span></div>
        </div>
        <div className="hero-art"><img src="/intent-banner.png" alt="Intent: building human-led autonomous enterprises in the age of AI" /></div>
      </section>
      <section className="brain-story" id="digital-brain">
        <img src="/intent-cover.jpg" alt="Intent book and the next era of intelligence" />
        <div><span>THE MANAGEMENT INTELLIGENCE LAYER</span><h2>Purpose in. Intelligence at work. Outcomes out.</h2><p>Your Enterprise Digital Brain brings together company systems, trusted public information and leadership intent—then converts them into focused questions, transparent evidence and actions.</p><div className="story-points"><b>Human intent<small>Defines purpose and outcomes</small></b><b>AI execution<small>Retrieves, reasons and adapts</small></b><b>Enterprise outcomes<small>Creates continuous value</small></b></div></div>
      </section>
      <section className="landing-proof" id="leadership"><span>ONE ENTERPRISE DIGITAL BRAIN. FOUR LEADERSHIP LENSES.</span><div>{(["CEO", "CFO", "CSO", "CHRO"] as Role[]).map((item) => <article key={item}><b>{item}</b><p>{item === "CEO" ? "Growth, execution and enterprise value." : item === "CFO" ? "Cash, capital and profitable performance." : item === "CSO" ? "Market shifts, strategic bets and advantage." : "Skills, leaders and workforce capacity."}</p></article>)}</div></section>
    </main>
  );
}

function AccessGate({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (password === todayAccessCode()) onSuccess();
    else setError("The access password is not valid for today.");
  }
  return (
    <main className="access-screen">
      <button className="access-back" onClick={onBack}>← Back</button>
      <section className="access-panel">
        <div className="access-brand"><i>i</i><span>INTENT STUDIO</span></div>
        <span className="kicker">SECURE DEMO WORKSPACE</span>
        <h1>Enter your Enterprise Digital Brain.</h1>
        <p>Use today&apos;s password to continue. The demo password follows the format <b>Edb-DDMM</b> using your local date.</p>
        <form onSubmit={submit}><label>Daily access password<input autoFocus type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} placeholder="Edb-DDMM" aria-invalid={Boolean(error)} /></label>{error && <div className="access-error">{error}</div>}<button>Unlock Intent Studio →</button></form>
        <small>Demo access control · password changes daily at local midnight</small>
      </section>
    </main>
  );
}

function Dashboard({ profile, role, company, setPage }: { profile: RoleProfile; role: Role; company: Company; setPage: (page: string) => void }) {
  return (
    <>
      <section className="intent-band"><div className="intent-icon">↗</div><div><span className="kicker">ACTIVE STRATEGIC INTENT</span><h2>{profile.intent}</h2><p>Align action around the few highest-confidence levers.</p></div><div className="intent-tags"><span>Signal strength: high</span><span>{role === "CFO" ? "Cash conversion" : role === "CSO" ? "Market adjacency" : role === "CHRO" ? "Skills readiness" : "Enterprise conversion"}</span></div></section>
      <section className="metric-grid">{profile.metrics.map(([label, value, change], index) => <article key={label}><span>{label}</span><b>{value}</b><small className={change.includes("↓") || change.includes("gap") || change.includes("risk") ? "warn" : ""}>{change} <em>{index === 0 ? "vs. plan" : "this quarter"}</em></small></article>)}</section>
      <section className="dashboard">
        <article className="card trajectory"><div className="card-title"><div><span className="kicker">PERFORMANCE TRAJECTORY</span><h3>{role === "CFO" ? "Margin is improving — but delivery costs are rising" : role === "CSO" ? "Priority markets are accelerating — execution is uneven" : role === "CHRO" ? "Critical capability is improving — demand is moving faster" : "Revenue is ahead of plan — but momentum is softening"}</h3></div><button aria-label="More options">•••</button></div><div className="chart-labels"><span>Current</span><span>Plan</span><span>Forecast</span></div><div className="fake-chart"><i /><i /><i /><i /><i /><svg viewBox="0 0 700 230" preserveAspectRatio="none"><path d="M0 184 C42 170,65 150,110 159 S174 130,220 136 S294 92,350 111 S424 76,467 87 S535 43,574 58 S644 50,700 29" /><path className="forecast" d="M574 58 C620 66,660 88,700 78" /></svg><div className="chart-note"><b>78% confidence</b><span>Based on connected signals</span></div></div><div className="months">APR MAY JUN JUL AUG SEP OCT NOV DEC JAN FEB MAR</div></article>
        <article className="card priorities"><div className="card-title"><div><span className="kicker">DAILY PRIORITIES</span><h3>Where to focus now</h3></div><button onClick={() => setPage("Daily brief")}>View full brief →</button></div>{profile.priorities.map((priority, index) => <div className="priority" key={priority}><b>0{index + 1}</b><div><strong>{priority}</strong><p>{index === 0 ? "Material impact is visible in the next operating cycle." : "A high-confidence intervention is ready for review."}</p><span>Owner: {role === "CFO" ? "Finance leader" : role === "CSO" ? "Strategy lead" : role === "CHRO" ? "People leader" : "Business leader"}</span></div><button>Review</button></div>)}</article>
      </section>
      <section className="lower"><article className="card signal-list"><span className="kicker">EXECUTIVE SIGNALS</span><h3>What changed since yesterday</h3><div><b>01</b><p>New evidence strengthens the case for focused intervention.</p><strong>High</strong></div><div><b>02</b><p>One plan assumption requires an executive decision.</p><strong>Watch</strong></div></article><article className="ask-card"><span className="kicker">ASK INTENT STUDIO</span><h3>What would you like to understand?</h3><p>Ask across your connected enterprise knowledge.</p><button onClick={() => setPage("Ask the Brain")}>Ask the Brain <b>→</b></button><small>Grounded answers · source citations · {role} lens</small></article></section>
      {role === "CSO" && <MarketTrends company={company} />}
    </>
  );
}

function MarketTrends({ company }: { company: Company }) {
  return (
    <section className="market-trends">
      <div className="market-head"><div><span className="kicker">PUBLIC MARKET INTELLIGENCE · JULY 2026</span><h3>{company.industry || "Industry"} outlook and external signals</h3></div><span className="public-badge">Public sources</span></div>
      <div className="trend-grid">
        <article><span>MACRO OUTLOOK</span><b>3.0%</b><h4>2026 global growth</h4><p>Growth remains uneven as technology momentum offsets geopolitical and energy pressure.</p><a href="https://www.imf.org/en/publications/weo/issues/2026/07/08/world-economic-outlook-update-july-2026" target="_blank" rel="noreferrer">IMF WEO · July 2026 ↗</a></article>
        <article><span>STRATEGIC SIGNAL</span><b>AI</b><h4>Value chains are separating</h4><p>AI-linked demand is lifting technology-integrated markets while execution capacity becomes a differentiator.</p><a href="https://www.worldbank.org/en/news/press-release/2026/06/11/global-economic-prospects-june-2026-press-release" target="_blank" rel="noreferrer">World Bank · June 2026 ↗</a></article>
        <article><span>INDUSTRY CAPABILITY</span><b>39%</b><h4>Core skills expected to change</h4><p>AI, data and cybersecurity skills are growing fastest, while leadership and resilience remain critical.</p><a href="https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/" target="_blank" rel="noreferrer">WEF Future of Jobs ↗</a></article>
      </div>
    </section>
  );
}

function AskBrain({ profile, query, setQuery, lastQuestion, answer, onAsk, sources, model }: { profile: RoleProfile; query: string; setQuery: (value: string) => void; lastQuestion: string; answer: string; onAsk: (event: FormEvent) => void; sources: SourceItem[]; model: string }) {
  return <section className="brain-chat"><div className="chat-intro"><span className="kicker">{profile.title.toUpperCase()} CONVERSATION</span><h2>Ask the business anything.</h2><p>Intent Studio retrieves relevant evidence from your Enterprise Digital Brain before it answers.</p></div><div className="suggestions">{[profile.question, "What decision should I make this week?", "What evidence changed most recently?"].map((suggestion) => <button key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>)}</div><div className="chat-box">{answer ? <><div className="bubble user-bubble">{lastQuestion}</div><div className="bubble ai-bubble"><b>Intent Studio <span>Grounded answer · {model}</span></b><p>{answer}</p><div>{sources.slice(0, 3).map((source) => <small key={source.name}>↗ {source.name}</small>)}</div></div></> : <div className="empty-chat">Your next decision is one question away.<small>{sources.length} sources ready for retrieval · {model}</small></div>}<form onSubmit={onAsk}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about strategy, performance, risk or any uploaded source…" aria-label="Ask the Enterprise Digital Brain" /><button aria-label="Send question">↑</button></form></div></section>;
}

function BrainPage({ company, sources, onFiles, onLink, onOpenSetup }: { company: Company; sources: SourceItem[]; onFiles: (files: FileList | null) => void; onLink: (value: string) => void; onOpenSetup: () => void }) {
  const [link, setLink] = useState("");
  return <section className="brain-page"><div className="page-head"><div><span className="kicker">GOVERNED KNOWLEDGE LAYER</span><h2>{company.name} Enterprise Digital Brain</h2><p>Bring documents, media and websites into a single, traceable intelligence layer.</p></div><button className="dark-button" onClick={onOpenSetup}>Company setup <b>→</b></button></div><div className="upload-grid"><label className="dropzone"><input aria-label="Upload enterprise files" type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,audio/*,video/*" onChange={(event: ChangeEvent<HTMLInputElement>) => onFiles(event.target.files)} /><b>↑</b><strong>Upload enterprise knowledge</strong><span>PDF, Word, PowerPoint, Excel, CSV, text, audio and video</span></label><form className="linkbox" onSubmit={(event) => { event.preventDefault(); onLink(link); setLink(""); }}><span>⌁</span><strong>Connect another website</strong><input type="url" value={link} onChange={(event) => setLink(event.target.value)} placeholder="https://your-company.com" required /><button>Add website →</button></form><div className="guardrail"><span>✦</span><b>Built for trust</b><p>Every answer retains source context, classification and retrieval trail.</p></div></div><div className="source-list"><div className="source-heading"><span>Connected source</span><span>Type</span><span>Coverage</span><span>Status</span></div>{sources.map((source) => <div className="source-item" key={`${source.type}-${source.name}`}><b>{source.name}</b><span className="source-type">{source.type}</span><span>{source.detail}</span><em className={source.status === "Ready" ? "ready" : "indexing"}>● {source.status}</em></div>)}</div></section>;
}

function Intents({ profile }: { profile: RoleProfile }) {
  return <section className="generic-page"><span className="kicker">STRATEGY WORKSPACE</span><h2>Strategic intents</h2><p>Focus the digital brain on outcomes that matter most.</p><div className="intent-tiles"><article className="current"><span>ACTIVE</span><h3>{profile.intent}</h3><p>Translate enterprise context into a coordinated set of measurable actions.</p><b>78%</b><small>confidence signal</small></article><article><span>DRAFT</span><h3>Build resilient advantage</h3><p>Identify strategic choices that defend long-term performance.</p><button>Activate intent</button></article></div></section>;
}

function Brief({ profile }: { profile: RoleProfile }) {
  return <section className="generic-page"><span className="kicker">TODAY&apos;S EXECUTIVE BRIEF</span><h2>Your daily brief</h2><p>Three decisions deserve attention today.</p><div className="briefs">{profile.priorities.map((priority, index) => <article key={priority}><b>0{index + 1}</b><div><span>{index === 0 ? "HIGH IMPACT" : "EXECUTIVE WATCH"}</span><h3>{priority}</h3><p>Evidence from the Enterprise Digital Brain points to a timely intervention.</p></div><button>Review action →</button></article>)}</div></section>;
}

function Setup({ company, model, setModel, onFiles, onSave, onClose }: { company: Company; model: string; setModel: (value: string) => void; onFiles: (files: FileList | null) => void; onSave: (company: Company) => void; onClose?: () => void }) {
  const [form, setForm] = useState<Company>(company);
  const [uploadMessage, setUploadMessage] = useState("");
  function chooseCompany(name: string) {
    const match = companies.find((item) => item.name === name);
    setForm((current) => ({ name, website: match?.website || current.website, industry: match?.industry || current.industry }));
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    onSave({ ...form, name: form.name.trim(), website: form.website.trim() });
  }
  return <div className="modal"><div className="setup setup-v2">{onClose && <button className="close" onClick={onClose}>×</button>}<span className="kicker">COMPANY SETUP</span><h2>Create an Enterprise Digital Brain</h2><p>Select a company or enter any company name, confirm its website and industry, then create a consistent synthetic brain for this demo.</p><form className="company-form" onSubmit={submit}><label>Company name<input list="company-options" value={form.name} onChange={(event) => chooseCompany(event.target.value)} placeholder="Select or type a company" required /><datalist id="company-options">{companies.map((item) => <option key={item.name} value={item.name} />)}</datalist></label><label>Company website<input type="url" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} placeholder="https://company.com" required /></label><label>Industry<select value={form.industry} onChange={(event) => setForm({ ...form, industry: event.target.value })}><option>Technology services</option><option>Retail</option><option>Financial services</option><option>Manufacturing</option><option>Healthcare</option><option>Consumer products</option></select></label><label>Preferred LLM<select value={model} onChange={(event) => setModel(event.target.value)}>{modelOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="setup-upload"><input aria-label="Upload company files" type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,audio/*,video/*" onChange={(event: ChangeEvent<HTMLInputElement>) => { const count = event.target.files?.length || 0; onFiles(event.target.files); setUploadMessage(`${count} file${count === 1 ? "" : "s"} selected and indexing`); }} /><b>Upload optional company files</b><span>PDF · Word · PowerPoint · Excel · CSV · audio · video</span>{uploadMessage && <em>{uploadMessage}</em>}</label><button className="create-brain">Create Digital Brain →</button></form><small>Demo mode uses synthetic internal data and public-source summaries. Uploaded file names remain in this browser session.</small></div></div>;
}
