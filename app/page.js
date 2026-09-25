"use client";

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

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
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

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
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

/* =========================================================
   REVEAL HOOK
   ========================================================= */

function useReveal(threshold = 0.18) {
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
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* =========================================================
   REVEAL WRAPPER
   ========================================================= */

function Reveal({
  children,
  className = "",
  delay = "",
}) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${
        visible ? "is-visible" : ""
      } ${delay} ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   INBOX PREVIEW
   ========================================================= */

function InboxPreview({ compact = false }) {
  const [activeTab, setActiveTab] = useState("Primary");
  const [selected, setSelected] = useState(0);

  const messages = [
    {
      initials: "F",
      sender: "Fades",
      email: "hello@fades.lol",
      subject: "Welcome to Fades Mail",
      preview:
        "Your inbox is ready. Experience email, reimagined.",
      time: "10:42 AM",
      color: "gold",
      unread: true,
    },
    {
      initials: "J",
      sender: "James Wilson",
      email: "james@example.com",
      subject: "The project looks great!",
      preview:
        "Just went through everything. Love the new design...",
      time: "9:18 AM",
      color: "blue",
      unread: true,
    },
    {
      initials: "S",
      sender: "Sarah Miller",
      email: "sarah@example.com",
      subject: "Meeting confirmation",
      preview:
        "Hey, just confirming we're still on for tomorrow.",
      time: "Yesterday",
      color: "pink",
      unread: false,
    },
    {
      initials: "M",
      sender: "Michael Chen",
      email: "michael@example.com",
      subject: "Here are the files",
      preview:
        "I've attached the documents we discussed earlier.",
      time: "Yesterday",
      color: "green",
      unread: false,
    },
  ];

  const visibleMessages =
    activeTab === "Starred"
      ? messages.slice(0, 2)
      : activeTab === "Sent"
      ? messages.slice(1, 3)
      : messages;

  return (
    <div
      className={`mail-preview presentation-preview ${
        compact ? "presentation-preview-compact" : ""
      }`}
    >
      <div className="mail-preview-header">
        <div className="mail-preview-dots">
          <span className="mail-preview-dot" />
          <span className="mail-preview-dot" />
          <span className="mail-preview-dot" />
        </div>

        <span>Fades Mail</span>
      </div>

      <div className="mail-preview-body">
        <aside className="mail-preview-sidebar">
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
              {tab}
            </button>
          ))}
        </aside>

        <div className="mail-preview-messages">
          {visibleMessages.map((message, index) => (
            <button
              key={message.sender}
              type="button"
              className={`mail-preview-message ${
                selected === index ? "selected" : ""
              }`}
              onClick={() => setSelected(index)}
            >
              <div
                className={`mail-preview-avatar ${message.color}`}
              >
                {message.initials}
              </div>

              <div className="mail-preview-message-content">
                <div className="mail-preview-sender">
                  <strong>{message.sender}</strong>
                  <span>{message.time}</span>
                </div>

                <div className="mail-preview-subject">
                  {message.subject}
                </div>

                <p>{message.preview}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPOSE PREVIEW
   ========================================================= */

function ComposePreview() {
  return (
    <div className="compose-window">
      <div className="compose-header">
        <span>New message</span>

        <div className="compose-window-actions">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="compose-row">
        <span>To</span>
        <strong>james@example.com</strong>
      </div>

      <div className="compose-row">
        <span>Subject</span>
        <strong>The project looks great!</strong>
      </div>

      <div className="compose-message">
        Hey James,
        <br />
        <br />
        Just wanted to follow up on our
        conversation...
        <span className="compose-cursor" />
      </div>

      <div className="compose-footer">
        <button
          type="button"
          className="btn btn-primary btn-sm"
        >
          Send
          <Arrow size={14} />
        </button>

        <span>Draft saved</span>
      </div>
    </div>
  );
}

/* =========================================================
   STORY MAIL WINDOW
   ========================================================= */

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

          <span>Your inbox is ready.</span>
        </div>
      </div>

      <div className="story-email-body">
        Experience email,
        <br />
        reimagined.
      </div>

      <div className="story-email-lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const original =
      document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior =
      "smooth";

    return () => {
      document.documentElement.style.scrollBehavior =
        original;
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="presentation-page">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header
        className={`navbar presentation-navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="navbar-inner">
          <a
            href="/"
            className="brand"
            onClick={closeMenu}
          >
            <Logo size={32} />

            <span className="brand-name">
              Fades<span>Mail</span>
            </span>
          </a>

          <nav className="navbar-links">
            <a
              href="#about"
              className="navbar-link"
            >
              About
            </a>

            <a
              href="#features"
              className="navbar-link"
            >
              Features
            </a>

            <a
              href="#experience"
              className="navbar-link"
            >
              Experience
            </a>
          </nav>

          <div className="navbar-actions">
            <a
              href={MAIL_URL}
              className="btn btn-primary btn-sm"
            >
              Open Fades Mail
              <Arrow size={15} />
            </a>

            <button
              type="button"
              className="mobile-menu-button btn-icon"
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((value) => !value)
              }
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="presentation-mobile-menu">
            <a
              href="#about"
              onClick={closeMenu}
            >
              About
            </a>

            <a
              href="#features"
              onClick={closeMenu}
            >
              Features
            </a>

            <a
              href="#experience"
              onClick={closeMenu}
            >
              Experience
            </a>

            <a
              href={MAIL_URL}
              onClick={closeMenu}
            >
              Open Fades Mail
            </a>
          </div>
        )}
      </header>

      <main>

        {/* ===================================================
            HERO
            =================================================== */}

        <section className="presentation-hero">
          <div className="presentation-hero-background" />

          <div className="presentation-hero-content">
            <Reveal>
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                INTRODUCING FADES MAIL
              </div>

              <h1 className="presentation-title">
                Email,
                <br />

                <span className="hero-title-gradient">
                  reimagined.
                </span>
              </h1>

              <p className="hero-description">
                Your inbox deserves better. Discover a
                beautifully designed email experience
                built around simplicity, motion, and
                thoughtful details.
              </p>

              <div className="hero-actions">
                <a
                  href={MAIL_URL}
                  className="btn btn-primary btn-lg"
                >
                  Open Fades Mail
                  <Arrow />
                </a>

                <a
                  href="#about"
                  className="btn btn-secondary btn-lg"
                >
                  Explore the experience
                </a>
              </div>

              <div className="hero-note">
                <span className="hero-note-icon">
                  <CheckIcon />
                </span>

                <span>
                  A fresh take on your everyday email.
                </span>
              </div>
            </Reveal>
          </div>

          {/* HERO PRODUCT */}

          <Reveal className="presentation-hero-product">
            <div className="presentation-glow" />

            <div className="presentation-floating-card presentation-floating-left">
              <SparkleIcon />

              <div>
                <strong>Thoughtful design</strong>
                <span>Every detail matters.</span>
              </div>
            </div>

            <div className="presentation-floating-card presentation-floating-right">
              <span className="online-dot" />

              <div>
                <strong>Made for your inbox</strong>
                <span>Simple. Smooth. Fades.</span>
              </div>
            </div>

            <InboxPreview />
          </Reveal>

          <a
            href="#about"
            className="presentation-scroll-hint"
          >
            <span>SCROLL TO EXPLORE</span>

            <span className="presentation-scroll-arrow">
              ↓
            </span>
          </a>
        </section>

        {/* ===================================================
            INTRO / STORY
            =================================================== */}

        <section
          className="presentation-story"
          id="about"
        >
          <div className="presentation-sticky">

            <Reveal className="presentation-story-copy">
              <span className="section-eyebrow">
                A DIFFERENT KIND OF EMAIL
              </span>

              <h2>
                Your email.
                <br />

                <span>
                  With a little more life.
                </span>
              </h2>

              <p>
                Email is something we use every day.
                We think it should feel just as good
                to use as it is useful.
              </p>

              <p>
                That's why Fades Mail brings together
                a clean interface, fluid interactions,
                and carefully designed animations to
                make managing your messages feel
                natural.
              </p>

              <a
                href={MAIL_URL}
                className="text-link"
              >
                Experience Fades Mail
                <Arrow size={17} />
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
            </Reveal>

          </div>
        </section>

        {/* ===================================================
            TRANSITION STATEMENT
            =================================================== */}

        <section className="presentation-statement">
          <Reveal>
            <span className="section-eyebrow">
              DESIGNED AROUND THE WAY YOU WORK
            </span>

            <h2>
              Everything has a place.
              <br />

              <span>
                Nothing gets in your way.
              </span>
            </h2>
          </Reveal>
        </section>

        {/* ===================================================
            FEATURES
            =================================================== */}

        <section
          className="presentation-features"
          id="features"
        >
          <Reveal className="presentation-section-heading">
            <span className="section-eyebrow">
              BUILT AROUND YOU
            </span>

            <h2>
              Everything you need.
              <br />

              <span>
                Nothing in the way.
              </span>
            </h2>
          </Reveal>

          <div className="presentation-feature-stack">

            {/* FEATURE 01 */}

            <Reveal className="presentation-feature">
              <div className="presentation-feature-visual inbox-feature">
                <div className="feature-visual-glow" />

                <InboxPreview />
              </div>

              <div className="presentation-feature-copy">
                <span className="feature-number">
                  01 / INBOX
                </span>

                <h3>
                  Your inbox,
                  <br />
                  finally under control.
                </h3>

                <p>
                  See what matters without fighting
                  through clutter. Fades Mail keeps
                  your messages organized and easy
                  to navigate.
                </p>

                <a
                  href={MAIL_URL}
                  className="text-link"
                >
                  Explore your inbox
                  <Arrow size={17} />
                </a>
              </div>
            </Reveal>

            {/* FEATURE 02 */}

            <Reveal
              className="presentation-feature presentation-feature-reverse"
            >
              <div className="presentation-feature-visual compose-feature">
                <div className="feature-visual-glow" />

                <ComposePreview />
              </div>

              <div className="presentation-feature-copy">
                <span className="feature-number">
                  02 / COMPOSE
                </span>

                <h3>
                  Write naturally.
                  <br />
                  Send instantly.
                </h3>

                <p>
                  A focused writing experience keeps
                  everything you need close without
                  getting in the way of what you're
                  trying to say.
                </p>

                <a
                  href={MAIL_URL}
                  className="text-link"
                >
                  Start writing
                  <Arrow size={17} />
                </a>
              </div>
            </Reveal>

            {/* FEATURE 03 */}

            <Reveal className="presentation-feature">
              <div className="presentation-feature-visual motion-feature">
                <div className="motion-orbit" />

                <div className="motion-card motion-card-one">
                  <SparkleIcon />

                  <span>
                    Thoughtful details
                  </span>
                </div>

                <div className="motion-card motion-card-two">
                  <CheckIcon />

                  <span>
                    Draft saved
                  </span>
                </div>

                <div className="motion-card motion-card-three">
                  <span className="online-dot" />

                  <span>
                    Connected
                  </span>
                </div>
              </div>

              <div className="presentation-feature-copy">
                <span className="feature-number">
                  03 / EXPERIENCE
                </span>

                <h3>
                  Motion that feels
                  <br />
                  completely natural.
                </h3>

                <p>
                  Small interactions make the entire
                  experience feel alive without
                  distracting you from your inbox.
                </p>

                <a
                  href={MAIL_URL}
                  className="text-link"
                >
                  Experience the details
                  <Arrow size={17} />
                </a>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ===================================================
            BIG MID-PAGE STATEMENT
            =================================================== */}

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

              <p>
                Powerful enough to keep up.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===================================================
            EXPERIENCE
            =================================================== */}

        <section
          className="presentation-final"
          id="experience"
        >
          <div className="presentation-final-glow" />

          <Reveal className="presentation-final-content">
            <div className="presentation-final-logo">
              <Logo size={54} />
            </div>

            <span className="section-eyebrow">
              THE FADES MAIL EXPERIENCE
            </span>

            <h2>
              Email should feel
              <br />

              <span>
                this good.
              </span>
            </h2>

            <p>
              A little more personality.
              A little more polish.
              And a whole lot more attention
              to the details that matter.
            </p>

            <a
              href={MAIL_URL}
              className="btn btn-primary btn-lg"
            >
              Experience Fades Mail
              <Arrow />
            </a>

            <div className="presentation-url">
              <span className="online-dot" />
              mail.fades.lol
            </div>
          </Reveal>
        </section>

      </main>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="footer">
        <div className="footer-inner">

          <div className="footer-top">

            <div>
              <a
                href="/"
                className="brand"
              >
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
            </div>

            <div>
              <div className="footer-column-title">
                EXPLORE
              </div>

              <div className="footer-links">
                <a
                  href="#about"
                  className="footer-link"
                >
                  About
                </a>

                <a
                  href="#features"
                  className="footer-link"
                >
                  Features
                </a>

                <a
                  href="#experience"
                  className="footer-link"
                >
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
                  Open your inbox
                </a>
              </div>
            </div>

          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Fades.
              All rights reserved.
            </span>

            <a
              href={MAIL_URL}
              className="footer-link"
            >
              mail.fades.lol
              <Arrow size={14} />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
