"use client";

import { useEffect, useState } from "react";

const LOGO_SRC = "/logo.png";
const MAIL_URL = "https://mail.fades.lol";

function Logo({ size = 42 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Fades"
      width={size}
      style={{
        width: size,
        height: "auto",
        objectFit: "contain",
        display: "block",
      }}
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
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

function MailIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 8 9 6 9-6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="17"
      height="17"
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
  return open ? (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function InboxPreview() {
  const [activeTab, setActiveTab] = useState("Primary");
  const [selected, setSelected] = useState(-1);

  const tabs = ["Primary", "Starred", "Sent"];

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
    <div className="mail-preview">
      <div className="preview-topbar">
        <div className="preview-brand">
          <div className="preview-logo">
            <Logo size={24} />
          </div>

          <span>Fades Mail</span>
        </div>

        <div className="preview-top-actions">
          <span className="preview-online">
            <span />
            Connected
          </span>

          <div className="preview-avatar">K</div>
        </div>
      </div>

      <div className="preview-body">
        <aside className="preview-sidebar">
          <div className="preview-compose">
            <span>+</span>
            Compose
          </div>

          <div className="preview-nav-label">
            MAILBOX
          </div>

          <div className="preview-nav-item active">
            <MailIcon size={17} />
            <span>Inbox</span>
            <span className="preview-nav-count">2</span>
          </div>

          <div className="preview-nav-item">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
            Starred
          </div>

          <div className="preview-nav-item">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M22 2 11 13" />
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            </svg>
            Sent
          </div>

          <div className="preview-nav-item">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M4 9h16" />
            </svg>
            Drafts
          </div>

          <div className="preview-nav-item">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M3 7h18v13H3z" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Archive
          </div>

          <div className="preview-sidebar-bottom">
            <div className="preview-storage">
              <div className="preview-storage-heading">
                <span>Storage</span>
                <span>24%</span>
              </div>

              <div className="preview-storage-track">
                <div />
              </div>

              <p>2.4 GB of 10 GB used</p>
            </div>
          </div>
        </aside>

        <div className="preview-inbox">
          <div className="preview-inbox-heading">
            <div>
              <span className="preview-small-label">
                YOUR MAILBOX
              </span>
              <h3>Inbox</h3>
              <p>Stay on top of what matters.</p>
            </div>

            <button
              type="button"
              className="preview-refresh"
              aria-label="Refresh preview"
              onClick={() => {
                setSelected(-1);
                setActiveTab("Primary");
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 7v5h-5" />
                <path d="M4 17v-5h5" />
                <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12" />
                <path d="M4 12l2.8 5a7 7 0 0 0 11.6-2" />
              </svg>
            </button>
          </div>

          <div className="preview-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={
                  activeTab === tab ? "active" : ""
                }
                onClick={() => {
                  setActiveTab(tab);
                  setSelected(-1);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="preview-message-list">
            {visibleMessages.map((message, index) => (
              <button
                type="button"
                key={`${activeTab}-${message.sender}`}
                className={`preview-message ${
                  selected === index ? "selected" : ""
                }`}
                onClick={() =>
                  setSelected(
                    selected === index ? -1 : index
                  )
                }
              >
                <div
                  className={`preview-sender-avatar ${message.color}`}
                >
                  {message.initials}
                </div>

                <div className="preview-message-main">
                  <div className="preview-message-meta">
                    <span
                      className={
                        message.unread ? "unread" : ""
                      }
                    >
                      {message.sender}
                    </span>
                    <time>{message.time}</time>
                  </div>

                  <div
                    className={`preview-subject ${
                      message.unread ? "unread" : ""
                    }`}
                  >
                    {message.subject}
                  </div>

                  <p>{message.preview}</p>
                </div>

                <span
                  className={`preview-star ${
                    activeTab === "Starred" ? "starred" : ""
                  }`}
                  aria-hidden="true"
                >
                  ★
                </span>
              </button>
            ))}
          </div>

          <div className="preview-bottom">
            <span>
              Showing {visibleMessages.length} messages
            </span>
            <span>All caught up</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(
    {}
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((previous) => ({
              ...previous,
              [entry.target.dataset.reveal]: true,
            }));

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <main className="fades-mail-home">
      {/* Navigation */}

      <header
        className={`site-header ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="header-inner">
          <a
            href="/"
            className="header-brand"
            aria-label="Fades Mail home"
          >
            <Logo size={36} />

            <span>
              Fades<span className="brand-mail">Mail</span>
            </span>
          </a>

          <nav
            className={`header-links ${
              menuOpen ? "mobile-open" : ""
            }`}
          >
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>

            <a
              href="#experience"
              onClick={() => setMenuOpen(false)}
            >
              Experience
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>

            <a
              href={MAIL_URL}
              className="mobile-login"
            >
              Open Fades Mail <Arrow size={16} />
            </a>
          </nav>

          <div className="header-actions">
            <a
              href={MAIL_URL}
              className="header-login"
            >
              Open Fades Mail
              <Arrow size={16} />
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Hero */}

      <section className="hero">
        <div className="hero-background">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-grid" />

          <div className="floating-orb orb-one" />
          <div className="floating-orb orb-two" />
          <div className="floating-orb orb-three" />
        </div>

        <div className="hero-content">
          <a
            href="#experience"
            className="hero-announcement"
          >
            <span className="announcement-indicator" />

            <span>Meet a new kind of email</span>

            <Arrow size={14} />
          </a>

          <div className="hero-logo-wrap">
            <div className="hero-logo-ring ring-one" />
            <div className="hero-logo-ring ring-two" />

            <div className="hero-logo">
              <Logo size={67} />
            </div>
          </div>

          <div className="hero-eyebrow">
            INTRODUCING FADES MAIL
          </div>

          <h1>
            Email,
            <br />
            <span className="hero-title-gradient">
              reimagined.
            </span>
          </h1>

          <p className="hero-description">
            Your inbox deserves better. Discover a
            beautifully designed email experience with
            smooth animations, thoughtful details, and
            everything you need to stay connected.
          </p>

          <div className="hero-actions">
            <a
              href={MAIL_URL}
              className="button button-primary"
            >
              Open Fades Mail
              <Arrow />
            </a>

            <a
              href="#experience"
              className="button button-secondary"
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
        </div>

        {/* Animated Inbox Preview */}

        <div className="hero-preview-wrap">
          <div className="preview-backdrop-glow" />

          <div className="preview-floating-tag tag-left">
            <span className="tag-icon">
              <SparkleIcon />
            </span>

            <div>
              <strong>Thoughtful design</strong>
              <span>Every detail matters</span>
            </div>
          </div>

          <div className="preview-floating-tag tag-right">
            <span className="tag-online-dot" />

            <div>
              <strong>Made for your inbox</strong>
              <span>Simple. Smooth. Fades.</span>
            </div>
          </div>

          <InboxPreview />
        </div>

        <div className="hero-bottom">
          <span>DESIGNED FOR THE WAY YOU CONNECT</span>

          <a href="#features">
            Discover Fades Mail
            <span className="scroll-indicator">
              ↓
            </span>
          </a>
        </div>
      </section>

      {/* Introduction */}

      <section className="intro-section" id="about">
        <div
          data-reveal="intro"
          className={`intro-content reveal ${
            visibleSections.intro ? "revealed" : ""
          }`}
        >
          <span className="section-eyebrow">
            A DIFFERENT KIND OF EMAIL
          </span>

          <h2>
            Your email.
            <br />
            <span>With a little more life.</span>
          </h2>

          <p>
            Email is something we use every day.
            We think it should feel just as good
            to use as it is useful.
          </p>

          <p>
            That's why Fades Mail brings together a
            clean interface, fluid interactions, and
            carefully designed animations to make
            managing your messages feel natural.
          </p>

          <a href={MAIL_URL} className="text-link">
            Experience Fades Mail
            <Arrow size={17} />
          </a>
        </div>

        <div
          data-reveal="intro-art"
          className={`intro-art reveal ${
            visibleSections["intro-art"]
              ? "revealed"
              : ""
          }`}
        >
          <div className="intro-art-glow" />

          <div className="art-window">
            <div className="art-window-top">
              <div className="art-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span>Fades Mail</span>

              <span className="art-window-status">
                <span />
                Live
              </span>
            </div>

            <div className="art-window-content">
              <div className="art-sidebar">
                <div className="art-sidebar-logo">
                  <Logo size={24} />
                </div>

                <div className="art-sidebar-item selected">
                  <MailIcon size={17} />
                </div>

                <div className="art-sidebar-item">
                  <SparkleIcon />
                </div>

                <div className="art-sidebar-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M22 2 11 13" />
                    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                  </svg>
                </div>
              </div>

              <div className="art-main">
                <div className="art-greeting">
                  <span>YOUR INBOX</span>
                  <h3>Good morning.</h3>
                  <p>
                    Everything important, all in one place.
                  </p>
                </div>

                <div className="art-search">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  Search your messages...
                </div>

                <div className="art-email-row">
                  <div className="art-email-avatar gold">
                    F
                  </div>

                  <div className="art-email-lines">
                    <strong>Fades Mail</strong>
                    <span>
                      Welcome to a better inbox.
                    </span>
                    <div />
                  </div>

                  <span className="art-email-time">
                    Now
                  </span>
                </div>

                <div className="art-email-row">
                  <div className="art-email-avatar blue">
                    J
                  </div>

                  <div className="art-email-lines">
                    <strong>James Wilson</strong>
                    <span>
                      Here's the latest update.
                    </span>
                    <div />
                  </div>

                  <span className="art-email-time">
                    9:42
                  </span>
                </div>

                <div className="art-email-row">
                  <div className="art-email-avatar pink">
                    S
                  </div>

                  <div className="art-email-lines">
                    <strong>Sarah Miller</strong>
                    <span>
                      Looking forward to tomorrow!
                    </span>
                    <div />
                  </div>

                  <span className="art-email-time">
                    8:15
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-art-caption">
            <span className="caption-dot" />
            A closer look at Fades Mail
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="features-section" id="features">
        <div
          data-reveal="features-heading"
          className={`section-header reveal ${
            visibleSections["features-heading"]
              ? "revealed"
              : ""
          }`}
        >
          <span className="section-eyebrow">
            THE DETAILS MAKE THE DIFFERENCE
          </span>

          <h2>
            More than just
            <br />
            <span>another inbox.</span>
          </h2>

          <p>
            Every interaction is designed to feel
            intuitive, polished, and distinctly Fades.
          </p>
        </div>

        <div className="features-grid">
          <article
            data-reveal="feature-1"
            className={`feature-card feature-large reveal ${
              visibleSections["feature-1"]
                ? "revealed"
                : ""
            }`}
          >
            <div className="feature-card-art animation-art">
              <div className="animation-orbit orbit-a" />
              <div className="animation-orbit orbit-b" />

              <div className="animation-mail">
                <MailIcon size={40} />
              </div>

              <div className="animation-spark spark-a">
                <SparkleIcon />
              </div>

              <div className="animation-spark spark-b">
                <SparkleIcon />
              </div>

              <div className="animation-label label-a">
                Smooth transitions
              </div>

              <div className="animation-label label-b">
                Fluid interactions
              </div>
            </div>

            <div className="feature-card-copy">
              <div className="feature-number">
                01 / INTERACTIONS
              </div>

              <h3>
                Everything moves
                <br />
                with purpose.
              </h3>

              <p>
                Enjoy fluid transitions, satisfying
                hover effects, and subtle animations
                that make navigating your inbox feel
                effortless.
              </p>
            </div>
          </article>

          <article
            data-reveal="feature-2"
            className={`feature-card reveal ${
              visibleSections["feature-2"]
                ? "revealed"
                : ""
            }`}
          >
            <div className="feature-card-art design-art">
              <div className="design-card">
                <div className="design-card-top">
                  <Logo size={26} />

                  <span className="design-card-menu">
                    ···
                  </span>
                </div>

                <div className="design-lines">
                  <div className="design-line line-long" />
                  <div className="design-line line-medium" />
                  <div className="design-line line-short" />
                </div>

                <div className="design-card-bottom">
                  <span>Thoughtfully designed</span>
                  <CheckIcon />
                </div>
              </div>

              <div className="design-floating">
                <SparkleIcon />
                <span>Made to feel right</span>
              </div>
            </div>

            <div className="feature-card-copy">
              <div className="feature-number">
                02 / DESIGN
              </div>

              <h3>
                Clean, modern,
                <br />
                and unmistakably Fades.
              </h3>

              <p>
                A carefully crafted interface with
                balanced spacing, refined details,
                and a look that feels right at home.
              </p>
            </div>
          </article>

          <article
            data-reveal="feature-3"
            className={`feature-card reveal ${
              visibleSections["feature-3"]
                ? "revealed"
                : ""
            }`}
          >
            <div className="feature-card-art organization-art">
              <div className="organization-window">
                <div className="organization-heading">
                  <span>YOUR MAILBOX</span>
                  <span>···</span>
                </div>

                {[
                  ["Inbox", "12"],
                  ["Starred", "4"],
                  ["Sent", ""],
                  ["Drafts", "2"],
                  ["Archive", ""],
                ].map(([name, count], index) => (
                  <div
                    key={name}
                    className={`organization-row ${
                      index === 0 ? "selected" : ""
                    }`}
                  >
                    <span className="organization-icon">
                      {index === 0 ? (
                        <MailIcon size={15} />
                      ) : index === 1 ? (
                        "★"
                      ) : index === 2 ? (
                        "↗"
                      ) : index === 3 ? (
                        "▤"
                      ) : (
                        "□"
                      )}
                    </span>

                    <span>{name}</span>

                    {count && (
                      <span className="organization-count">
                        {count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="feature-card-copy">
              <div className="feature-number">
                03 / ORGANIZATION
              </div>

              <h3>
                Your inbox,
                <br />
                your way.
              </h3>

              <p>
                Keep messages organized with folders,
                starred emails, drafts, and the tools
                you need to manage your everyday
                communication.
              </p>
            </div>
          </article>

          <article
            data-reveal="feature-4"
            className={`feature-card feature-wide reveal ${
              visibleSections["feature-4"]
                ? "revealed"
                : ""
            }`}
          >
            <div className="feature-card-art compose-art">
              <div className="compose-window">
                <div className="compose-header">
                  <span>New message</span>
                  <span>↗</span>
                </div>

                <div className="compose-field">
                  <span>To</span>
                  <div className="compose-chip">
                    alex@example.com
                    <span>×</span>
                  </div>
                </div>

                <div className="compose-field">
                  <span>Subject</span>
                  <span className="compose-placeholder">
                    Let's get in touch
                  </span>
                </div>

                <div className="compose-body">
                  Hey Alex,
                  <br />
                  <br />
                  Just wanted to follow up on our
                  conversation...
                  <div className="compose-cursor" />
                </div>

                <div className="compose-footer">
                  <div className="compose-send">
                    Send
                    <Arrow size={14} />
                  </div>

                  <span>Draft saved</span>
                </div>
              </div>
            </div>

            <div className="feature-card-copy">
              <div className="feature-number">
                04 / COMMUNICATION
              </div>

              <h3>
                Write, send, and
                <br />
                stay connected.
              </h3>

              <p>
                Compose messages, manage recipients,
                and keep your conversations moving
                with an email experience built for
                everyday communication.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Experience */}

      <section
        className="experience-section"
        id="experience"
      >
        <div className="experience-background">
          <div className="experience-glow" />
          <div className="experience-grid" />
        </div>

        <div
          data-reveal="experience-content"
          className={`experience-content reveal ${
            visibleSections["experience-content"]
              ? "revealed"
              : ""
          }`}
        >
          <div className="experience-logo">
            <Logo size={50} />
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
            A little more personality. A little more
            polish. And a whole lot more attention
            to the details that matter.
          </p>

          <a
            href={MAIL_URL}
            className="button button-primary experience-button"
          >
            Experience Fades Mail
            <Arrow />
          </a>

          <div className="experience-url">
            <span className="experience-url-dot" />
            mail.fades.lol
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" className="footer-brand-link">
              <Logo size={32} />

              <span>
                Fades<span>Mail</span>
              </span>
            </a>

            <p>
              Email, reimagined.
              <br />
              A Fades product.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <span>EXPLORE</span>

              <a href="#features">Features</a>
              <a href="#experience">Experience</a>
              <a href="#about">About</a>
            </div>

            <div className="footer-link-group">
              <span>FADES</span>

              <a
                href="https://fades.lol"
                target="_blank"
                rel="noreferrer"
              >
                Fades AI
              </a>

              <a
                href={MAIL_URL}
                target="_blank"
                rel="noreferrer"
              >
                Fades Mail
              </a>

              <a
                href="https://browse.fades.lol"
                target="_blank"
                rel="noreferrer"
              >
                Fades Browser
              </a>
            </div>

            <div className="footer-link-group">
              <span>GET STARTED</span>

              <a href={MAIL_URL}>
                Open your inbox
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Fades. All
            rights reserved.
          </span>

          <a href={MAIL_URL}>
            mail.fades.lol
            <Arrow size={14} />
          </a>
        </div>
      </footer>
