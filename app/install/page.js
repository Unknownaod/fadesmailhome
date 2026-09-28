"use client";

import { useEffect, useRef, useState } from "react";

const HOME_URL = "/";
const MAIL_URL = "https://mail.fades.lol";

const DOWNLOADS = {
  windows: "/downloads/fades-mail-windows.exe",
  macos: "/downloads/fades-mail-macos.dmg",
  linux: "/downloads/fades-mail-linux.AppImage",
};

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

function DownloadIcon({ size = 18 }) {
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
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function WindowsIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5.1 10.5 4v7.1H3V5.1Zm8.5-1.25L21 2.5v8.6h-9.5V3.85ZM3 12.9h7.5V20L3 18.9v-6Zm8.5 0H21v8.6l-9.5-1.35V12.9Z" />
    </svg>
  );
}

function AppleIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.09.35-1.1-.46-2.1-.48-3.26 0-1.44.62-2.2.44-3.07-.35C2.79 15.25 3.51 7.59 8.05 7.31c1.1.06 1.87.59 2.51.64.94-.19 1.84-.73 2.84-.67 1.21.1 2.12.58 2.73 1.49-2.5 1.5-1.91 4.8.39 5.72-.46 1.21-1.07 2.38-1.87 3.49l-.6.3ZM10.5 7.25C10.37 5.45 11.84 4 13.48 3.91c.23 2.08-1.88 3.6-2.98 3.34Z" />
    </svg>
  );
}

function LinuxIcon({ size = 22 }) {
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
      <path d="M12 3c-3.2 0-4.5 3.1-4.5 6.5 0 2.2-2.2 3.4-2.2 5.8 0 2.9 2.6 4.7 6.7 4.7s6.7-1.8 6.7-4.7c0-2.4-2.2-3.6-2.2-5.8C16.5 6.1 15.2 3 12 3Z" />
      <circle cx="9.5" cy="10" r="1" fill="currentColor" />
      <circle cx="14.5" cy="10" r="1" fill="currentColor" />
      <path d="M9 14c1.8 1.2 3.2 1.2 5 0" />
    </svg>
  );
}

function SunIcon({ size = 17 }) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.42 1.42" />
      <path d="m17.65 17.65 1.42 1.42" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.35 17.65-1.42 1.42" />
      <path d="m19.07 4.93-1.42 1.42" />
    </svg>
  );
}

function MoonIcon({ size = 17 }) {
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
      <path d="M20.8 15.4A8.5 8.5 0 0 1 8.6 3.2 8.5 8.5 0 1 0 20.8 15.4Z" />
    </svg>
  );
}

