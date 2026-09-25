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
      height={size}
      style={{
        width: size,
        height: size,
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

function CheckIcon({ size = 17 }) {
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

function MailIcon({ size = 20 }) {
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
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 8 9 6 9-6" />
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

function SearchIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
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
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
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
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function StarIcon({ filled = false, size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

function SendIcon({ size = 18 }) {
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
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function InboxPreview() {
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [selected, setSelected] = useState(null);

  const messages = [
    {
      initials: "F",
      sender: "Fades",
      subject: "Welcome to Fades Mail",
      snippet:
        "Your inbox is ready. Experience email, reimagined.",
      time: "10:42 AM",
      unread: true,
    },
    {
      initials: "J",
      sender: "James Wilson",
      subject: "The project looks great!",
      snippet:
        "Just went through everything. Love the new design...",
      time: "9:18 AM",
      unread: true,
    },
    {
      initials: "S",
      sender: "Sarah Miller",
      subject: "Meeting confirmation",
      snippet:
        "Hey, just confirming we're still on for tomorrow.",
      time: "Yesterday",
      unread: false,
    },
    {
      initials: "M",
      sender: "Michael Chen",
      subject: "Here are the files",
      snippet:
        "I've attached the documents we discussed earlier.",
      time: "Yesterday",
      unread: false,
    },
  ];

  const folders = [
    {
      name: "Inbox",
      icon: <MailIcon size={17} />,
      count: "2",
    },
    {
      name: "Starred",
      icon: <StarIcon size={17} />,
      count: "",
    },
    {
      name: "Sent",
      icon: <SendIcon size={17} />,
      count: "",
    },
    {
      name: "Drafts",
      icon: (
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
      ),
      count: "",
    },
    {
      name: "Archive",
      icon: (
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
      ),
      count: "",
    },
  ];

  const visibleMessages =
    activeFolder === "Starred"
      ? messages.slice(0, 2)
      : activeFolder === "Sent"
        ? messages.slice(1, 3)
        : messages;

  return (
    <div className="mail-preview">
      <div className="mail-preview-header">
        <div className="flex items-center" style={{ gap: 12 }}>
          <div className="mail-preview-dots">
            <span className="mail-preview-dot" />
            <span className="mail-preview-dot" />
            <span className="mail-preview-dot" />
          </div>

          <div className="brand">
            <Logo size={28} />
            <span className="brand-name">Fades Mail</span>
          </div>
        </div>

        <div
          className="flex items-center"
          style={{ gap: 10 }}
        >
          <span className="badge badge-success">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "currentColor",
              }}
            />
            Connected
          </span>

          <div className="mail-row-avatar">K</div>
        </div>
      </div>

      <div className="mail-preview-body">
        <aside className="mail-preview-sidebar">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{
              width: "100%",
              marginBottom: 22,
            }}
          >
            <span style={{ fontSize: 18 }}>+</span>
            Compose
          </button>

          <div
            className="text-xs text-muted"
            style={{
              marginBottom: 10,
              paddingInline: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            MAILBOX
          </div>

          {folders.map((folder) => (
            <button
              key={folder.name}
              type="button"
              className={`mail-preview-sidebar-item ${
                activeFolder === folder.name
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveFolder(folder.name);
                setSelected(null);
              }}
              style={{
                width: "100%",
                border: 0,
                background:
                  activeFolder === folder.name
                    ? undefined
                    : "transparent",
                cursor: "pointer",
              }}
            >
              {folder.icon}

              <span>{folder.name}</span>

              {folder.count && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {folder.count}
                </span>
              )}
            </button>
          ))}
        </aside>

        <div className="mail-preview-messages">
          <div
            className="flex items-center justify-between"
            style={{
              marginBottom: 18,
              gap: 20,
            }}
          >
            <div>
              <span className="text-xs text-muted">
                YOUR MAILBOX
              </span>

              <h3
                style={{
                  margin: "4px 0 3px",
                  fontSize: 24,
                  letterSpacing: "-0.045em",
                }}
              >
                {activeFolder}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color:
                    "var(--foreground-secondary)",
                }}
              >
                Stay on top of what matters.
              </p>
            </div>

            <button
              type="button"
              className="btn-icon"
              aria-label="Refresh inbox"
              onClick={() => {
                setActiveFolder("Inbox");
                setSelected(null);
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

          {visibleMessages.map((message, index) => (
            <button
              type="button"
              key={`${activeFolder}-${message.sender}`}
              className="mail-preview-message"
              onClick={() =>
                setSelected(
                  selected === index ? null : index
                )
              }
              style={{
                width: "100%",
                border: 0,
                background:
                  selected === index
                    ? "var(--surface-active)"
                    : undefined,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div className="mail-preview-avatar">
                {message.initials}
              </div>

              <div className="mail-preview-message-content">
                <div
                  className="flex items-center justify-between"
                  style={{ gap: 12 }}
                >
                  <div
                    className="mail-preview-sender"
                    style={{
                      color: message.unread
                        ? "var(--foreground)"
                        : undefined,
                    }}
                  >
                    {message.sender}
                  </div>

                  <span className="text-xs text-muted">
                    {message.time}
                  </span>
                </div>

                <div
                  className="mail-preview-subject"
                  style={{
                    fontWeight: message.unread
                      ? 700
                      : undefined,
                    color: message.unread
                      ? "var(--foreground)"
                      : undefined,
                  }}
                >
                  {message.subject}
                </div>

                <p
                  style={{
                    margin: "4px 0 0",
                    overflow: "hidden",
                    color:
                      "var(--foreground-muted)",
                    fontSize: 11,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {message.snippet}
                </p>
              </div>

              <StarIcon
                size={16}
                filled={activeFolder === "Starred"}
              />
            </button>
          ))}

          <div
            className="flex items-center justify-between"
            style={{
              padding: "18px 12px 4px",
              fontSize: 11,
              color: "var(--foreground-muted)",
            }}
          >
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

function FeatureIcon({ children }) {
  return <div className="feature-icon">{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="page-container">
      {/* Navigation */}

      <header className="navbar">
        <div className="navbar-inner">
          <a
            href="/"
            className="brand"
            aria-label="Fades Mail home"
          >
            <Logo size={42} />

            <div>
              <div className="brand-name">
                Fades<span className="text-primary">Mail</span>
              </div>

              <div className="brand-subtitle">
                Email, reimagined.
              </div>
            </div>
          </a>

          <nav
            className="navbar-links"
            style={{
              display: menuOpen ? "flex" : undefined,
            }}
          >
            <a
              href="#features"
              className="navbar-link"
              onClick={closeMenu}
            >
              Features
            </a>

            <a
              href="#experience"
              className="navbar-link"
              onClick={closeMenu}
            >
              Experience
            </a>

            <a
              href="#about"
              className="navbar-link"
              onClick={closeMenu}
            >
              About
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
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((value) => !value)
              }
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}

      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <SparkleIcon size={14} />
            Introducing Fades Mail
          </div>

          <h1 className="hero-title">
            Email,
            <br />
            <span className="hero-title-gradient">
              reimagined.
            </span>
          </h1>

          <p className="hero-description">
            Your inbox deserves better. Fades Mail brings
            together a clean interface, thoughtful
            interactions, and everything you need to stay
            connected.
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
              href="#features"
              className="btn btn-secondary btn-lg"
            >
              Explore features
            </a>
          </div>

          <div
            className="flex-center"
            style={{
              gap: 8,
              marginTop: 22,
              color: "var(--foreground-muted)",
              fontSize: 12,
            }}
          >
            <span
              className="flex-center"
              style={{
                width: 24,
                height: 24,
                color: "var(--success)",
                background:
                  "var(--success-soft)",
                borderRadius: "50%",
              }}
            >
              <CheckIcon size={14} />
            </span>

            A fresh take on everyday email.
          </div>

          <InboxPreview />
        </div>
      </section>

      {/* About */}

      <section
        className="section"
        id="about"
        style={{
          background:
            "var(--background-secondary)",
        }}
      >
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">
              A different kind of email
            </span>

            <h2 className="section-title">
              Your email.
              <br />
              <span className="text-primary">
                With a little more life.
              </span>
            </h2>

            <p className="section-description">
              Email is something we use every day. We
              think it should feel just as good to use as
              it is useful.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: 24,
            }}
          >
            <div className="card card-hover">
              <FeatureIcon>
                <SparkleIcon size={24} />
              </FeatureIcon>

              <h3 className="card-title">
                Thoughtful by design
              </h3>

              <p className="card-description">
                Every part of Fades Mail is designed to
                stay clear, comfortable, and easy to use.
              </p>
            </div>

            <div className="card card-hover">
              <FeatureIcon>
                <MailIcon size={24} />
              </FeatureIcon>

              <h3 className="card-title">
                Built around your inbox
              </h3>

              <p className="card-description">
                Keep conversations, messages, and
                everyday communication together in one
                focused workspace.
              </p>
            </div>

            <div className="card card-hover">
              <FeatureIcon>
                <CheckIcon size={24} />
              </FeatureIcon>

              <h3 className="card-title">
                Simple when it matters
              </h3>

              <p className="card-description">
                No unnecessary complexity. Just the
                tools you need to stay connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section
        className="section"
        id="features"
      >
        <div className="container">
          <div className="section-header">
            <span className="badge badge-neutral">
              The details make the difference
            </span>

            <h2 className="section-title">
              More than just
              <br />
              <span>another inbox.</span>
            </h2>

            <p className="section-description">
              A polished email experience built around
              the way people actually communicate.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <FeatureIcon>
                <SparkleIcon size={25} />
              </FeatureIcon>

              <h3 className="feature-title">
                Everything moves with purpose.
              </h3>

              <p className="feature-description">
                Fluid transitions, responsive controls,
                and subtle interactions make Fades Mail
                feel natural from the moment you open it.
              </p>
            </article>

            <article className="feature-card">
              <FeatureIcon>
                <MailIcon size={25} />
              </FeatureIcon>

              <h3 className="feature-title">
                A clean, focused inbox.
              </h3>

              <p className="feature-description">
                See what matters without unnecessary
                clutter. Messages stay readable and easy
                to manage.
              </p>
            </article>

            <article className="feature-card">
              <FeatureIcon>
                <StarIcon size={25} />
              </FeatureIcon>

              <h3 className="feature-title">
                Stay organized.
              </h3>

              <p className="feature-description">
                Use folders, starred messages, drafts,
                sent mail, and archive tools to keep
                everything where it belongs.
              </p>
            </article>

            <article className="feature-card">
              <FeatureIcon>
                <SendIcon size={25} />
              </FeatureIcon>

              <h3 className="feature-title">
                Write and send effortlessly.
              </h3>

              <p className="feature-description">
                Compose messages, manage recipients, and
                keep conversations moving with a
                straightforward writing experience.
              </p>
            </article>

            <article className="feature-card">
              <FeatureIcon>
                <SearchIcon size={25} />
              </FeatureIcon>

              <h3 className="feature-title">
                Find what you need.
              </h3>

              <p className="feature-description">
                Search-focused navigation keeps your
                messages accessible without making the
                interface feel overwhelming.
              </p>
            </article>

            <article className="feature-card">
              <FeatureIcon>
                <CheckIcon size={25} />
              </FeatureIcon>

              <h3 className="feature-title">
                Made to feel right.
              </h3>

              <p className="feature-description">
                Refined typography, spacing, responsive
                layouts, and a consistent visual system
                keep the experience cohesive.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section
        className="cta-section"
        id="experience"
      >
        <div className="cta-card">
          <h2 className="cta-title">
            Email should feel this good.
          </h2>

          <p className="cta-description">
            A little more personality. A little more
            polish. And a whole lot more attention to the
            details that matter.
          </p>

          <a
            href={MAIL_URL}
            className="btn"
          >
            Experience Fades Mail
            <Arrow size={17} />
          </a>
        </div>
      </section>

      {/* Footer */}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <a
                href="/"
                className="brand"
              >
                <Logo size={42} />

                <div>
                  <div className="brand-name">
                    Fades<span className="text-primary">
                      Mail
                    </span>
                  </div>

                  <div className="brand-subtitle">
                    Email, reimagined.
                  </div>
                </div>
              </a>

              <p className="footer-brand-description">
                A modern email experience designed to
                make everyday communication feel simple,
                polished, and natural.
              </p>
            </div>

            <div>
              <div className="footer-column-title">
                EXPLORE
              </div>

              <div className="footer-links">
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

                <a
                  href="#about"
                  className="footer-link"
                >
                  About
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

                <a
                  href={MAIL_URL}
                  className="footer-link"
                >
                  Start using Fades Mail
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Fades. All
              rights reserved.
            </span>

            <a
              href={MAIL_URL}
              className="footer-link"
            >
              mail.fades.lol
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
