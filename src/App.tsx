import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Github, Menu, X } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import Avatar from "./assets/avatar.jpg";
import Resume from "./assets/resume.pdf";

const work = [
  { company: "STX Next", role: "Full Stack Developer", date: "Jun 2025 — Present" },
  { company: "NotBug", role: "Full-Stack Software Engineer", date: "Jan 2024 — Apr 2025" },
  { company: "TietoEvry", role: "Python Software Engineer", date: "Nov 2022 — Sep 2024" },
  { company: "Nokia", role: "Software Engineer", date: "Jan 2020 — Oct 2022" },
];

const projects = [
  { name: "Language Learning Buddy", tag: "AI · EDUCATION", description: "An AI assistant that analyzes English and Polish sentences, spots grammar mistakes, and builds personal learning lists.", href: "https://language-learning-buddy.pl" },
  { name: "kapusz-tenis.pl", tag: "WEB · PRODUCT", description: "A focused website built to turn curious visitors into new tennis students and make the coach’s style tangible.", href: "https://kapusz-tenis.pl" },
];

const credentials = [
  { issuer: "Google Cloud", name: "Professional Cloud Developer", date: "APR 2026", href: "https://www.credly.com/badges/40f6e45b-cef3-4de4-aa94-ae26f96b7d44/public_url" },
  { issuer: "Przeprogramowani", name: "10xDevs 2", date: "DEC 2025", href: "https://credsverse.com/credentials/cb6b9a1e-674f-4a44-b1f5-6a6dadf39f2d" },
  { issuer: "AI_devs", name: "AI Devs 2", date: "NOV 2023", href: "https://credsverse.com/credentials/eeeeb928-1e2f-49d4-8164-3af619f58036" },
];

const engineeringToolkit = ["Python", "TypeScript", "React", "FastAPI", "Django", "AI agents", "Agentic workflows", "Context engineering", "Automation"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span aria-hidden="true">+</span> {children}</p>;
}

