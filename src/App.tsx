import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Github, Menu, X } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import Avatar from "./assets/avatar.jpg";
import CloudDeveloperCertification from "./assets/professional-cloud-developer-certification.png";
import Resume from "./assets/resume.pdf";

const work = [
  { company: "STX Next", role: "Full Stack Developer", date: "Jul 2026 — Present" },
  { company: "STX Next", role: "Senior Python Developer", date: "Jun 2025 — Jul 2026" },
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

const stack = ["Python", "FastAPI", "Django", "Flask", "TypeScript", "React"];

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

  const navLinks = [["About", "#profile"], ["Work", "#work"], ["Stack", "#stack"], ["Contact", "#contact"]];

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Main navigation">
          <a href="#top" className="wordmark focus-ring" aria-label="Jakub Aniszewski, home">JA<span>/DEV</span></a>
          <div className="desktop-nav">
            {navLinks.map(([label, href]) => <a key={href} href={href} className="nav-link focus-ring">{label}</a>)}
          </div>
          <a href="mailto:jakubaniszewski@pm.me?subject=Let%27s%20work%20together" className="availability focus-ring"><span className="status-dot" /> Available for a challenge</a>
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
            <p className="eyebrow hero-enter">FULL-STACK ENGINEER · WROCŁAW, PL</p>
            <h1 className="hero-title hero-enter">I turn complex<span>systems into</span><em>things that ship.</em></h1>
            <p className="hero-intro hero-enter">Python at the core. TypeScript at the edges. Product judgment all the way through.</p>
            <div className="hero-actions hero-enter">
              <a href="#work" className="button button-primary focus-ring">Explore my work <ArrowDown className="h-4 w-4" /></a>
              <a href={Resume} target="_blank" rel="noopener noreferrer" className="button button-ghost focus-ring">Resume <Download className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="portrait-stage hero-enter">
            <div className="portrait-index">BUILD / 06</div>
            <div className="portrait-frame"><img src={Avatar} alt="Jakub Aniszewski" /><div className="portrait-scan" aria-hidden="true" /></div>
            <div className="portrait-caption"><span>{experienceYears}+ YEARS IN PRODUCTION</span><span>PY / TS</span></div>
          </div>
          <div className="signal-line" aria-hidden="true"><span /></div>
        </section>

        <section id="profile" className="manifesto section-pad reveal">
          <SectionLabel>Profile / what I optimize for</SectionLabel>
          <div className="manifesto-grid">
            <p className="manifesto-lead">Clear thinking.<br />Calm execution.<br /><span>Useful software.</span></p>
            <div className="manifesto-copy">
              <p>I build production-ready web products that feel fast, stay reliable, and make teams proud to ship. I care about the invisible work too: maintainability, honest communication, and leaving systems easier to understand than I found them.</p>
              <div className="principles" aria-label="Working principles"><span>01 / OWN THE OUTCOME</span><span>02 / MAKE PROGRESS VISIBLE</span><span>03 / BUILD FOR THE NEXT DEV</span></div>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-heading reveal"><div><SectionLabel>Selected work / live builds</SectionLabel><h2>Work that earns<br /><span>its place.</span></h2></div></div>
          <div className="project-list">{projects.map((project, index) => (
            <a key={project.name} href={project.href} target="_blank" rel="noopener noreferrer" className="project-row reveal focus-ring">
              <span className="project-number">0{index + 1}</span><div><span className="project-tag">{project.tag}</span><h3>{project.name}</h3></div><p>{project.description}</p><span className="project-open"><ExternalArrow /></span>
            </a>
          ))}</div>
        </section>

        <section id="stack" className="stack-section section-pad">
          <div className="stack-panel reveal"><SectionLabel>Toolkit / daily drivers</SectionLabel><h2>Built for both<br />sides of the stack.</h2><div className="stack-tape" aria-label="Technology stack">{[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}</div></div>
          <div className="experience-panel reveal"><SectionLabel>Timeline / since 2020</SectionLabel><div className="experience-list">{work.map((item, index) => <div className="experience-row" key={`${item.company}-${item.role}`}><span className="experience-index">0{index + 1}</span><div><strong>{item.company}</strong><span>{item.role}</span></div><time>{item.date}</time></div>)}</div></div>
        </section>

        <section className="credentials section-pad reveal">
          <div className="credential-heading"><SectionLabel>Proof / keep learning</SectionLabel><h2>Credentials</h2><img src={CloudDeveloperCertification} alt="Google Cloud Professional Cloud Developer badge" /></div>
          <div className="credential-list">{credentials.map((credential) => <a key={credential.name} href={credential.href} target="_blank" rel="noopener noreferrer" className="credential-row focus-ring"><span>{credential.issuer}</span><strong>{credential.name}</strong><time>{credential.date}</time><ExternalArrow /></a>)}</div>
        </section>

        <section className="github-section section-pad reveal">
          <div className="section-heading compact"><div><SectionLabel>Open source / recent signal</SectionLabel><h2>GitHub activity</h2></div></div>
          <div className="calendar-wrap"><GitHubCalendar username="jaqb8" colorScheme="dark" blockSize={14} blockMargin={5} fontSize={13} theme={{ dark: ["#17171b", "#38206f", "#5730c9", "#7c4dff", "#a88bff"] }} /></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orbit" aria-hidden="true"><span>LET’S BUILD / LET’S BUILD / LET’S BUILD /</span></div>
          <SectionLabel>Contact / open channel</SectionLabel><h2>Have a hard problem?<br /><em>Send it my way.</em></h2><p>I reply within 24 hours. Clear brief optional — curiosity required.</p>
          <a href="mailto:jakubaniszewski@pm.me" className="contact-link focus-ring"><span>Email</span> jakubaniszewski@pm.me <ExternalArrow /></a>
          <div className="social-links"><a href="https://github.com/jaqb8" target="_blank" rel="noopener noreferrer" className="focus-ring"><Github /> GitHub</a><a href="https://www.linkedin.com/in/jakub-aniszewski/" target="_blank" rel="noopener noreferrer" className="focus-ring"><ExternalArrow /> LinkedIn</a><a href={Resume} target="_blank" rel="noopener noreferrer" className="focus-ring"><Download /> Download my Resume!</a></div>
        </section>
      </main>

      <footer><a href="#top" className="footer-mark focus-ring">JA/DEV</a><p>© {currentYear} Jakub Aniszewski IT Solutions</p><p className="footer-status"><span className="status-dot" /> WROCŁAW · {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Warsaw" })}</p></footer>
    </div>
  );
}

export default App;
