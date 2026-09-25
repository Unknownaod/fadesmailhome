"use client";

import { useEffect, useRef, useState } from "react";

const MAIL_URL = "https://mail.fades.lol";

/* =========================
   ICONS
   ========================= */

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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function SparkleIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
      <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
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
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 20 6v5c0 5.2-3.4 8.4-8 10-4.6-1.6-8-4.8-8-10V6l8-3Z" />
      <path d="m8.7 12 2.1 2.1 4.6-4.7" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 4.5 13h6L11 22l8.5-11h-6L13 2Z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 5.5h16v13H4z" />
      <path d="M4 14h4l1.5 2h5L16 14h4" />
    </svg>
  );
}

/* =========================
   REVEAL
   ========================= */

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -7% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = "" }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${delay} ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================
   EMAIL PREVIEW
   ========================= */

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
    <div
      className={`mail-preview ${
        compact ? "mail-preview-compact" : ""
      }`}
    >
      <div className="mail-preview-header">
        <div className="mail-preview-dots">
          <span className="mail-preview-dot" />
          <span className="mail-preview-dot" />
          <span className="mail-preview-dot" />
        </div>

        <span className="preview-window-title">Fades Mail</span>

        <div className="preview-header-status">
          <span className="online-dot" />
          Live
        </div>
      </div>

      <div className="mail-preview-body">
        <aside className="mail-preview-sidebar">
          <button className="preview-compose" type="button">
            <span>+</span>
            Compose
          </button>

          {["Primary", "Starred", "Sent"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`mail-preview-sidebar-item ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSelected(0);
              }}
            >
              <span className="sidebar-item-icon">
                {tab === "Primary"
                  ? "◈"
                  : tab === "Starred"
                    ? "☆"
                    : "↗"}
              </span>

              {tab}

              {tab === "Primary" && <b>2</b>}
            </button>
          ))}

          <div className="preview-sidebar-bottom">
            <span>Storage</span>

            <div className="storage-track">
              <i />
            </div>

            <small>2.4 GB of 15 GB</small>
          </div>
        </aside>

        <div className="mail-preview-main">
          <div className="preview-toolbar">
            <strong>{activeTab}</strong>

            <div className="preview-toolbar-actions">
              <button type="button" aria-label="Search">
                <SearchIcon />
              </button>

              <button type="button" aria-label="More">
                •••
              </button>
            </div>
          </div>

          <div className="mail-preview-messages">
            {visibleMessages.map((message, index) => (
              <button
                key={`${message.sender}-${message.subject}`}
                type="button"
                className={`mail-preview-message ${
                  selected === index ? "selected" : ""
                }`}
                onClick={() => setSelected(index)}
              >
                <div className={`mail-preview-avatar ${message.color}`}>
                  {message.initials}
                </div>

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

/* =========================
   COMPOSE PREVIEW
   ========================= */

function ComposePreview() {
  return (
    <div className="compose-window">
      <div className="compose-header">
        <div>
          <span className="compose-kicker">NEW MESSAGE</span>
          <strong>Compose</strong>
        </div>

        <div className="compose-window-actions">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="compose-row">
        <span>To</span>

        <div className="recipient-pill">
          James Wilson <b>×</b>
        </div>
      </div>

      <div className="compose-row">
        <span>Subject</span>
        <strong>The project looks great!</strong>
      </div>

      <div className="compose-message">
        Hey James,
        <br />
        <br />
        Just wanted to follow up on our conversation. The new direction is
        looking really good and I think we're ready for the next step.
        <br />
        <br />
        Talk soon,
        <br />
        Fades
        <span className="compose-cursor" />
      </div>

      <div className="compose-footer">
        <div className="compose-tools">
          <span>B</span>
          <span>I</span>
          <span>↗</span>
          <span>+</span>
        </div>

        <button type="button" className="btn btn-primary btn-sm">
          Send <Arrow size={14} />
        </button>

        <span className="draft-status">
          <CheckIcon size={12} />
          Draft saved
        </span>
      </div>
    </div>
  );
}

/* =========================
   STORY PREVIEW
   ========================= */

function StoryMailWindow() {
  return (
    <div className="story-window story-window-front">
      <div className="story-window-top">
        <span />
        <span />
        <span />
      </div>

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

      <div className="story-email-lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* =========================
   HOME
   ========================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const original = html.style.scrollBehavior;

    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = original;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const features = [
    {
      eyebrow: "01 / INBOX",
      title: (
        <>
          Your inbox,
          <br />
          <span>finally under control.</span>
        </>
      ),
      text: "See what matters without fighting through clutter. Everything stays organized, readable, and effortless to navigate.",
      icon: <InboxIcon />,
    },
    {
      eyebrow: "02 / COMPOSE",
      title: (
        <>
          Write naturally.
          <br />
          <span>Send instantly.</span>
        </>
      ),
      text: "A focused writing experience keeps the tools you need close without taking attention away from what you're trying to say.",
      icon: <BoltIcon />,
    },
    {
      eyebrow: "03 / EXPERIENCE",
      title: (
        <>
          Small details.
          <br />
          <span>Big difference.</span>
        </>
      ),
      text: "Fluid transitions, subtle feedback, and polished interactions make everyday email feel considered instead of mechanical.",
      icon: <SparkleIcon />,
    },
  ];

  return (
    <div className="presentation-page">
      <header
        className={`navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="navbar-inner">
          <a href="/" className="brand" onClick={closeMenu}>
            <Logo size={34} />

            <span className="brand-name">
              Fades<span>Mail</span>
            </span>
          </a>

          <nav className="navbar-links" aria-label="Main navigation">
            <a href="#about" className="navbar-link">
              About
            </a>

            <a href="#features" className="navbar-link">
              Features
            </a>

            <a href="#experience" className="navbar-link">
              Experience
            </a>
          </nav>

          <div className="navbar-actions">
            <span className="nav-status">
              <span className="online-dot" />
              Available now
            </span>

            <a href={MAIL_URL} className="btn btn-primary btn-sm">
              Open Fades Mail <Arrow size={15} />
            </a>

            <button
              type="button"
              className="mobile-menu-button btn-icon"
              aria-label={
                menuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="presentation-mobile-menu">
            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#features" onClick={closeMenu}>
              Features
            </a>

            <a href="#experience" onClick={closeMenu}>
              Experience
            </a>

            <a href={MAIL_URL} onClick={closeMenu}>
              Open Fades Mail <Arrow size={15} />
            </a>
          </div>
        )}
      </header>

      <main>
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
                <span className="hero-title-gradient">
                  reimagined.
                </span>
              </h1>

              <p className="hero-description">
                A calmer, cleaner email experience built for people who
                want their inbox to feel as good as the rest of their
                workflow.
              </p>

              <div className="hero-actions">
                <a
                  href={MAIL_URL}
                  className="btn btn-primary btn-lg"
                >
                  Open Fades Mail <Arrow />
                </a>

                <a
                  href="#about"
                  className="btn btn-secondary btn-lg"
                >
                  Explore the experience
                </a>
              </div>

              <div className="hero-proof">
                <div className="hero-proof-avatars">
                  <span>F</span>
                  <span>J</span>
                  <span>S</span>
                  <span>+</span>
                </div>

                <div>
                  <strong>Made to be opened every day.</strong>

                  <small>
                    Simple interface · Thoughtful details · No clutter
                  </small>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="presentation-hero-product">
            <div className="presentation-glow" />

            <div className="presentation-floating-card presentation-floating-left">
              <div className="floating-icon">
                <SparkleIcon />
              </div>

              <div>
                <strong>Thoughtful design</strong>
                <span>Every detail matters.</span>
              </div>
            </div>

            <div className="presentation-floating-card presentation-floating-right">
              <span className="online-dot" />

              <div>
                <strong>Always in reach</strong>
                <span>Simple. Smooth. Fades.</span>
              </div>
            </div>

            <div className="hero-window-shadow" />

            <InboxPreview />
          </Reveal>

          <a
            href="#about"
            className="presentation-scroll-hint"
            aria-label="Scroll to explore"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="presentation-scroll-arrow">↓</span>
          </a>
        </section>

        <section className="value-strip">
          <div className="value-strip-inner">
            <div>
              <span className="value-icon">
                <BoltIcon />
              </span>

              <div>
                <strong>Fast by design</strong>
                <small>Less friction, more focus.</small>
              </div>
            </div>

            <div>
              <span className="value-icon">
                <ShieldIcon />
              </span>

              <div>
                <strong>Built with care</strong>
                <small>Your inbox stays yours.</small>
              </div>
            </div>

            <div>
              <span className="value-icon">
                <SparkleIcon />
              </span>

              <div>
                <strong>Beautifully simple</strong>
                <small>Polished without the noise.</small>
              </div>
            </div>
          </div>
        </section>

        <section className="presentation-story" id="about">
          <div className="presentation-sticky">
            <Reveal className="presentation-story-copy">
              <span className="section-eyebrow">
                A DIFFERENT KIND OF EMAIL
              </span>

              <h2>
                Your email.
                <br />
                <span>With a little more life.</span>
              </h2>

              <p>
                Email is something we use every day. We think it should feel
                just as good to use as it is useful.
              </p>

              <p>
                Fades Mail brings together a clean interface, fluid
                interactions, and carefully designed details to make managing
                messages feel natural.
              </p>

              <div className="story-points">
                <div>
                  <span>
                    <CheckIcon />
                  </span>

                  <strong>Clear by default</strong>
                  <small>Important things stay visible.</small>
                </div>

                <div>
                  <span>
                    <CheckIcon />
                  </span>

                  <strong>Made for focus</strong>
                  <small>Less noise around every message.</small>
                </div>

                <div>
                  <span>
                    <CheckIcon />
                  </span>

                  <strong>Feels like Fades</strong>
                  <small>Distinctive without being distracting.</small>
                </div>
              </div>

              <a href={MAIL_URL} className="text-link">
                Experience Fades Mail <Arrow size={17} />
              </a>
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

              <div className="story-stat-card">
                <span>01</span>
                <strong>Less noise.</strong>
                <small>More room for what matters.</small>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="presentation-statement">
          <Reveal>
            <span className="section-eyebrow">
              DESIGNED AROUND THE WAY YOU WORK
            </span>

            <h2>
              Everything has a place.
              <br />
              <span>Nothing gets in your way.</span>
            </h2>
          </Reveal>
        </section>

        <section className="presentation-features" id="features">
          <Reveal className="presentation-section-heading">
            <span className="section-eyebrow">
              BUILT AROUND YOU
            </span>

            <h2>
              Everything you need.
              <br />
              <span>Nothing in the way.</span>
            </h2>

            <p>
              Every part of Fades Mail has a job. The interface stays quiet
              so your messages can stay loud.
            </p>
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
            <Reveal
              className={`presentation-feature ${
                activeFeature === 0 ? "feature-emphasis" : ""
              }`}
            >
              <div className="presentation-feature-visual inbox-feature">
                <div className="feature-visual-glow" />
                <InboxPreview compact />
              </div>

              <div className="presentation-feature-copy">
                <span className="feature-number">
                  {features[0].eyebrow}
                </span>

                <h3>{features[0].title}</h3>

                <p>{features[0].text}</p>

                <a href={MAIL_URL} className="text-link">
                  Explore your inbox <Arrow size={17} />
                </a>
              </div>
            </Reveal>

            <Reveal
              className={`presentation-feature presentation-feature-reverse ${
                activeFeature === 1 ? "feature-emphasis" : ""
              }`}
            >
              <div className="presentation-feature-visual compose-feature">
                <div className="feature-visual-glow" />
                <ComposePreview />
              </div>

              <div className="presentation-feature-copy">
                <span className="feature-number">
                  {features[1].eyebrow}
                </span>

                <h3>{features[1].title}</h3>

                <p>{features[1].text}</p>

                <a href={MAIL_URL} className="text-link">
                  Start writing <Arrow size={17} />
                </a>
              </div>
            </Reveal>

            <Reveal
              className={`presentation-feature ${
                activeFeature === 2 ? "feature-emphasis" : ""
              }`}
            >
              <div className="presentation-feature-visual motion-feature">
                <div className="motion-orbit" />

                <div className="motion-center">
                  <Logo size={42} />
                </div>

                <div className="motion-card motion-card-one">
                  <SparkleIcon />
                  <span>Thoughtful details</span>
                </div>

                <div className="motion-card motion-card-two">
                  <CheckIcon />
                  <span>Draft saved</span>
                </div>

                <div className="motion-card motion-card-three">
                  <span className="online-dot" />
                  <span>Connected</span>
                </div>
              </div>

              <div className="presentation-feature-copy">
                <span className="feature-number">
                  {features[2].eyebrow}
                </span>

                <h3>{features[2].title}</h3>

                <p>{features[2].text}</p>

                <a href={MAIL_URL} className="text-link">
                  Experience the details <Arrow size={17} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="experience-grid-section" id="experience">
          <Reveal className="experience-grid-heading">
            <span className="section-eyebrow">
              THE LITTLE THINGS
            </span>

            <h2>
              Designed to disappear
              <br />
              <span>until you need it.</span>
            </h2>
          </Reveal>

          <div className="experience-grid">
            <Reveal className="experience-card experience-card-large">
              <div className="experience-card-top">
                <span className="mini-icon">
                  <SearchIcon />
                </span>

                <span>01</span>
              </div>

              <div className="fake-search">
                <SearchIcon />
                <span>Search your inbox...</span>
                <kbd>⌘ K</kbd>
              </div>

              <h3>Find it instantly.</h3>

              <p>
                Search stays close, fast, and out of your way until the exact
                moment you need it.
              </p>
            </Reveal>

            <Reveal className="experience-card">
              <div className="experience-card-top">
                <span className="mini-icon">
                  <ShieldIcon />
                </span>

                <span>02</span>
              </div>

              <div className="secure-badge">
                <ShieldIcon />
                <strong>Private by design</strong>
                <small>Your messages belong to you.</small>
              </div>

              <h3>Quiet confidence.</h3>

              <p>
                A clean experience should also feel trustworthy.
              </p>
            </Reveal>

            <Reveal className="experience-card">
              <div className="experience-card-top">
                <span className="mini-icon">
                  <BoltIcon />
                </span>

                <span>03</span>
              </div>

              <div className="speed-lines">
                <i />
                <i />
                <i />
                <i />
              </div>

              <h3>Quick where it counts.</h3>

              <p>
                Move through everyday email without unnecessary steps.
              </p>
            </Reveal>

            <Reveal className="experience-card experience-card-wide">
              <div className="wide-card-copy">
                <span className="section-eyebrow">
                  ONE CLEAN WORKSPACE
                </span>

                <h3>
                  Your inbox should work <span>with you.</span>
                </h3>

                <p>
                  From the first unread message to the last sent reply, Fades
                  Mail keeps the experience focused from start to finish.
                </p>

                <a href={MAIL_URL} className="text-link">
                  Open Fades Mail <Arrow size={17} />
                </a>
              </div>

              <div className="wide-card-art">
                <div className="art-ring art-ring-one" />
                <div className="art-ring art-ring-two" />

                <div className="art-mail-card">
                  <Logo size={36} />
                  <strong>Fades</strong>
                  <small>Mail</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="presentation-big-statement">
          <div className="presentation-big-statement-inner">
            <Reveal>
              <span className="section-eyebrow">
                EMAIL, REIMAGINED
              </span>

              <h2>
                Simple enough
                <br />
                for every day.
              </h2>

              <p>Powerful enough to keep up.</p>

              <div className="statement-line">
                <span />
                <span />
                <span />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="presentation-final">
          <div className="presentation-final-grid" />
          <div className="presentation-final-glow" />

          <Reveal className="presentation-final-content">
            <div className="presentation-final-logo">
              <Logo size={58} />
            </div>

            <span className="section-eyebrow">
              THE FADES MAIL EXPERIENCE
            </span>

            <h2>
              Email should feel
              <br />
              <span>this good.</span>
            </h2>

            <p>
              A little more personality. A little more polish. And a whole
              lot more attention to the details that matter.
            </p>

            <div className="final-actions">
              <a
                href={MAIL_URL}
                className="btn btn-primary btn-lg"
              >
                Experience Fades Mail <Arrow />
              </a>

              <a
                href="#features"
                className="btn btn-secondary btn-lg"
              >
                See what changed
              </a>
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

                <span className="brand-name">
                  Fades<span>Mail</span>
                </span>
              </a>

              <p className="footer-brand-description">
                Email, reimagined.
                <br />
                A Fades product.
              </p>

              <div className="footer-live">
                <span className="online-dot" />
                mail.fades.lol is online
              </div>
            </div>

            <div>
              <div className="footer-column-title">
                EXPLORE
              </div>

              <div className="footer-links">
                <a href="#about" className="footer-link">
                  About
                </a>

                <a href="#features" className="footer-link">
                  Features
                </a>

                <a href="#experience" className="footer-link">
                  Experience
                </a>
              </div>
            </div>

            <div>
              <div className="footer-column-title">
                FADES
              </div>

              <div className="footer-links">
                <a
                  href="https://fades.lol"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  Fades AI
                </a>

                <a
                  href={MAIL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  Fades Mail
                </a>

                <a
                  href="https://browse.fades.lol"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  Fades Browser
                </a>
              </div>
            </div>

            <div>
              <div className="footer-column-title">
                GET STARTED
              </div>

              <div className="footer-links">
                <a
                  href={MAIL_URL}
                  className="footer-link"
                >
                  Open your inbox <Arrow size={13} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Fades. All rights reserved.
            </span>

            <a
              href={MAIL_URL}
              className="footer-link"
            >
              mail.fades.lol <Arrow size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