function ExternalArrow() { return <ArrowUpRight aria-hidden="true" className="h-4 w-4" />; }

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const experienceYears = Math.max(0, currentYear - 2020);
  const toggleMenu = useCallback(() => setMenuOpen((value) => !value), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const navLinks = [["Work", "#work"], ["Tech stack", "#stack"], ["Contact", "#contact"]];

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Main navigation">
          <a href="#top" className="wordmark focus-ring" aria-label="Jakub Aniszewski, home">JA<span>/DEV</span></a>
          <div className="desktop-nav">
            {navLinks.map(([label, href]) => <a key={href} href={href} className="nav-link focus-ring">{label}</a>)}
          </div>
          <a href="mailto:jakubaniszewski@pm.me?subject=Let%27s%20work%20together" className="availability focus-ring"><span className="status-dot" /> Open to new work</a>
          <button className="menu-trigger focus-ring" onClick={toggleMenu} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      {menuOpen && <div id="mobile-menu" ref={menuRef} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
        {navLinks.map(([label, href], index) => <a key={href} href={href} className="mobile-link focus-ring" style={{ "--delay": `${index * 60}ms` } as React.CSSProperties} onClick={toggleMenu}><span>0{index + 1}</span>{label}</a>)}
      </div>}

      <main id="main-content">
        <section id="top" className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-enter">SOFTWARE ENGINEER · WROCŁAW, PL</p>
            <h1 className="hero-name hero-enter">Jakub<span>Aniszewski.</span></h1>
            <p className="hero-thesis hero-enter">I build reliable software with <span>AI in the toolkit.</span></p>
            <p className="hero-intro hero-enter">I work across the stack and use agents and agentic workflows where they improve speed and quality. Strong engineering fundamentals and product judgment still come first.</p>
            <div className="hero-actions hero-enter">
              <a href="#work" className="button button-primary focus-ring">Explore my work <ArrowDown className="h-4 w-4" /></a>
              <a href={Resume} target="_blank" rel="noopener noreferrer" className="button button-ghost focus-ring">Resume <Download className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="portrait-stage hero-enter">
            <div className="portrait-frame"><img src={Avatar} alt="Jakub Aniszewski" /><div className="portrait-scan" aria-hidden="true" /></div>
            <div className="portrait-caption"><span>{experienceYears}+ YEARS ENGINEERING SOFTWARE</span><span>CODE / AI</span></div>
          </div>
          <div className="signal-line" aria-hidden="true"><span /></div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-heading reveal"><div><SectionLabel>Products</SectionLabel><h2>From intent to<br /><span>working software.</span></h2></div></div>
          <div className="project-list">{projects.map((project, index) => (
            <a key={project.name} href={project.href} target="_blank" rel="noopener noreferrer" className="project-row reveal focus-ring">
              <span className="project-number">0{index + 1}</span><div><span className="project-tag">{project.tag}</span><h3>{project.name}</h3></div><p>{project.description}</p><span className="project-open"><ExternalArrow /></span>
            </a>
          ))}</div>
        </section>

        <section id="stack" className="stack-section section-pad">
          <div className="stack-panel reveal"><SectionLabel>Toolkit / technologies &amp; workflows</SectionLabel><h2>Strong fundamentals.<br />Better leverage.</h2><div className="stack-tape" aria-label="Engineering technologies and workflows">{[...engineeringToolkit, ...engineeringToolkit].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}</div></div>
          <div className="experience-panel reveal"><SectionLabel>Engineering timeline</SectionLabel><div className="experience-list">{work.map((item, index) => <div className="experience-row" key={`${item.company}-${item.role}`}><span className="experience-index">0{index + 1}</span><div><strong>{item.company}</strong><span>{item.role}</span></div><time>{item.date}</time></div>)}</div></div>
        </section>

        <section className="credentials section-pad reveal">
          <div className="credential-heading"><SectionLabel>Continuous learning</SectionLabel><h2>Credentials</h2></div>
          <div className="credential-list">{credentials.map((credential, index) => <a key={credential.name} href={credential.href} target="_blank" rel="noopener noreferrer" className="credential-row focus-ring"><span className="credential-number">0{index + 1}</span><div className="credential-main"><div><span className="credential-issuer">{credential.issuer}</span><h3>{credential.name}</h3></div></div><time>{credential.date}</time><span className="credential-open"><ExternalArrow /></span></a>)}</div>
        </section>

        <section className="github-section section-pad reveal">
          <div className="section-heading compact"><div><SectionLabel>Open source</SectionLabel><h2>GitHub activity</h2></div></div>
          <div className="calendar-wrap"><GitHubCalendar username="jaqb8" colorScheme="dark" blockSize={14} blockMargin={5} fontSize={13} theme={{ dark: ["#17171b", "#38206f", "#5730c9", "#7c4dff", "#a88bff"] }} /></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orbit" aria-hidden="true"><span>LET’S BUILD / LET’S BUILD / LET’S BUILD /</span></div>
          <SectionLabel>Contact</SectionLabel><h2>Need solid software?<br /><em>Let’s build it.</em></h2><p>Bring the outcome you want. I’ll combine proven engineering practices with modern AI-assisted workflows to help you ship it well.</p>
          <a href="mailto:jakubaniszewski@pm.me" className="contact-link focus-ring"><span>Email</span> jakubaniszewski@pm.me <ExternalArrow /></a>
          <div className="social-links"><a href="https://github.com/jaqb8" target="_blank" rel="noopener noreferrer" className="focus-ring"><Github /> GitHub</a><a href="https://www.linkedin.com/in/jakub-aniszewski/" target="_blank" rel="noopener noreferrer" className="focus-ring"><ExternalArrow /> LinkedIn</a><a href={Resume} target="_blank" rel="noopener noreferrer" className="focus-ring"><Download /> Download my Resume!</a></div>
        </section>
      </main>

      <footer><a href="#top" className="footer-mark focus-ring" aria-label="Jakub Aniszewski, back to top">JA<span>/DEV</span></a><p>© {currentYear} Jakub Aniszewski IT Solutions</p><p className="footer-status"><span className="status-dot" /> WROCŁAW · {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Warsaw" })}</p></footer>
    </div>
  );
}

export default App;
