use client";

import { useEffect, useRef, useState } from "react";

const MAIL_URL = "https://mail.fades.lol";

/* =========================================================
   ICONS
   ========================================================= */

function Logo({ size = 34 }) {
  return (
    <img
      src="/logo.png"
      alt="Fades Mail"
      width={size}
      height={size}
      className="brand-logo"
    />
  );
}

function Arrow({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function SparkleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
      <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 20 6v5c0 5.2-3.4 8.4-8 10-4.6-1.6-8-4.8-8-10V6l8-3Z" />
      <path d="m8.7 12 2.1 2.1 4.6-4.7" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4.5 13h6L11 22l8.5-11h-6L13 2Z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16v13H4z" />
      <path d="M4 14h4l1.5 2h5L16 14h4" />
    </svg>
  );
}

/* =========================================================
   REVEAL
   ========================================================= */

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -7% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = "" }) {
  const [ref, visible] = useReveal();

  return (
    <div ref={ref} className={`scroll-reveal ${visible ? "is-visible" : ""} ${delay} ${className}`}>
      {children}
    </div>
  );
}

/* =========================================================
   PRODUCT PREVIEWS
   ========================================================= */

const messages = [
  {
    initials: "F",
    sender: "Fades",
    email: "hello@fades.lol",
    subject: "Welcome to Fades Mail",
    preview: "Your inbox is ready. Experience email, reimagined.",
    time: "10:42 AM",
    color: "gold",
    unread: true,
  },
  {
    initials: "J",
    sender: "James Wilson",
    email: "james@example.com",
    subject: "The project looks great!",
    preview: "Just went through everything. Love the new design...",
    time: "9:18 AM",
    color: "blue",
    unread: true,
  },
  {
    initials: "S",
    sender: "Sarah Miller",
    email: "sarah@example.com",
    subject: "Meeting confirmation",
    preview: "Hey, just confirming we're still on for tomorrow.",
    time: "Yesterday",
    color: "pink",
    unread: false,
  },
  {
    initials: "M",
    sender: "Michael Chen",
    email: "michael@example.com",
    subject: "Here are the files",
    preview: "I've attached the documents we discussed earlier.",
    time: "Yesterday",
    color: "green",
    unread: false,
  },
];