function ThemeIcon({ theme }) {
  return theme === "dark" ? <MoonIcon /> : <SunIcon />;
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
   REVEAL
========================================================= */

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
      className={`scroll-reveal ${
        visible ? "is-visible" : ""
      } ${delay} ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   3D DOWNLOAD ART
========================================================= */

function FloatingMailCard({
  className,
  sender,
  subject,
  text,
}) {
  return (
    <div className={`floating-mail-card ${className}`}>
      <div className="floating-mail-top">
        <div className="floating-mail-avatar">
          <Logo size={25} />
        </div>

        <div>
          <strong>{sender}</strong>
          <span>Just now</span>
        </div>

        <i />
      </div>

      <strong className="floating-mail-subject">
        {subject}
      </strong>

      <p>{text}</p>

      <div className="floating-mail-lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function DownloadVisual() {
  return (
    <div className="download-visual">
      <div className="visual-grid" />
      <div className="visual-glow visual-glow-one" />
      <div className="visual-glow visual-glow-two" />

      <div className="visual-orbit visual-orbit-one" />
      <div className="visual-orbit visual-orbit-two" />

      <div className="visual-core">
        <div className="visual-core-inner">
          <div className="visual-logo-ring">
            <Logo size={66} />
          </div>

          <strong>Fades</strong>
          <span>Mail</span>

          <div className="visual-status">
            <i />
            Private mailbox
          </div>
        </div>
      </div>

      <FloatingMailCard
        className="visual-card-one"
        sender="Fades"
        subject="Welcome to Fades Mail"
        text="Your inbox is ready."
      />

      <FloatingMailCard
        className="visual-card-two"
        sender="James Wilson"
        subject="The project looks great!"
        text="Just went through everything..."
      />

      <FloatingMailCard
        className="visual-card-three"
        sender="Sarah Miller"
        subject="Meeting confirmation"
        text="See you tomorrow."
      />

      <div className="visual-badge visual-badge-one">
        <span />
        Connected
      </div>

      <div className="visual-badge visual-badge-two">
        <DownloadIcon size={13} />
        Ready to download
      </div>
    </div>
  );
}

/* =========================================================
   DOWNLOAD CARD
========================================================= */

function DownloadCard({
  icon,
  name,
  description,
  version,
  href,
}) {
  return (
    <a
      href={href}
      download
      className="platform-card"
    >
      <div className="platform-icon">
        {icon}
      </div>

      <div className="platform-copy">
        <span className="platform-kicker">
          FADES MAIL
        </span>

        <h3>{name}</h3>

        <p>{description}</p>

        <div className="platform-meta">
          <span>{version}</span>
          <span>Free</span>
        </div>
      </div>

      <div className="platform-download">
        <DownloadIcon size={17} />
      </div>
    </a>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem(
        "fades-mail-theme"
      );

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      setTheme(savedTheme);
      document.documentElement.dataset.theme =
        savedTheme;
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = prefersDark
      ? "dark"
      : "light";

    setTheme(initialTheme);
    document.documentElement.dataset.theme =
      initialTheme;
  }, []);

  useEffect(() => {
    if (!theme) return;

    document.documentElement.dataset.theme =
      theme;

    window.localStorage.setItem(
      "fades-mail-theme",
      theme
    );
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
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

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark"
        ? "light"
        : "dark"
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="download-page">
      <style jsx global>{`
        /* =====================================================
           BASE
        ===================================================== */

        :root {
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #050505;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        /* =====================================================
           PAGE
        ===================================================== */

        .download-page {
          min-height: 100vh;
          overflow: hidden;
          color: #f5f4ef;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(214, 168, 92, 0.08),
              transparent 34%
            ),
            #050505;
        }

        /* =====================================================
           NAV
        ===================================================== */

        .navbar {
          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;
          right: 0;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            backdrop-filter 0.3s ease;
        }

        .navbar-scrolled {
          background: rgba(5, 5, 5, 0.74);
          backdrop-filter: blur(22px);
          border-bottom: 1px solid
            rgba(255, 255, 255, 0.07);
        }

        .navbar-inner {
          width: min(
            1220px,
            calc(100% - 44px)
          );
          min-height: 78px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .brand-logo {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          object-fit: contain;
        }

        .brand-name {
          color: #f4f2eb;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .brand-name span {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-left: auto;
        }

        .navbar-link {
          color: rgba(255, 255, 255, 0.46);
          font-size: 12px;
          transition: color 0.2s ease;
        }

        .navbar-link:hover {
          color: white;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .theme-toggle {
          height: 38px;
          padding: 0 11px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.48);
          background: rgba(255, 255, 255, 0.035);
          cursor: pointer;
        }

        .theme-toggle-label {
          font-size: 10px;
        }

        .nav-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0 8px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 10px;
        }

        .online-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c7ff94;
          box-shadow:
            0 0 0 3px
              rgba(199, 255, 148, 0.06),
            0 0 12px
              rgba(199, 255, 148, 0.65);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .btn-primary {
          background: #f2efe5;
          color: #080808;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 35px
              rgba(255, 215, 125, 0.14);
        }

        .btn-sm {
          height: 39px;
          padding: 0 15px;
          font-size: 11px;
          font-weight: 700;
        }

        .mobile-menu-button {
          display: none;
        }

        .btn-icon {
          width: 39px;
          height: 39px;
          align-items: center;
          justify-content: center;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.035);
          color: white;
          cursor: pointer;
        }

        /* =====================================================
           MOBILE MENU
        ===================================================== */

        .presentation-mobile-menu {
          position: absolute;
          left: 15px;
          right: 15px;
          top: 70px;
          padding: 10px;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          background: rgba(10, 10, 10, 0.94);
          backdrop-filter: blur(20px);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .presentation-mobile-menu a,
        .mobile-theme-button {
          width: 100%;
          min-height: 45px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 13px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: rgba(255, 255, 255, 0.65);
          text-align: left;
          font-size: 12px;
        }

        .presentation-mobile-menu a:hover,
        .mobile-theme-button:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .download-hero {
          min-height: 920px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 130px 0 100px;
        }

        .download-hero::before {
          content: "";
          position: absolute;
          width: 850px;
          height: 850px;
          top: -400px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(214, 168, 92, 0.12),
              transparent 68%
            );
          filter: blur(25px);
          pointer-events: none;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          opacity: 0.42;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 75%,
              transparent
            );
          transform:
            perspective(800px)
            rotateX(62deg)
            translateY(270px)
            scale(1.65);
          transform-origin: center bottom;
        }

        .hero-content {
          width: min(
            1220px,
            calc(100% - 44px)
          );
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        .hero-copy {
          width: min(610px, 100%);
          position: relative;
          z-index: 8;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.44);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.17em;
          animation: heroIn 0.8s ease both;
        }

        .hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c7ff94;
          box-shadow:
            0 0 12px
              rgba(199, 255, 148, 0.8);
        }

        .hero-eyebrow-line {
          width: 40px;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
        }

        .download-title {
          margin: 23px 0 0;
          font-size: clamp(
            62px,
            7.4vw,
            108px
          );
          line-height: 0.88;
          letter-spacing: -0.075em;
          font-weight: 650;
          animation:
            titleIn
            1s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;
        }

        .download-title span {
          background:
            linear-gradient(
              110deg,
              #fff,
              #d7c69b 45%,
              #a58d5a 70%,
              #fff
            );
          background-size: 220% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation:
            gradientMove
            7s
            linear
            infinite;
        }

        .hero-description {
          max-width: 530px;
          margin: 28px 0 0;
          color: rgba(255, 255, 255, 0.47);
          font-size: 15px;
          line-height: 1.75;
          animation:
            heroIn
            0.9s
            0.18s
            ease
            both;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
          animation:
            heroIn
            0.9s
            0.28s
            ease
            both;
        }

        .hero-button {
          height: 49px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 11px;
          font-size: 11px;
          font-weight: 700;
        }

        .hero-button-secondary {
          border: 1px solid
            rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.035);
          color: rgba(255, 255, 255, 0.65);
        }

        .hero-button-secondary:hover {
          border-color:
            rgba(255, 255, 255, 0.18);
          color: white;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 17px;
          margin-top: 23px;
          color: rgba(255, 255, 255, 0.29);
          font-size: 9px;
          animation:
            heroIn
            0.9s
            0.36s
            ease
            both;
        }

        .hero-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .hero-meta-divider {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
        }

        /* =====================================================
           3D VISUAL
        ===================================================== */

        .download-visual {
          position: absolute;
          width: 680px;
          height: 680px;
          right: -45px;
          top: 50%;
          transform:
            translateY(-50%)
            perspective(1000px)
            rotateX(
              calc(var(--visual-y, 0) * 0deg)
            );
          z-index: 3;
        }

        .visual-grid {
          position: absolute;
          inset: 60px;
          border-radius: 50%;
          background:
            linear-gradient(
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
          mask-image:
            radial-gradient(
              circle,
              black 20%,
              transparent 72%
            );
          transform:
            perspective(600px)
            rotateX(65deg)
            translateY(180px)
            scale(1.5);
        }

        .visual-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(10px);
        }

        .visual-glow-one {
          width: 460px;
          height: 460px;
          left: 110px;
          top: 110px;
          background:
            radial-gradient(
              circle,
              rgba(214, 168, 92, 0.14),
              transparent 68%
            );
          animation:
            visualPulse
            5s
            ease-in-out
            infinite;
        }

        .visual-glow-two {
          width: 270px;
          height: 270px;
          left: 205px;
          top: 200px;
          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.05),
              transparent 68%
            );
          animation:
            visualPulse
            7s
            1s
            ease-in-out
            infinite;
        }

        .visual-orbit {
          position: absolute;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .visual-orbit-one {
          width: 510px;
          height: 510px;
          transform:
            translate(-50%, -50%)
            rotateX(65deg)
            rotateZ(-12deg);
          animation:
            orbitRotate
            18s
            linear
            infinite;
        }

        .visual-orbit-two {
          width: 420px;
          height: 420px;
          transform:
            translate(-50%, -50%)
            rotateY(65deg)
            rotateZ(18deg);
          border-color:
            rgba(214, 168, 92, 0.1);
          animation:
            orbitRotateReverse
            14s
            linear
            infinite;
        }

        .visual-core {
          position: absolute;
          width: 290px;
          height: 290px;
          left: 50%;
          top: 50%;
          transform:
            translate(-50%, -50%)
            rotateX(10deg)
            rotateY(-18deg)
            rotateZ(3deg);
          transform-style: preserve-3d;
          animation:
            coreFloat
            7s
            ease-in-out
            infinite;
        }

        .visual-core::before {
          content: "";
          position: absolute;
          inset: 14px;
          border-radius: 52px;
          background: #080808;
          transform:
            translateZ(-25px)
            translate(14px, 18px);
          box-shadow:
            0 50px 90px
              rgba(0, 0, 0, 0.65);
        }

        .visual-core-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 48px;
          background:
            radial-gradient(
              circle at 50% 22%,
              rgba(255, 255, 255, 0.1),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #1b1b1b,
              #0c0c0c 65%,
              #080808
            );
          border: 1px solid
            rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.1),
            0 30px 80px
              rgba(0, 0, 0, 0.45);
          transform: translateZ(25px);
        }

        .visual-logo-ring {
          width: 106px;
          height: 106px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid
            rgba(255, 255, 255, 0.1);
          background:
            radial-gradient(
              circle,
              rgba(214, 168, 92, 0.1),
              transparent 68%
            );
          box-shadow:
            0 0 60px
              rgba(214, 168, 92, 0.1);
          position: relative;
        }

        .visual-logo-ring::before {
          content: "";
          position: absolute;
          inset: -9px;
          border: 1px solid
            rgba(214, 168, 92, 0.11);
          border-radius: 50%;
          animation:
            ringSpin
            12s
            linear
            infinite;
        }

        .visual-core-inner > strong {
          margin-top: 18px;
          font-size: 24px;
          letter-spacing: -0.05em;
        }

        .visual-core-inner > span {
          margin-top: -1px;
          color: rgba(255, 255, 255, 0.37);
          font-size: 15px;
        }

        .visual-status {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 13px;
          color: rgba(255, 255, 255, 0.29);
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
        }

        .visual-status i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c7ff94;
          box-shadow:
            0 0 12px
              rgba(199, 255, 148, 0.8);
        }

        /* =====================================================
           FLOATING CARDS
        ===================================================== */

        .floating-mail-card {
          position: absolute;
          width: 225px;
          padding: 16px;
          border: 1px solid
            rgba(255, 255, 255, 0.1);
          border-radius: 17px;
          background:
            linear-gradient(
              145deg,
              rgba(29, 29, 29, 0.88),
              rgba(10, 10, 10, 0.8)
            );
          box-shadow:
            0 25px 70px
              rgba(0, 0, 0, 0.4),
            inset 0 1px 0
              rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(18px);
        }

        .floating-mail-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .floating-mail-avatar {
          width: 29px;
          height: 29px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid
            rgba(255, 255, 255, 0.07);
        }

        .floating-mail-top > div:nth-child(2) {
          display: flex;
          flex-direction: column;
          gap: 1px;
          flex: 1;
        }

        .floating-mail-top strong {
          font-size: 10px;
        }

        .floating-mail-top span {
          color: rgba(255, 255, 255, 0.28);
          font-size: 7px;
        }

        .floating-mail-top i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c7ff94;
          box-shadow:
            0 0 10px
              rgba(199, 255, 148, 0.7);
        }

        .floating-mail-subject {
          display: block;
          margin-top: 13px;
          font-size: 11px;
        }

        .floating-mail-card p {
          margin: 4px 0 11px;
          color: rgba(255, 255, 255, 0.31);
          font-size: 8px;
          line-height: 1.5;
        }

        .floating-mail-lines {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .floating-mail-lines span {
          height: 3px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.055);
        }

        .floating-mail-lines span:nth-child(2) {
          width: 70%;
        }

        .floating-mail-lines span:nth-child(3) {
          width: 46%;
        }

        .visual-card-one {
          left: 15px;
          top: 115px;
          transform: rotate(-8deg);
          animation:
            cardFloatOne
            8s
            ease-in-out
            infinite;
        }

        .visual-card-two {
          right: -10px;
          top: 95px;
          transform: rotate(7deg);
          animation:
            cardFloatTwo
            9s
            ease-in-out
            infinite;
        }

        .visual-card-three {
          right: -30px;
          bottom: 85px;
          transform: rotate(-5deg);
          animation:
            cardFloatThree
            10s
            ease-in-out
            infinite;
        }

        .visual-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background: rgba(9, 9, 9, 0.72);
          backdrop-filter: blur(15px);
          color: rgba(255, 255, 255, 0.45);
          font-size: 8px;
          box-shadow:
            0 15px 40px
              rgba(0, 0, 0, 0.3);
        }

        .visual-badge-one {
          left: 65px;
          bottom: 105px;
          animation:
            badgeFloat
            6s
            ease-in-out
            infinite;
        }

        .visual-badge-two {
          right: 70px;
          top: 250px;
          animation:
            badgeFloat
            7s
            1s
            ease-in-out
            infinite;
        }

        .visual-badge-one span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c7ff94;
          box-shadow:
            0 0 9px
              rgba(199, 255, 148, 0.8);
        }

        /* =====================================================
           DOWNLOAD SECTION
        ===================================================== */

        .download-section {
          position: relative;
          padding: 110px 0 120px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.06);
        }

        .download-section-inner {
          width: min(
            1100px,
            calc(100% - 44px)
          );
          margin: auto;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 45px;
        }

        .section-eyebrow {
          color: rgba(255, 255, 255, 0.28);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .section-heading h2 {
          margin: 13px 0 10px;
          font-size: clamp(
            38px,
            5vw,
            60px
          );
          line-height: 0.95;
          letter-spacing: -0.065em;
        }

        .section-heading p {
          max-width: 480px;
          margin: auto;
          color: rgba(255, 255, 255, 0.36);
          font-size: 12px;
          line-height: 1.7;
        }

        .platform-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 13px;
        }

        .platform-card {
          min-height: 245px;
          position: relative;
          padding: 23px;
          display: flex;
          flex-direction: column;
          border: 1px solid
            rgba(255, 255, 255, 0.075);
          border-radius: 19px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.018)
            );
          overflow: hidden;
          transition:
            transform 0.3s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .platform-card::before {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          right: -100px;
          top: -100px;
          border-radius: 50%;
          background:
            rgba(214, 168, 92, 0.08);
          filter: blur(25px);
          transition:
            transform 0.45s ease;
        }

        .platform-card:hover {
          transform: translateY(-7px);
          border-color:
            rgba(255, 255, 255, 0.16);
          box-shadow:
            0 25px 70px
              rgba(0, 0, 0, 0.32);
        }

        .platform-card:hover::before {
          transform: scale(1.6);
        }

        .platform-icon {
          position: relative;
          z-index: 2;
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.72);
        }

        .platform-copy {
          position: relative;
          z-index: 2;
          margin-top: auto;
        }

        .platform-kicker {
          display: block;
          margin-bottom: 5px;
          color: rgba(255, 255, 255, 0.24);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .platform-copy h3 {
          margin: 0;
          font-size: 21px;
          letter-spacing: -0.045em;
        }

        .platform-copy p {
          margin: 4px 0 13px;
          color: rgba(255, 255, 255, 0.31);
          font-size: 9px;
        }

        .platform-meta {
          display: flex;
          gap: 6px;
        }

        .platform-meta span {
          padding: 5px 7px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.28);
          font-size: 7px;
        }

        .platform-download {
          position: absolute;
          z-index: 3;
          top: 21px;
          right: 21px;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid
            rgba(255, 255, 255, 0.07);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.035);
          color: rgba(255, 255, 255, 0.42);
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .platform-card:hover
          .platform-download {
          transform: translateY(-2px);
          background:
            rgba(255, 255, 255, 0.08);
        }

        /* =====================================================
           BROWSER CARD
        ===================================================== */

        .browser-card {
          margin-top: 13px;
          padding: 18px 21px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border: 1px solid
            rgba(255, 255, 255, 0.065);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.022);
        }

        .browser-copy {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .browser-copy-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.55);
        }

        .browser-copy div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .browser-copy strong {
          font-size: 11px;
        }

        .browser-copy span {
          color: rgba(255, 255, 255, 0.29);
          font-size: 8px;
        }

        .browser-button {
          height: 38px;
          padding: 0 13px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid
            rgba(255, 255, 255, 0.08);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.62);
          font-size: 9px;
          font-weight: 700;
        }

        .browser-button:hover {
          background:
            rgba(255, 255, 255, 0.075);
          color: white;
        }

        /* =====================================================
           FINAL
        ===================================================== */

        .download-final {
          position: relative;
          padding: 135px 20px;
          text-align: center;
          overflow: hidden;
          border-top: 1px solid
            rgba(255, 255, 255, 0.06);
        }

        .download-final::before {
          content: "";
          position: absolute;
          width: 650px;
          height: 400px;
          left: 50%;
          top: 50%;
          transform: translate(
            -50%,
            -50%
          );
          background:
            radial-gradient(
              ellipse,
              rgba(214, 168, 92, 0.1),
              transparent 68%
            );
          filter: blur(20px);
        }

        .download-final-content {
          position: relative;
          z-index: 2;
        }

        .download-final-logo {
          width: 67px;
          height: 67px;
          margin: 0 auto 21px;
          display: grid;
          place-items: center;
          border: 1px solid
            rgba(255, 255, 255, 0.1);
          border-radius: 19px;
          background: rgba(255, 255, 255, 0.035);
          box-shadow:
            0 20px 70px
              rgba(214, 168, 92, 0.09);
        }

        .download-final h2 {
          margin: 12px 0 0;
          font-size: clamp(
            43px,
            6vw,
            78px
          );
          line-height: 0.91;
          letter-spacing: -0.07em;
        }

        .download-final p {
          max-width: 440px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.34);
          font-size: 12px;
          line-height: 1.7;
        }

        .final-actions {
          display: flex;
          justify-content: center;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: 25px;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
          border-top: 1px solid
            rgba(255, 255, 255, 0.06);
          padding: 27px 0;
        }

        .footer-inner {
          width: min(
            1100px,
            calc(100% - 44px)
          );
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.23);
          font-size: 9px;
        }

        .footer-links {
          display: flex;
          gap: 19px;
        }

        .footer-links a:hover {
          color: rgba(255, 255, 255, 0.65);
        }

        /* =====================================================
           REVEAL
        ===================================================== */

        .scroll-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.75s ease,
            transform 0.75s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }

        .scroll-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes titleIn {
          from {
            opacity: 0;
            transform:
              translateY(30px)
              scale(0.97);
            filter: blur(9px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter: blur(0);
          }
        }

        @keyframes gradientMove {
          from {
            background-position: 0% 50%;
          }

          to {
            background-position: 220% 50%;
          }
        }

        @keyframes visualPulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(0.95);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes coreFloat {
          0%,
          100% {
            margin-top: 0;
            transform:
              translate(-50%, -50%)
              rotateX(10deg)
              rotateY(-18deg)
              rotateZ(3deg);
          }

          50% {
            margin-top: -19px;
            transform:
              translate(-50%, -50%)
              rotateX(14deg)
              rotateY(-13deg)
              rotateZ(4deg);
          }
        }

        @keyframes orbitRotate {
          from {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              rotateZ(360deg);
          }
        }

        @keyframes orbitRotateReverse {
          from {
            transform:
              translate(-50%, -50%)
              rotateY(65deg)
              rotateZ(360deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotateY(65deg)
              rotateZ(0deg);
          }
        }

        @keyframes ringSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes cardFloatOne {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -17px;
          }
        }

        @keyframes cardFloatTwo {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: 20px;
          }
        }

        @keyframes cardFloatThree {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -14px;
          }
        }

        @keyframes badgeFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1050px) {
          .navbar-links {
            display: none;
          }

          .download-visual {
            right: -190px;
            opacity: 0.58;
          }
        }

        @media (max-width: 800px) {
          .nav-status,
          .theme-toggle-label {
            display: none;
          }

          .mobile-menu-button {
            display: inline-flex;
          }

          .navbar-actions .btn {
            display: none;
          }

          .download-hero {
            min-height: 900px;
            padding-top: 130px;
          }

          .hero-copy {
            width: 100%;
            text-align: center;
            margin: auto;
          }

          .hero-eyebrow {
            justify-content: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-meta {
            justify-content: center;
            flex-wrap: wrap;
          }

          .download-visual {
            width: 570px;
            height: 570px;
            right: 50%;
            top: 70%;
            transform:
              translate(50%, -50%);
            opacity: 0.47;
          }

          .platform-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .navbar-inner,
          .hero-content,
          .download-section-inner,
          .footer-inner {
            width: calc(100% - 30px);
          }

          .download-hero {
            min-height: 850px;
          }

          .download-title {
            font-size: 58px;
          }

          .hero-description {
            font-size: 13px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-button {
            width: 100%;
          }

          .download-visual {
            width: 420px;
            height: 420px;
            top: 70%;
          }

          .visual-core {
            width: 205px;
            height: 205px;
          }

          .visual-core-inner {
            border-radius: 34px;
          }

          .visual-logo-ring {
            width: 75px;
            height: 75px;
          }

          .visual-core-inner > strong {
            font-size: 17px;
          }

          .visual-core-inner > span {
            font-size: 12px;
          }

          .floating-mail-card {
            width: 180px;
            transform: scale(0.8);
          }

          .visual-card-one {
            left: -35px;
          }

          .visual-card-two {
            right: -50px;
          }

          .visual-card-three {
            right: -75px;
          }

          .visual-badge-one {
            left: -5px;
          }

          .visual-badge-two {
            right: 0;
          }

          .browser-card {
            flex-direction: column;
            align-items: stretch;
          }

          .browser-button {
            justify-content: center;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .footer-links {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header
        className={`navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="navbar-inner">
          <a
            href={HOME_URL}
            className="brand"
            onClick={closeMenu}
          >
            <Logo size={34} />

            <span className="brand-name">
              Fades<span>Mail</span>
            </span>
          </a>

          <nav className="navbar-links">
            <a
              href={HOME_URL}
              className="navbar-link"
            >
              Home
            </a>

            <a
              href="#download"
              className="navbar-link"
            >
              Download
            </a>
          </nav>

          <div className="navbar-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <ThemeIcon theme={theme} />

              <span className="theme-toggle-label">
                {theme === "dark"
                  ? "Dark"
                  : "Light"}
              </span>
            </button>

            <span className="nav-status">
              <span className="online-dot" />
              Invite only
            </span>

            <a
              href={MAIL_URL}
              className="btn btn-primary btn-sm"
            >
              Open Fades Mail
              <Arrow size={14} />
            </a>

            <button
              type="button"
              className="mobile-menu-button btn-icon"
              onClick={() =>
                setMenuOpen(
                  (value) => !value
                )
              }
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={menuOpen}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="presentation-mobile-menu">
            <a
              href={HOME_URL}
              onClick={closeMenu}
            >
              Home
            </a>

            <a
              href="#download"
              onClick={closeMenu}
            >
              Download
            </a>

            <button
              type="button"
              className="mobile-theme-button"
              onClick={toggleTheme}
            >
              <ThemeIcon theme={theme} />

              <span>
                {theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"}
              </span>
            </button>

            <a
              href={MAIL_URL}
              onClick={closeMenu}
            >
              Open Fades Mail
              <Arrow size={14} />
            </a>
          </div>
        )}
      </header>

      <main>
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="download-hero">
          <div className="hero-grid" />

          <div className="hero-content">
            <Reveal>
              <div className="hero-copy">
                <div className="hero-eyebrow">
                  <span className="hero-eyebrow-dot" />

                  FADES MAIL DESKTOP

                  <span className="hero-eyebrow-line" />
                </div>

                <h1 className="download-title">
                  Fades Mail,
                  <br />
                  <span>on your desktop.</span>
                </h1>

                <p className="hero-description">
                  A focused desktop experience for your
                  inbox. Download Fades Mail and keep your
                  private mailbox just a click away.
                </p>

                <div className="hero-actions">
                  <a
                    href="#download"
                    className="btn btn-primary hero-button"
                  >
                    <DownloadIcon size={17} />
                    Download Fades Mail
                  </a>

                  <a
                    href={HOME_URL}
                    className="btn hero-button hero-button-secondary"
                  >
                    Back to home
                    <Arrow size={16} />
                  </a>
                </div>

                <div className="hero-meta">
                  <span>
                    <span className="online-dot" />
                    Invite only
                  </span>

                  <span className="hero-meta-divider" />

                  <span>
                    Windows · macOS · Linux
                  </span>

                  <span className="hero-meta-divider" />

                  <span>
                    Private mailboxes
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <DownloadVisual />
        </section>

        {/* ===================================================
            DOWNLOAD
        =================================================== */}

        <section
          className="download-section"
          id="download"
        >
          <div className="download-section-inner">
            <Reveal>
              <div className="section-heading">
                <span className="section-eyebrow">
                  CHOOSE YOUR PLATFORM
                </span>

                <h2>
                  Download Fades Mail.
                </h2>

                <p>
                  Select your operating system to get the
                  desktop version of Fades Mail.
                </p>
              </div>
            </Reveal>

            <div className="platform-grid">
              <Reveal>
                <DownloadCard
                  icon={<WindowsIcon />}
                  name="Windows"
                  description="Windows 10 and later"
                  version="x64"
                  href={DOWNLOADS.windows}
                />
              </Reveal>

              <Reveal delay="reveal-delay-1">
                <DownloadCard
                  icon={<AppleIcon />}
                  name="macOS"
                  description="Apple Silicon & Intel"
                  version="Universal"
                  href={DOWNLOADS.macos}
                />
              </Reveal>

              <Reveal delay="reveal-delay-2">
                <DownloadCard
                  icon={<LinuxIcon />}
                  name="Linux"
                  description="AppImage"
                  version="x64"
                  href={DOWNLOADS.linux}
                />
              </Reveal>
            </div>

            <Reveal>
              <div className="browser-card">
                <div className="browser-copy">
                  <div className="browser-copy-icon">
                    <Arrow size={18} />
                  </div>

                  <div>
                    <strong>
                      Prefer the browser?
                    </strong>

                    <span>
                      You can use Fades Mail directly at
                      mail.fades.lol.
                    </span>
                  </div>
                </div>

                <a
                  href={MAIL_URL}
                  className="browser-button"
                >
                  Open Fades Mail
                  <Arrow size={13} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================================================
            FINAL
        =================================================== */}

        <section className="download-final">
          <Reveal>
            <div className="download-final-content">
              <div className="download-final-logo">
                <Logo size={47} />
              </div>

              <span className="section-eyebrow">
                FADES MAIL
              </span>

              <h2>
                Email,
                <br />
                <span>reimagined.</span>
              </h2>

              <p>
                Download the desktop experience or head back
                to Fades Mail in your browser.
              </p>

              <div className="final-actions">
                <a
                  href="#download"
                  className="btn btn-primary hero-button"
                >
                  <DownloadIcon size={16} />
                  Download
                </a>

                <a
                  href={HOME_URL}
                  className="btn hero-button hero-button-secondary"
                >
                  Back to home
                  <Arrow size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">
        <div className="footer-inner">
          <span>
            © {new Date().getFullYear()} Fades. All rights
            reserved.
          </span>

          <div className="footer-links">
            <a href={HOME_URL}>
              Fades Mail
            </a>

            <a href="https://fades.lol">
              Fades AI
            </a>

            <a href="https://browse.fades.lol">
              Fades Browser
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