function InboxPreview({ compact = false }) {
  const [activeTab, setActiveTab] = useState("Primary");
  const [selected, setSelected] = useState(0);

  const visibleMessages =
    activeTab === "Starred"
      ? messages.slice(0, 2)
      : activeTab === "Sent"
      ? messages.slice(1, 3)
      : messages;

  return (
    <div className={`mail-preview presentation-preview ${compact ? "presentation-preview-compact" : ""}`}>
      <div className="mail-preview-header">
        <div className="mail-preview-dots">
          <span /><span /><span />
        </div>
        <span className="preview-window-title">Fades Mail</span>
        <div className="preview-header-status"><span className="online-dot" /> Live</div>
      </div>

      <div className="mail-preview-body">
        <aside className="mail-preview-sidebar">
          <button className="preview-compose" type="button">
            <span>+</span> Compose
          </button>

          {["Primary", "Starred", "Sent"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`mail-preview-sidebar-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setSelected(0);
              }}
            >
              <span className="sidebar-item-icon">
                {tab === "Primary" ? "◈" : tab === "Starred" ? "☆" : "↗"}
              </span>
              {tab}
              {tab === "Primary" && <b>2</b>}
            </button>
          ))}

          <div className="preview-sidebar-bottom">
            <span>Storage</span>
            <div className="storage-track"><i /></div>
            <small>2.4 GB of 15 GB</small>
          </div>
        </aside>

        <div className="mail-preview-main">
          <div className="preview-toolbar">
            <strong>{activeTab}</strong>
            <div className="preview-toolbar-actions">
              <button type="button" aria-label="Search"><SearchIcon /></button>
              <button type="button" aria-label="More">•••</button>
            </div>
          </div>

          <div className="mail-preview-messages">
            {visibleMessages.map((message, index) => (
              <button
                key={message.sender}
                type="button"
                className={`mail-preview-message ${selected === index ? "selected" : ""}`}
                onClick={() => setSelected(index)}
              >
                <div className={`mail-preview-avatar ${message.color}`}>{message.initials}</div>
                <div className="mail-preview-message-content">
                  <div className="mail-preview-sender">
                    <strong>{message.sender}</strong>
                    <span>{message.time}</span>
                  </div>
                  <div className="mail-preview-subject">
                    {message.subject}
                    {message.unread && <i />}
                  </div>
                  <p>{message.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComposePreview() {
  return (
    <div className="compose-window enhanced-compose">
      <div className="compose-header">
        <div>
          <span className="compose-kicker">NEW MESSAGE</span>
          <strong>Compose</strong>
        </div>
        <div className="compose-window-actions"><span /><span /><span /></div>
      </div>

      <div className="compose-row">
        <span>To</span>
        <div className="recipient-pill">James Wilson <b>×</b></div>
      </div>

      <div className="compose-row">
        <span>Subject</span>
        <strong>The project looks great!</strong>
      </div>

      <div className="compose-message">
        Hey James,
        <br /><br />
        Just wanted to follow up on our conversation. The new direction is looking really good and I think we're ready for the next step.
        <br /><br />
        Talk soon,
        <br />
        Fades
        <span className="compose-cursor" />
      </div>

      <div className="compose-footer">
        <div className="compose-tools">
          <span>B</span><span>I</span><span>↗</span><span>+</span>
        </div>
        <button type="button" className="btn btn-primary btn-sm">Send <Arrow size={14} /></button>
        <span className="draft-status"><CheckIcon size={12} /> Draft saved</span>
      </div>
    </div>
  );
}

function StoryMailWindow() {
  return (
    <div className="story-window story-window-front">
      <div className="story-window-top"><span /><span /><span /></div>
      <div className="story-email">
        <div className="story-avatar">F</div>
        <div>
          <strong>Welcome to Fades Mail</strong>
          <span>hello@fades.lol · Just now</span>
        </div>
      </div>
      <div className="story-email-body">
        <small>HELLO THERE</small>
        Experience email,
        <br />
        <em>reimagined.</em>
      </div>
      <div className="story-email-lines"><span /><span /><span /></div>
    </div>
  );
}

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const original = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = original; };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const features = [
    {
      eyebrow: "01 / INBOX",
      title: <>Your inbox,<br /><span>finally under control.</span></>,
      text: "See what matters without fighting through clutter. Everything stays organized, readable, and effortless to navigate.",
      icon: <InboxIcon />,
    },
    {
      eyebrow: "02 / COMPOSE",
      title: <>Write naturally.<br /><span>Send instantly.</span></>,
      text: "A focused writing experience keeps the tools you need close without taking attention away from what you're trying to say.",
      icon: <BoltIcon />,
    },
    {
      eyebrow: "03 / EXPERIENCE",
      title: <>Small details.<br /><span>Big difference.</span></>,
      text: "Fluid transitions, subtle feedback, and polished interactions make everyday email feel considered instead of mechanical.",
      icon: <SparkleIcon />,
    },
  ];

  return (
    <div className="presentation-page">

      <header className={`navbar presentation-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="/" className="brand" onClick={closeMenu}>
            <Logo size={34} />
            <span className="brand-name">Fades<span>Mail</span></span>
          </a>

          <nav className="navbar-links">
            <a href="#about" className="navbar-link">About</a>
            <a href="#features" className="navbar-link">Features</a>
            <a href="#experience" className="navbar-link">Experience</a>
          </nav>

          <div className="navbar-actions">
            <span className="nav-status"><span className="online-dot" /> Available now</span>
            <a href={MAIL_URL} className="btn btn-primary btn-sm">
              Open Fades Mail <Arrow size={15} />
            </a>
            <button
              type="button"
              className="mobile-menu-button btn-icon"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="presentation-mobile-menu">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#features" onClick={closeMenu}>Features</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href={MAIL_URL} onClick={closeMenu}>Open Fades Mail <Arrow size={15} /></a>
          </div>
        )}
      </header>

      <main>

        {/* HERO */}

        <section className="presentation-hero">
          <div className="hero-grid" />
          <div className="presentation-hero-background" />
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="presentation-hero-content">
            <Reveal>
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                INTRODUCING FADES MAIL
                <span className="hero-eyebrow-line" />
              </div>

              <h1 className="presentation-title">
                Email,
                <br />
                <span className="hero-title-gradient">reimagined.</span>
              </h1>

              <p className="hero-description">
                A calmer, cleaner email experience built for people who
                want their inbox to feel as good as the rest of their workflow.
              </p>

              <div className="hero-actions">
                <a href={MAIL_URL} className="btn btn-primary btn-lg">
                  Open Fades Mail <Arrow />
                </a>
                <a href="#about" className="btn btn-secondary btn-lg">
                  Explore the experience
                </a>
              </div>

              <div className="hero-proof">
                <div className="hero-proof-avatars">
                  <span>F</span><span>J</span><span>S</span><span>+</span>
                </div>
                <div>
                  <strong>Made to be opened every day.</strong>
                  <small>Simple interface · Thoughtful details · No clutter</small>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="presentation-hero-product">
            <div className="presentation-glow" />

            <div className="presentation-floating-card presentation-floating-left">
              <div className="floating-icon"><SparkleIcon /></div>
              <div><strong>Thoughtful design</strong><span>Every detail matters.</span></div>
            </div>

            <div className="presentation-floating-card presentation-floating-right">
              <span className="online-dot" />
              <div><strong>Always in reach</strong><span>Simple. Smooth. Fades.</span></div>
            </div>

            <div className="hero-window-shadow" />
            <InboxPreview />
          </Reveal>

          <a href="#about" className="presentation-scroll-hint">
            <span>SCROLL TO EXPLORE</span>
            <span className="presentation-scroll-arrow">↓</span>
          </a>
        </section>

        {/* QUICK VALUE STRIP */}

        <section className="value-strip">
          <div className="value-strip-inner">
            <div><span className="value-icon"><BoltIcon /></span><div><strong>Fast by design</strong><small>Less friction, more focus.</small></div></div>
            <div><span className="value-icon"><ShieldIcon /></span><div><strong>Built with care</strong><small>Your inbox stays yours.</small></div></div>
            <div><span className="value-icon"><SparkleIcon /></span><div><strong>Beautifully simple</strong><small>Polished without the noise.</small></div></div>
          </div>
        </section>

        {/* STORY */}

        <section className="presentation-story" id="about">
          <div className="presentation-sticky">
            <Reveal className="presentation-story-copy">
              <span className="section-eyebrow">A DIFFERENT KIND OF EMAIL</span>
              <h2>Your email.<br /><span>With a little more life.</span></h2>
              <p>Email is something we use every day. We think it should feel just as good to use as it is useful.</p>
              <p>Fades Mail brings together a clean interface, fluid interactions, and carefully designed details to make managing messages feel natural.</p>

              <div className="story-points">
                <div><span><CheckIcon /></span><strong>Clear by default</strong><small>Important things stay visible.</small></div>
                <div><span><CheckIcon /></span><strong>Made for focus</strong><small>Less noise around every message.</small></div>
                <div><span><CheckIcon /></span><strong>Feels like Fades</strong><small>Distinctive without being distracting.</small></div>
              </div>

              <a href={MAIL_URL} className="text-link">Experience Fades Mail <Arrow size={17} /></a>
            </Reveal>

            <Reveal className="presentation-story-visual">
              <div className="story-orbit" />
              <div className="story-window story-window-back">
                <div className="story-window-bar" />
                <div className="story-window-line short" />
                <div className="story-window-line" />
                <div className="story-window-line medium" />
                <div className="story-window-line" />
              </div>
              <StoryMailWindow />
              <div className="story-stat-card"><span>01</span><strong>Less noise.</strong><small>More room for what matters.</small></div>
            </Reveal>
          </div>
        </section>

        {/* STATEMENT */}

        <section className="presentation-statement">
          <Reveal>
            <span className="section-eyebrow">DESIGNED AROUND THE WAY YOU WORK</span>
            <h2>Everything has a place.<br /><span>Nothing gets in your way.</span></h2>
          </Reveal>
        </section>

        {/* FEATURES */}

        <section className="presentation-features" id="features">
          <Reveal className="presentation-section-heading">
            <span className="section-eyebrow">BUILT AROUND YOU</span>
            <h2>Everything you need.<br /><span>Nothing in the way.</span></h2>
            <p>Every part of Fades Mail has a job. The interface stays quiet so your messages can stay loud.</p>
          </Reveal>

          <div className="feature-tabs">
            {features.map((feature, index) => (
              <button
                key={feature.eyebrow}
                type="button"
                className={activeFeature === index ? "active" : ""}
                onClick={() => setActiveFeature(index)}
              >
                <span>{feature.icon}</span>
                {feature.eyebrow.split(" / ")[1]}
              </button>
            ))}
          </div>

          <div className="presentation-feature-stack">

            <Reveal className={`presentation-feature ${activeFeature === 1 ? "feature-emphasis" : ""}`}>
              <div className="presentation-feature-visual inbox-feature">
                <div className="feature-visual-glow" />
                <InboxPreview compact />
              </div>
              <div className="presentation-feature-copy">
                <span className="feature-number">{features[0].eyebrow}</span>
                <h3>{features[0].title}</h3>
                <p>{features[0].text}</p>
                <a href={MAIL_URL} className="text-link">Explore your inbox <Arrow size={17} /></a>
              </div>
            </Reveal>

            <Reveal className="presentation-feature presentation-feature-reverse">
              <div className="presentation-feature-visual compose-feature">
                <div className="feature-visual-glow" />
                <ComposePreview />
              </div>
              <div className="presentation-feature-copy">
                <span className="feature-number">{features[1].eyebrow}</span>
                <h3>{features[1].title}</h3>
                <p>{features[1].text}</p>
                <a href={MAIL_URL} className="text-link">Start writing <Arrow size={17} /></a>
              </div>
            </Reveal>

            <Reveal className="presentation-feature">
              <div className="presentation-feature-visual motion-feature">
                <div className="motion-orbit" />
                <div className="motion-center"><Logo size={42} /></div>
                <div className="motion-card motion-card-one"><SparkleIcon /><span>Thoughtful details</span></div>
                <div className="motion-card motion-card-two"><CheckIcon /><span>Draft saved</span></div>
                <div className="motion-card motion-card-three"><span className="online-dot" /><span>Connected</span></div>
              </div>
              <div className="presentation-feature-copy">
                <span className="feature-number">{features[2].eyebrow}</span>
                <h3>{features[2].title}</h3>
                <p>{features[2].text}</p>
                <a href={MAIL_URL} className="text-link">Experience the details <Arrow size={17} /></a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE GRID */}

        <section className="experience-grid-section">
          <Reveal className="experience-grid-heading">
            <span className="section-eyebrow">THE LITTLE THINGS</span>
            <h2>Designed to disappear<br /><span>until you need it.</span></h2>
          </Reveal>

          <div className="experience-grid">
            <Reveal className="experience-card experience-card-large">
              <div className="experience-card-top"><span className="mini-icon"><SearchIcon /></span><span>01</span></div>
              <div className="fake-search"><SearchIcon /><span>Search your inbox...</span><kbd>⌘ K</kbd></div>
              <h3>Find it instantly.</h3>
              <p>Search stays close, fast, and out of your way until the exact moment you need it.</p>
            </Reveal>

            <Reveal className="experience-card">
              <div className="experience-card-top"><span className="mini-icon"><ShieldIcon /></span><span>02</span></div>
              <div className="secure-badge"><ShieldIcon /><strong>Private by design</strong><small>Your messages belong to you.</small></div>
              <h3>Quiet confidence.</h3>
              <p>A clean experience should also feel trustworthy.</p>
            </Reveal>

            <Reveal className="experience-card">
              <div className="experience-card-top"><span className="mini-icon"><BoltIcon /></span><span>03</span></div>
              <div className="speed-lines"><i /><i /><i /><i /></div>
              <h3>Quick where it counts.</h3>
              <p>Move through everyday email without unnecessary steps.</p>
            </Reveal>

            <Reveal className="experience-card experience-card-wide">
              <div className="wide-card-copy">
                <span className="section-eyebrow">ONE CLEAN WORKSPACE</span>
                <h3>Your inbox should work <span>with you.</span></h3>
                <p>From the first unread message to the last sent reply, Fades Mail keeps the experience focused from start to finish.</p>
                <a href={MAIL_URL} className="text-link">Open Fades Mail <Arrow size={17} /></a>
              </div>
              <div className="wide-card-art">
                <div className="art-ring art-ring-one" />
                <div className="art-ring art-ring-two" />
                <div className="art-mail-card"><Logo size={36} /><strong>Fades</strong><small>Mail</small></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BIG STATEMENT */}

        <section className="presentation-big-statement">
          <div className="presentation-big-statement-inner">
            <Reveal>
              <span className="section-eyebrow">EMAIL, REIMAGINED</span>
              <h2>Simple enough<br />for every day.</h2>
              <p>Powerful enough to keep up.</p>
              <div className="statement-line"><span /><span /><span /></div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}

        <section className="presentation-final" id="experience">
          <div className="presentation-final-grid" />
          <div className="presentation-final-glow" />

          <Reveal className="presentation-final-content">
            <div className="presentation-final-logo"><Logo size={58} /></div>
            <span className="section-eyebrow">THE FADES MAIL EXPERIENCE</span>
            <h2>Email should feel<br /><span>this good.</span></h2>
            <p>A little more personality. A little more polish. And a whole lot more attention to the details that matter.</p>

            <div className="final-actions">
              <a href={MAIL_URL} className="btn btn-primary btn-lg">Experience Fades Mail <Arrow /></a>
              <a href="#features" className="btn btn-secondary btn-lg">See what changed</a>
            </div>

            <div className="presentation-url">
              <span className="online-dot" />
              mail.fades.lol
              <span className="url-divider" />
              Available now
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="/" className="brand">
                <Logo size={32} />
                <span className="brand-name">Fades<span>Mail</span></span>
              </a>
              <p className="footer-brand-description">Email, reimagined.<br />A Fades product.</p>
              <div className="footer-live"><span className="online-dot" /> mail.fades.lol is online</div>
            </div>

            <div>
              <div className="footer-column-title">EXPLORE</div>
              <div className="footer-links">
                <a href="#about" className="footer-link">About</a>
                <a href="#features" className="footer-link">Features</a>
                <a href="#experience" className="footer-link">Experience</a>
              </div>
            </div>

            <div>
              <div className="footer-column-title">FADES</div>
              <div className="footer-links">
                <a href="https://fades.lol" target="_blank" rel="noreferrer" className="footer-link">Fades AI</a>
                <a href={MAIL_URL} target="_blank" rel="noreferrer" className="footer-link">Fades Mail</a>
                <a href="https://browse.fades.lol" target="_blank" rel="noreferrer" className="footer-link">Fades Browser</a>
              </div>
            </div>

            <div>
              <div className="footer-column-title">GET STARTED</div>
              <div className="footer-links">
                <a href={MAIL_URL} className="footer-link">Open your inbox <Arrow size={13} /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Fades. All rights reserved.</span>
            <a href={MAIL_URL} className="footer-link">mail.fades.lol <Arrow size={14} /></a>
          </div>
        </div>
      </footer>

      {/* =====================================================
          PAGE-LOCAL VISUAL SYSTEM
          This keeps the landing page polished even if the
          existing global stylesheet is minimal.
          ===================================================== */}

      <style jsx global>{`
        :root {
          --fm-bg: #070707;
          --fm-panel: rgba(255,255,255,.045);
          --fm-panel-strong: rgba(255,255,255,.075);
          --fm-line: rgba(255,255,255,.09);
          --fm-line-strong: rgba(255,255,255,.15);
          --fm-text: #f6f5f2;
          --fm-muted: #989795;
          --fm-soft: #c7c5c1;
          --fm-accent: #d6aa5a;
          --fm-accent-2: #f0cf8a;
          --fm-shadow: 0 35px 100px rgba(0,0,0,.48);
        }

        .presentation-page {
          background:
            radial-gradient(circle at 50% -10%, rgba(214,170,90,.075), transparent 28rem),
            var(--fm-bg);
          color: var(--fm-text);
          min-height: 100vh;
          overflow: hidden;
        }

        .presentation-page * { box-sizing: border-box; }
        .presentation-page a { color: inherit; text-decoration: none; }
        .presentation-page button { font: inherit; }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .scroll-reveal.is-visible { opacity: 1; transform: translateY(0); }
        .scroll-reveal.delay-1 { transition-delay: .12s; }
        .scroll-reveal.delay-2 { transition-delay: .22s; }

        .navbar.presentation-navbar {
          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;
          right: 0;
          padding: 18px 28px;
          transition: .35s ease;
        }
        .navbar.presentation-navbar.navbar-scrolled {
          padding: 10px 28px;
        }
        .navbar-inner {
          width: min(1240px, 100%);
          margin: auto;
          min-height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px 0 15px;
          border: 1px solid transparent;
          border-radius: 20px;
          transition: .35s ease;
        }
        .navbar-scrolled .navbar-inner {
          background: rgba(12,12,12,.72);
          border-color: var(--fm-line);
          backdrop-filter: blur(22px);
          box-shadow: 0 16px 45px rgba(0,0,0,.2);
        }

        .brand { display:flex; align-items:center; gap:11px; font-weight:700; letter-spacing:-.03em; }
        .brand-logo { display:block; object-fit:contain; }
        .brand-name { font-size:18px; }
        .brand-name > span { color: var(--fm-accent-2); }

        .navbar-links { display:flex; gap:34px; margin-left:100px; }
        .navbar-link {
          color:#aaa8a3;
          font-size:13px;
          transition:.2s ease;
        }
        .navbar-link:hover { color:#fff; }
        .navbar-actions { display:flex; align-items:center; gap:13px; }
        .nav-status {
          display:flex;
          align-items:center;
          gap:7px;
          color:#8f8d88;
          font-size:11px;
          margin-right:5px;
        }

        .online-dot {
          display:inline-block;
          width:7px;
          height:7px;
          flex:0 0 7px;
          border-radius:50%;
          background:#a7cf79;
          box-shadow:0 0 0 4px rgba(167,207,121,.08), 0 0 16px rgba(167,207,121,.45);
        }

        .btn {
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          border:1px solid transparent;
          cursor:pointer;
          border-radius:12px;
          font-weight:650;
          transition:transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .btn:hover { transform:translateY(-2px); }
        .btn-primary {
          color:#111 !important;
          background:linear-gradient(135deg,var(--fm-accent-2),var(--fm-accent));
          box-shadow:0 10px 32px rgba(214,170,90,.14);
        }
        .btn-primary:hover { box-shadow:0 14px 40px rgba(214,170,90,.23); }
        .btn-secondary {
          color:#eee !important;
          border-color:var(--fm-line);
          background:rgba(255,255,255,.035);
        }
        .btn-secondary:hover { background:rgba(255,255,255,.07); border-color:var(--fm-line-strong); }
        .btn-sm { min-height:42px; padding:0 17px; font-size:12px; }
        .btn-lg { min-height:54px; padding:0 22px; font-size:13px; border-radius:14px; }
        .btn-icon { border:0; background:transparent; color:#fff; display:none; }

        .presentation-mobile-menu {
          display:none;
          width:min(1240px,100%);
          margin:8px auto 0;
          padding:12px;
          border:1px solid var(--fm-line);
          border-radius:18px;
          background:rgba(13,13,13,.9);
          backdrop-filter:blur(20px);
        }
        .presentation-mobile-menu a {
          display:flex;
          justify-content:space-between;
          padding:14px;
          border-radius:12px;
          color:#c5c3bf;
        }
        .presentation-mobile-menu a:hover { background:rgba(255,255,255,.05); color:#fff; }

        .presentation-hero {
          position:relative;
          min-height:920px;
          padding:170px 6vw 100px;
          display:grid;
          grid-template-columns:minmax(0,.88fr) minmax(520px,1.12fr);
          align-items:center;
          gap:40px;
          isolation:isolate;
        }
        .presentation-hero-background {
          position:absolute;
          inset:0;
          z-index:-3;
          background:
            radial-gradient(ellipse at 76% 52%, rgba(214,170,90,.12), transparent 26%),
            radial-gradient(ellipse at 20% 20%, rgba(255,255,255,.035), transparent 22%);
        }
        .hero-grid {
          position:absolute;
          inset:0;
          z-index:-4;
          opacity:.25;
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
          background-size:70px 70px;
          mask-image:linear-gradient(to bottom,black,transparent 85%);
        }
        .hero-orb {
          position:absolute;
          border-radius:50%;
          filter:blur(1px);
          z-index:-2;
          pointer-events:none;
        }
        .hero-orb-one { width:460px;height:460px;right:-160px;top:150px;background:rgba(214,170,90,.055); }
        .hero-orb-two { width:280px;height:280px;left:-180px;bottom:40px;background:rgba(255,255,255,.025); }

        .presentation-hero-content { width:min(620px,100%); justify-self:end; }
        .hero-eyebrow,.section-eyebrow {
          display:flex;
          align-items:center;
          gap:9px;
          color:#a7a49d;
          font-size:10px;
          font-weight:750;
          letter-spacing:.19em;
        }
        .hero-eyebrow-dot {
          width:6px;height:6px;border-radius:50%;
          background:var(--fm-accent-2);
          box-shadow:0 0 15px rgba(240,207,138,.5);
        }
        .hero-eyebrow-line { width:40px;height:1px;background:var(--fm-line-strong); }
        .presentation-title {
          margin:26px 0 24px;
          font-size:clamp(70px,8.3vw,128px);
          line-height:.86;
          letter-spacing:-.075em;
          font-weight:680;
        }
        .hero-title-gradient {
          background:linear-gradient(120deg,#fff 5%,#d8b36c 55%,#9b773b);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
        }
        .hero-description {
          max-width:530px;
          color:#a3a09a;
          font-size:16px;
          line-height:1.75;
          margin:0 0 32px;
        }
        .hero-actions { display:flex; gap:12px; flex-wrap:wrap; }
        .hero-proof {
          display:flex;
          align-items:center;
          gap:13px;
          margin-top:30px;
        }
        .hero-proof-avatars { display:flex; }
        .hero-proof-avatars span {
          width:28px;height:28px;border-radius:50%;
          display:grid;place-items:center;
          margin-right:-7px;
          border:2px solid #0b0b0b;
          background:#2b2a28;
          color:#ddd;
          font-size:9px;
        }
        .hero-proof-avatars span:nth-child(2){background:#3d5064}
        .hero-proof-avatars span:nth-child(3){background:#634957}
        .hero-proof-avatars span:nth-child(4){background:#171717}
        .hero-proof strong,.hero-proof small { display:block; }
        .hero-proof strong { font-size:11px;color:#d8d6d1; }
        .hero-proof small { color:#777570;font-size:10px;margin-top:3px; }

        .presentation-hero-product {
          position:relative;
          width:min(720px,100%);
          justify-self:start;
        }
        .presentation-glow {
          position:absolute;
          inset:12% 5%;
          background:radial-gradient(circle,rgba(214,170,90,.19),transparent 62%);
          filter:blur(30px);
        }
        .hero-window-shadow {
          position:absolute;
          left:10%;
          right:4%;
          bottom:-22px;
          height:80px;
          background:rgba(0,0,0,.7);
          filter:blur(30px);
        }
        .presentation-floating-card {
          position:absolute;
          z-index:4;
          display:flex;
          align-items:center;
          gap:10px;
          min-width:170px;
          padding:11px 13px;
          border:1px solid rgba(255,255,255,.11);
          border-radius:14px;
          background:rgba(18,18,18,.8);
          backdrop-filter:blur(18px);
          box-shadow:var(--fm-shadow);
        }
        .presentation-floating-left { left:-22px;top:14%; }
        .presentation-floating-right { right:-18px;bottom:13%; }
        .presentation-floating-card strong,.presentation-floating-card span { display:block; }
        .presentation-floating-card strong { font-size:10px;color:#e8e5df; }
        .presentation-floating-card div > span { font-size:9px;color:#77746f;margin-top:3px; }
        .floating-icon {
          width:29px;height:29px;display:grid;place-items:center;
          border-radius:9px;background:rgba(214,170,90,.1);color:var(--fm-accent-2);
        }

        .mail-preview {
          position:relative;
          border:1px solid rgba(255,255,255,.13);
          border-radius:22px;
          overflow:hidden;
          background:#101010;
          box-shadow:0 45px 120px rgba(0,0,0,.58), inset 0 1px rgba(255,255,255,.045);
        }
        .mail-preview-header {
          height:48px;
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 16px;
          background:#151515;
          border-bottom:1px solid rgba(255,255,255,.07);
        }
        .mail-preview-dots { display:flex;gap:5px; }
        .mail-preview-dots span { width:7px;height:7px;border-radius:50%;background:#3b3a37; }
        .preview-window-title { font-size:10px;color:#aaa7a0; }
        .preview-header-status { margin-left:auto;display:flex;align-items:center;gap:7px;color:#6f6d68;font-size:9px; }
        .mail-preview-body { display:flex;min-height:410px; }
        .mail-preview-sidebar {
          width:170px;
          padding:16px 11px;
          border-right:1px solid rgba(255,255,255,.065);
          background:#0d0d0d;
        }
        .preview-compose {
          width:100%;
          border:1px solid rgba(214,170,90,.16);
          background:rgba(214,170,90,.08);
          color:#d8b976;
          border-radius:10px;
          padding:10px;
          text-align:left;
          font-size:10px;
          margin-bottom:15px;
        }
        .preview-compose span { margin-right:7px;font-size:14px; }
        .mail-preview-sidebar-item {
          width:100%;
          display:flex;
          align-items:center;
          gap:8px;
          border:0;
          color:#777570;
          background:transparent;
          padding:9px 10px;
          border-radius:8px;
          font-size:10px;
          text-align:left;
          cursor:pointer;
        }
        .mail-preview-sidebar-item.active { color:#e5e2dc;background:rgba(255,255,255,.055); }
        .mail-preview-sidebar-item b { margin-left:auto;font-size:8px;color:var(--fm-accent-2); }
        .sidebar-item-icon { width:15px;color:#67645f; }
        .preview-sidebar-bottom { margin-top:105px;padding:10px;color:#68655f; }
        .preview-sidebar-bottom span { font-size:8px; }
        .preview-sidebar-bottom small { font-size:7px; }
        .storage-track { height:3px;background:#292825;border-radius:9px;margin:8px 0 5px;overflow:hidden; }
        .storage-track i { display:block;width:36%;height:100%;background:var(--fm-accent); }
        .mail-preview-main { flex:1;min-width:0; }
        .preview-toolbar {
          height:58px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 17px;
          border-bottom:1px solid rgba(255,255,255,.06);
        }
        .preview-toolbar strong { font-size:13px;font-weight:600; }
        .preview-toolbar-actions { display:flex;gap:5px; }
        .preview-toolbar-actions button { width:29px;height:29px;border:0;background:transparent;color:#66635e;display:grid;place-items:center; }
        .mail-preview-messages { padding:4px; }
        .mail-preview-message {
          display:flex;
          width:100%;
          gap:11px;
          padding:12px 12px;
          border:0;
          border-bottom:1px solid rgba(255,255,255,.045);
          background:transparent;
          color:inherit;
          text-align:left;
          cursor:pointer;
          border-radius:9px;
        }
        .mail-preview-message:hover,.mail-preview-message.selected { background:rgba(255,255,255,.045); }
        .mail-preview-avatar {
          flex:0 0 31px;width:31px;height:31px;
          display:grid;place-items:center;border-radius:10px;
          font-size:9px;font-weight:700;
        }
        .mail-preview-avatar.gold{background:#44351c;color:#e3bd70}
        .mail-preview-avatar.blue{background:#202f40;color:#91b8e4}
        .mail-preview-avatar.pink{background:#3d2934;color:#d99ab6}
        .mail-preview-avatar.green{background:#25392d;color:#9ac49f}
        .mail-preview-message-content { min-width:0;flex:1; }
        .mail-preview-sender { display:flex;justify-content:space-between;gap:10px; }
        .mail-preview-sender strong { font-size:10px;color:#d7d4ce; }
        .mail-preview-sender span { font-size:8px;color:#5f5c57; }
        .mail-preview-subject { font-size:10px;color:#aaa7a1;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .mail-preview-subject i { display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--fm-accent);margin-left:6px;vertical-align:middle; }
        .mail-preview-message p { margin:4px 0 0;color:#5e5b56;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }

        .presentation-scroll-hint {
          position:absolute;bottom:35px;left:50%;transform:translateX(-50%);
          display:flex;align-items:center;gap:12px;color:#696762;font-size:8px;letter-spacing:.18em;
        }
        .presentation-scroll-arrow { width:28px;height:28px;border:1px solid var(--fm-line);border-radius:50%;display:grid;place-items:center;color:#aaa; }

        .value-strip {
          border-top:1px solid var(--fm-line);
          border-bottom:1px solid var(--fm-line);
          background:rgba(255,255,255,.018);
        }
        .value-strip-inner {
          width:min(1150px,calc(100% - 50px));
          margin:auto;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          padding:25px 0;
        }
        .value-strip-inner > div { display:flex;align-items:center;justify-content:center;gap:11px;border-right:1px solid var(--fm-line); }
        .value-strip-inner > div:last-child { border-right:0; }
        .value-icon { width:38px;height:38px;display:grid;place-items:center;border:1px solid var(--fm-line);border-radius:11px;color:var(--fm-accent-2);background:rgba(255,255,255,.025); }
        .value-strip strong,.value-strip small { display:block; }
        .value-strip strong { font-size:11px; }
        .value-strip small { color:#67645f;font-size:9px;margin-top:3px; }

        .presentation-story { padding:170px 7vw; }
        .presentation-sticky { width:min(1150px,100%);margin:auto;display:grid;grid-template-columns:.86fr 1fr;align-items:center;gap:100px; }
        .presentation-story-copy h2,.presentation-section-heading h2,.presentation-statement h2,.experience-grid-heading h2 {
          margin:22px 0 25px;
          font-size:clamp(46px,5vw,78px);
          line-height:.98;
          letter-spacing:-.055em;
        }
        .presentation-story-copy h2 span,.presentation-section-heading h2 span,.presentation-statement h2 span,.experience-grid-heading h2 span { color:#77746e; }
        .presentation-story-copy p,.presentation-section-heading p {
          max-width:520px;
          color:#8f8c86;
          line-height:1.75;
          font-size:14px;
          margin:0 0 14px;
        }
        .story-points { margin:28px 0;display:grid;gap:12px; }
        .story-points > div { display:grid;grid-template-columns:27px 1fr;column-gap:10px;align-items:center; }
        .story-points span { width:27px;height:27px;border-radius:8px;display:grid;place-items:center;color:var(--fm-accent-2);background:rgba(214,170,90,.08); }
        .story-points strong { font-size:10px; }
        .story-points small { color:#68655f;font-size:9px;grid-column:2;margin-top:2px; }
        .text-link { display:inline-flex;align-items:center;gap:9px;color:#d7d4ce !important;font-size:11px;font-weight:650;border-bottom:1px solid rgba(255,255,255,.12);padding-bottom:5px; }
        .text-link:hover { color:var(--fm-accent-2) !important;border-color:rgba(214,170,90,.4); }

        .presentation-story-visual { position:relative;min-height:530px;display:grid;place-items:center; }
        .story-orbit { position:absolute;width:440px;height:440px;border:1px solid rgba(214,170,90,.11);border-radius:50%;box-shadow:0 0 90px rgba(214,170,90,.04); }
        .story-orbit:after { content:"";position:absolute;width:9px;height:9px;border-radius:50%;background:var(--fm-accent);left:10%;top:22%;box-shadow:0 0 20px rgba(214,170,90,.5); }
        .story-window { position:absolute;border:1px solid rgba(255,255,255,.08);background:#111;border-radius:17px;box-shadow:var(--fm-shadow); }
        .story-window-back { width:390px;height:290px;transform:rotate(-5deg) translate(-15px,18px);opacity:.55; }
        .story-window-bar { height:34px;border-bottom:1px solid rgba(255,255,255,.06); }
        .story-window-line { height:7px;background:#252422;border-radius:5px;margin:20px 25px 0; }
        .story-window-line.short { width:32%; }
        .story-window-line.medium { width:57%; }
        .story-window-front { width:430px;padding-bottom:25px;z-index:2;transform:rotate(3deg); }
        .story-window-top { height:38px;display:flex;align-items:center;gap:5px;padding:0 15px;border-bottom:1px solid rgba(255,255,255,.06); }
        .story-window-top span { width:6px;height:6px;border-radius:50%;background:#393733; }
        .story-email { display:flex;gap:11px;align-items:center;padding:24px 25px 18px; }
        .story-avatar { width:35px;height:35px;display:grid;place-items:center;border-radius:11px;background:#42331d;color:#e3bd70;font-weight:700;font-size:11px; }
        .story-email strong,.story-email span { display:block; }
        .story-email strong { font-size:11px; }
        .story-email span { font-size:8px;color:#62605b;margin-top:4px; }
        .story-email-body { padding:16px 25px 12px;font-size:22px;line-height:1.3;color:#d8d5cf; }
        .story-email-body small { display:block;color:#77746e;font-size:7px;letter-spacing:.16em;margin-bottom:12px; }
        .story-email-body em { color:#b89a60;font-style:normal; }
        .story-email-lines { padding:0 25px;display:grid;gap:7px; }
        .story-email-lines span { height:4px;background:#292825;border-radius:5px; }
        .story-email-lines span:nth-child(1){width:90%}.story-email-lines span:nth-child(2){width:73%}.story-email-lines span:nth-child(3){width:82%}
        .story-stat-card { position:absolute;right:-10px;bottom:35px;z-index:4;width:145px;padding:13px;border:1px solid var(--fm-line);background:rgba(16,16,16,.88);backdrop-filter:blur(15px);border-radius:13px;box-shadow:var(--fm-shadow); }
        .story-stat-card span,.story-stat-card strong,.story-stat-card small { display:block; }
        .story-stat-card span { color:var(--fm-accent);font-size:8px;letter-spacing:.15em; }
        .story-stat-card strong { margin-top:8px;font-size:11px; }
        .story-stat-card small { margin-top:4px;color:#696661;font-size:8px;line-height:1.5; }

        .presentation-statement { padding:150px 7vw 170px;text-align:center;border-top:1px solid var(--fm-line); }
        .presentation-statement .section-eyebrow,.presentation-section-heading .section-eyebrow,.experience-grid-heading .section-eyebrow { justify-content:center; }
        .presentation-statement h2 { max-width:900px;margin:25px auto 0; }

        .presentation-features { padding:130px 7vw 170px; }
        .presentation-section-heading { width:min(1050px,100%);margin:0 auto 50px; }
        .presentation-section-heading p { margin-top:25px; }
        .feature-tabs { width:min(1050px,100%);margin:0 auto 55px;display:flex;gap:8px;border-bottom:1px solid var(--fm-line); }
        .feature-tabs button { flex:1;display:flex;align-items:center;justify-content:center;gap:8px;border:0;border-bottom:2px solid transparent;background:transparent;color:#66635e;padding:13px 10px;cursor:pointer;font-size:9px;letter-spacing:.08em;transition:.2s; }
        .feature-tabs button.active { color:#e3dfd7;border-bottom-color:var(--fm-accent); }
        .feature-tabs button span { color:var(--fm-accent-2); }
        .presentation-feature-stack { width:min(1150px,100%);margin:auto;display:grid;gap:140px; }
        .presentation-feature { display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:90px; }
        .presentation-feature-reverse { grid-template-columns:.8fr 1.2fr; }
        .presentation-feature-reverse .presentation-feature-visual { order:2; }
        .presentation-feature-reverse .presentation-feature-copy { order:1; }
        .presentation-feature-visual { position:relative;min-height:480px;display:grid;place-items:center; }
        .feature-visual-glow { position:absolute;width:80%;height:70%;background:radial-gradient(circle,rgba(214,170,90,.11),transparent 65%);filter:blur(18px); }
        .presentation-feature-visual .mail-preview { width:100%;z-index:2; }
        .presentation-feature-copy .feature-number { color:#77736c;font-size:9px;letter-spacing:.18em; }
        .presentation-feature-copy h3 { font-size:clamp(39px,4.5vw,68px);line-height:.98;letter-spacing:-.055em;margin:20px 0 24px; }
        .presentation-feature-copy h3 span { color:#77736e; }
        .presentation-feature-copy p { max-width:430px;color:#8a8781;font-size:13px;line-height:1.75;margin-bottom:26px; }

        .enhanced-compose { width:100%;min-height:460px;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:#111;box-shadow:var(--fm-shadow);overflow:hidden;z-index:2; }
        .compose-header { display:flex;justify-content:space-between;align-items:center;padding:15px 18px;border-bottom:1px solid rgba(255,255,255,.07); }
        .compose-kicker { display:block;font-size:7px;letter-spacing:.17em;color:#68655f;margin-bottom:4px; }
        .compose-header strong { font-size:11px; }
        .compose-window-actions { display:flex;gap:5px; }
        .compose-window-actions span { width:6px;height:6px;border-radius:50%;background:#3a3834; }
        .compose-row { display:flex;align-items:center;gap:18px;padding:13px 18px;border-bottom:1px solid rgba(255,255,255,.045);font-size:9px; }
        .compose-row > span { width:42px;color:#66635e; }
        .compose-row strong { font-weight:500;color:#bdbab4; }
        .recipient-pill { padding:6px 9px;border-radius:7px;background:rgba(255,255,255,.05);color:#bdbab4; }
        .recipient-pill b { margin-left:8px;color:#66635e; }
        .compose-message { position:relative;min-height:270px;padding:22px 19px;color:#9b9891;font-size:10px;line-height:1.75; }
        .compose-cursor { display:inline-block;width:1px;height:12px;background:var(--fm-accent);margin-left:2px;vertical-align:-2px;animation:blink 1s infinite; }
        .compose-footer { display:flex;align-items:center;gap:12px;padding:12px 16px;border-top:1px solid rgba(255,255,255,.07); }
        .compose-tools { display:flex;gap:13px;color:#65625c;font-size:9px;margin-right:auto; }
        .draft-status { display:flex;align-items:center;gap:5px;color:#5d5a55;font-size:8px; }
        @keyframes blink { 50% { opacity:0; } }

        .motion-feature { border:1px solid rgba(255,255,255,.07);border-radius:22px;background:radial-gradient(circle at center,rgba(214,170,90,.055),rgba(255,255,255,.015) 48%,transparent 70%);overflow:hidden; }
        .motion-orbit { position:absolute;width:330px;height:330px;border:1px solid rgba(255,255,255,.08);border-radius:50%; }
        .motion-orbit:before,.motion-orbit:after { content:"";position:absolute;border:1px solid rgba(214,170,90,.12);border-radius:50%;inset:35px;transform:rotate(35deg); }
        .motion-orbit:after { inset:70px;transform:rotate(-35deg); }
        .motion-center { position:absolute;z-index:2;width:78px;height:78px;display:grid;place-items:center;border:1px solid rgba(214,170,90,.2);border-radius:23px;background:#151310;box-shadow:0 0 60px rgba(214,170,90,.13); }
        .motion-card { position:absolute;z-index:3;display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid var(--fm-line);border-radius:11px;background:rgba(18,18,18,.84);backdrop-filter:blur(15px);font-size:8px;color:#aaa69e;box-shadow:0 18px 50px rgba(0,0,0,.35); }
        .motion-card-one { top:24%;right:7%; }.motion-card-two { bottom:22%;left:7%; }.motion-card-three { bottom:10%;right:12%; }
        .motion-card-one svg { color:var(--fm-accent-2); }.motion-card-two svg { color:#99c77e; }

        .experience-grid-section { padding:150px 7vw; }
        .experience-grid-heading { text-align:center;margin-bottom:65px; }
        .experience-grid { width:min(1150px,100%);margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:15px; }
        .experience-card { min-height:340px;padding:27px;border:1px solid var(--fm-line);border-radius:22px;background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.018));position:relative;overflow:hidden; }
        .experience-card:hover { border-color:rgba(214,170,90,.18); }
        .experience-card-top { display:flex;justify-content:space-between;align-items:center;color:#55524d;font-size:8px;letter-spacing:.14em; }
        .mini-icon { width:35px;height:35px;display:grid;place-items:center;border:1px solid var(--fm-line);border-radius:10px;color:#c6a15c;background:rgba(214,170,90,.04); }
        .experience-card h3 { margin:42px 0 9px;font-size:25px;letter-spacing:-.035em; }
        .experience-card p { color:#77746e;max-width:350px;font-size:11px;line-height:1.7; }
        .fake-search { position:absolute;top:110px;left:27px;right:27px;height:55px;display:flex;align-items:center;gap:10px;padding:0 15px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#101010;color:#5e5b56;font-size:9px; }
        .fake-search kbd { margin-left:auto;padding:4px 7px;border:1px solid var(--fm-line);border-radius:5px;font-size:7px;color:#6e6b65; }
        .experience-card-large { min-height:390px; }
        .secure-badge { position:absolute;top:105px;left:27px;right:27px;padding:17px;border:1px solid rgba(167,207,121,.1);border-radius:15px;background:rgba(167,207,121,.035); }
        .secure-badge svg { color:#9dc37d; }
        .secure-badge strong,.secure-badge small { display:block;margin-left:30px; }
        .secure-badge strong { margin-top:-21px;font-size:10px; }
        .secure-badge small { color:#5e6258;margin-top:5px;font-size:8px; }
        .speed-lines { position:absolute;top:110px;left:27px;right:27px;display:grid;gap:9px; }
        .speed-lines i { display:block;height:7px;border-radius:9px;background:linear-gradient(90deg,rgba(214,170,90,.28),rgba(255,255,255,.03)); }
        .speed-lines i:nth-child(1){width:100%}.speed-lines i:nth-child(2){width:74%}.speed-lines i:nth-child(3){width:88%}.speed-lines i:nth-child(4){width:53%}
        .experience-card-wide { grid-column:1 / -1;min-height:330px;display:flex;align-items:center;justify-content:space-between; }
        .wide-card-copy { max-width:520px;position:relative;z-index:2; }
        .wide-card-copy h3 { font-size:38px;line-height:1;max-width:450px;margin:16px 0; }
        .wide-card-copy h3 span { color:#77746e; }
        .wide-card-copy p { margin-bottom:23px; }
        .wide-card-art { width:390px;height:260px;position:relative;display:grid;place-items:center; }
        .art-ring { position:absolute;border:1px solid rgba(214,170,90,.1);border-radius:50%; }
        .art-ring-one { width:260px;height:260px; }.art-ring-two { width:180px;height:180px; }
        .art-mail-card { position:relative;z-index:2;width:125px;height:145px;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:#121212;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 30px 70px rgba(0,0,0,.5); }
        .art-mail-card strong { font-size:14px;margin-top:10px; }.art-mail-card small { color:var(--fm-accent);font-size:8px;letter-spacing:.2em;margin-top:3px; }

        .presentation-big-statement { padding:190px 7vw;position:relative;text-align:center;border-top:1px solid var(--fm-line);border-bottom:1px solid var(--fm-line);background:radial-gradient(circle at center,rgba(214,170,90,.045),transparent 38%); }
        .presentation-big-statement h2 { font-size:clamp(65px,8vw,125px);line-height:.88;letter-spacing:-.07em;margin:28px 0 20px; }
        .presentation-big-statement p { color:#74716b;font-size:14px; }
        .statement-line { display:flex;justify-content:center;gap:5px;margin-top:45px; }
        .statement-line span { height:2px;width:22px;background:#4c4943; }.statement-line span:first-child{width:60px;background:var(--fm-accent);}

        .presentation-final { position:relative;min-height:760px;display:grid;place-items:center;padding:120px 7vw;text-align:center;isolation:isolate; }
        .presentation-final-glow { position:absolute;z-index:-2;width:700px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(214,170,90,.13),transparent 64%);filter:blur(20px); }
        .presentation-final-grid { position:absolute;inset:0;z-index:-3;opacity:.2;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:70px 70px;mask-image:radial-gradient(circle at center,black,transparent 72%); }
        .presentation-final-content { max-width:780px;display:flex;align-items:center;flex-direction:column; }
        .presentation-final-logo { width:88px;height:88px;display:grid;place-items:center;border:1px solid rgba(214,170,90,.17);border-radius:28px;background:rgba(214,170,90,.045);box-shadow:0 0 70px rgba(214,170,90,.08);margin-bottom:28px; }
        .presentation-final-content .section-eyebrow { justify-content:center; }
        .presentation-final-content h2 { font-size:clamp(62px,7vw,105px);line-height:.88;letter-spacing:-.07em;margin:25px 0; }
        .presentation-final-content h2 span { color:var(--fm-accent); }
        .presentation-final-content p { max-width:530px;color:#88857e;font-size:14px;line-height:1.75;margin-bottom:30px; }
        .final-actions { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
        .presentation-url { display:flex;align-items:center;gap:8px;margin-top:27px;color:#65625c;font-size:9px; }
        .url-divider { width:25px;height:1px;background:var(--fm-line-strong); }

        .footer { border-top:1px solid var(--fm-line);padding:70px 7vw 25px;background:#050505; }
        .footer-inner { width:min(1150px,100%);margin:auto; }
        .footer-top { display:grid;grid-template-columns:2fr repeat(3,1fr);gap:50px;padding-bottom:70px; }
        .footer-brand-description { color:#65625c;font-size:11px;line-height:1.7;margin:20px 0; }
        .footer-live { display:flex;align-items:center;gap:7px;color:#5e5b55;font-size:9px; }
        .footer-column-title { color:#4e4b46;font-size:8px;font-weight:700;letter-spacing:.16em;margin-bottom:18px; }
        .footer-links { display:grid;gap:11px; }
        .footer-link { color:#77746d !important;font-size:10px;display:inline-flex;align-items:center;gap:7px; }
        .footer-link:hover { color:#ddd9d0 !important; }
        .footer-bottom { display:flex;justify-content:space-between;align-items:center;padding-top:20px;border-top:1px solid var(--fm-line);color:#484641;font-size:9px; }

        @media (max-width: 1050px) {
          .navbar-links,.nav-status { display:none; }
          .btn-icon { display:grid;place-items:center; }
          .presentation-mobile-menu { display:block; }
          .presentation-hero { grid-template-columns:1fr;min-height:auto;padding-top:150px; }
          .presentation-hero-content,.presentation-hero-product { justify-self:center; }
          .presentation-hero-product { margin-top:30px; }
          .presentation-sticky { grid-template-columns:1fr;gap:50px; }
          .presentation-story-visual { min-height:560px; }
          .presentation-feature,.presentation-feature-reverse { grid-template-columns:1fr;gap:35px; }
          .presentation-feature-reverse .presentation-feature-visual,.presentation-feature-reverse .presentation-feature-copy { order:initial; }
          .presentation-feature-copy { text-align:center;display:flex;flex-direction:column;align-items:center; }
          .experience-card-wide { flex-direction:column;align-items:flex-start; }
          .wide-card-art { align-self:center; }
        }

        @media (max-width: 700px) {
          .navbar.presentation-navbar { padding:10px 12px; }
          .navbar-scrolled .navbar-inner { padding-left:11px; }
          .navbar-inner { min-height:58px; }
          .navbar-actions .btn-primary { display:none; }
          .presentation-hero { padding:125px 20px 85px; }
          .presentation-title { font-size:72px; }
          .hero-description { font-size:14px; }
          .hero-actions { flex-direction:column; }
          .hero-actions .btn { width:100%; }
          .presentation-floating-card { display:none; }
          .presentation-scroll-hint { display:none; }
          .mail-preview-sidebar { display:none; }
          .mail-preview-body { min-height:370px; }
          .value-strip-inner { grid-template-columns:1fr;gap:17px;padding:20px 0; }
          .value-strip-inner > div { justify-content:flex-start;border-right:0;padding-left:5px; }
          .presentation-story,.presentation-features,.experience-grid-section { padding:100px 20px; }
          .presentation-story-copy h2,.presentation-section-heading h2,.presentation-statement h2,.experience-grid-heading h2 { font-size:46px; }
          .presentation-story-visual { min-height:440px;transform:scale(.86);margin-left:-20px;margin-right:-20px; }
          .story-window-front { width:360px; }
          .story-window-back { width:330px; }
          .story-stat-card { right:-4px; }
          .presentation-statement { padding:100px 20px; }
          .feature-tabs { overflow-x:auto; }
          .feature-tabs button { min-width:120px; }
          .presentation-feature-stack { gap:90px; }
          .presentation-feature-visual { min-height:370px; }
          .enhanced-compose { min-height:410px; }
          .experience-grid { grid-template-columns:1fr; }
          .experience-card-wide { grid-column:auto; }
          .wide-card-art { width:100%;transform:scale(.8);margin-top:-20px; }
          .presentation-big-statement { padding:110px 20px; }
          .presentation-big-statement h2 { font-size:64px; }
          .presentation-final { min-height:650px;padding:100px 20px; }
          .presentation-final-content h2 { font-size:62px; }
          .final-actions { flex-direction:column;width:100%; }
          .final-actions .btn { width:100%; }
          .footer { padding:55px 20px 20px; }
          .footer-top { grid-template-columns:1fr 1fr;gap:35px 20px; }
          .footer-brand { grid-column:1 / -1; }
          .footer-bottom { flex-direction:column;align-items:flex-start;gap:10px; }
        }
      `}</style>
    </div>
  );
}
