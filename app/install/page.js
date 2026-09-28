"use client";

import { useEffect, useRef, useState } from "react";

const MAIL_URL = "https://mail.fades.lol";

const DOWNLOADS = {
  windows: "/downloads/fades-mail-windows.exe",
  macos: "/downloads/fades-mail-macos.dmg",
  linux: "/downloads/fades-mail-linux.AppImage",
};

/* =========================================================
   ICONS
========================================================= */

function Logo({ size = 42 }) {
  return (
    <img
      src="/logo.png"
      alt="Fades Mail"
      width={size}
      height={size}
      className="download-logo"
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

function DownloadIcon({ size = 20 }) {
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
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function WindowsIcon({ size = 25 }) {
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

function AppleIcon({ size = 25 }) {
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

function LinuxIcon({ size = 25 }) {
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

function GlobeIcon({ size = 19 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.7 5.5 3.7 9S14.5 18.5 12 21" />
      <path d="M12 3c-2.5 2.5-3.7 5.5-3.7 9S9.5 18.5 12 21" />
    </svg>
  );
}

function CheckIcon({ size = 16 }) {
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

/* =========================================================
   FLOATING MAIL CARD
========================================================= */

function MailCard({
  className = "",
  sender = "Fades",
  subject = "Welcome to Fades Mail",
  text = "Email, reimagined.",
}) {
  return (
    <div className={`floating-mail-card ${className}`}>
      <div className="floating-mail-top">
        <div className="floating-avatar">
          <Logo size={27} />
        </div>

        <div className="floating-sender">
          <strong>{sender}</strong>
          <span>just now</span>
        </div>

        <span className="floating-dot" />
      </div>

      <div className="floating-subject">{subject}</div>

      <p>{text}</p>

      <div className="floating-lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* =========================================================
   HERO 3D OBJECT
========================================================= */

function ThreeDMail() {
  return (
    <div className="scene">
      <div className="scene-glow" />

      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <div className="mail-object">
        <div className="mail-object-shadow" />

        <div className="mail-face mail-face-front">
          <div className="mail-face-glow" />

          <div className="mail-logo-ring">
            <Logo size={74} />
          </div>

          <div className="mail-object-name">
            <strong>Fades</strong>
            <span>Mail</span>
          </div>

          <div className="mail-object-status">
            <span />
            Private mailbox
          </div>
        </div>

        <div className="mail-face mail-face-side">
          <div />
          <div />
          <div />
        </div>

        <div className="mail-face mail-face-top">
          <span />
          <span />
        </div>
      </div>

      <MailCard
        className="mail-card-one"
        sender="Fades"
        subject="Your inbox is ready"
        text="Everything important, right where it belongs."
      />

      <MailCard
        className="mail-card-two"
        sender="James Wilson"
        subject="The project looks great!"
        text="Just went through everything..."
      />

      <MailCard
        className="mail-card-three"
        sender="Sarah Miller"
        subject="Meeting confirmation"
        text="Hey, just confirming we're still on..."
      />

      <div className="scene-chip scene-chip-one">
        <span className="chip-pulse" />
        Private by design
      </div>

      <div className="scene-chip scene-chip-two">
        <CheckIcon size={13} />
        Draft saved
      </div>
    </div>
  );
}

/* =========================================================
   PARTICLES
========================================================= */

function Particles() {
  const particles = Array.from({ length: 42 });

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((_, index) => (
        <span
          key={index}
          style={{
            "--i": index,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   DOWNLOAD CARD
========================================================= */

function DownloadCard({
  icon,
  title,
  subtitle,
  version,
  href,
  primary = false,
}) {
  return (
    <a
      href={href}
      className={`download-card ${primary ? "download-card-primary" : ""}`}
      download
    >
      <div className="download-card-icon">{icon}</div>

      <div className="download-card-content">
        <span className="download-card-kicker">FADES MAIL</span>

        <strong>{title}</strong>

        <span className="download-card-subtitle">
          {subtitle}
        </span>

        <div className="download-card-meta">
          <span>{version}</span>
          <span>Free</span>
        </div>
      </div>

      <span className="download-card-arrow">
        <DownloadIcon size={19} />
      </span>
    </a>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const handleMouse = (event) => {
      const x =
        event.clientX / window.innerWidth - 0.5;

      const y =
        event.clientY / window.innerHeight - 0.5;

      setMouse({
        x,
        y,
      });
    };

    window.addEventListener("mousemove", handleMouse, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const openMail = () => {
    window.location.href = MAIL_URL;
  };

  return (
    <div
      className="download-page"
      style={{
        "--mouse-x": `${mouse.x}`,
        "--mouse-y": `${mouse.y}`,
      }}
    >
      <style jsx global>{`
        :root {
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
          background: #050505;
        }

        body {
          margin: 0;
          background: #050505;
          color: #f4f4f0;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
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

        /* ================================================
           PAGE
        ================================================ */

        .download-page {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(
              circle at 50% -10%,
              rgba(255, 202, 93, 0.12),
              transparent 32%
            ),
            radial-gradient(
              circle at 80% 45%,
              rgba(255, 174, 71, 0.055),
              transparent 28%
            ),
            #050505;
        }

        /* ================================================
           NAVBAR
        ================================================ */

        .download-nav {
          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;
          right: 0;
          height: 82px;
          display: flex;
          align-items: center;
          transition:
            background 0.35s ease,
            border 0.35s ease,
            backdrop-filter 0.35s ease;
        }

        .download-nav.scrolled {
          background: rgba(5, 5, 5, 0.68);
          backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .download-nav-inner {
          width: min(1220px, calc(100% - 44px));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .download-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .download-brand-logo {
          width: 35px;
          height: 35px;
          border-radius: 10px;
          object-fit: contain;
        }

        .download-brand-name {
          font-size: 17px;
        }

        .download-brand-name span {
          opacity: 0.42;
          font-weight: 500;
        }

        .download-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: 100px;
        }

        .download-nav-links a {
          color: rgba(255, 255, 255, 0.55);
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .download-nav-links a:hover {
          color: white;
        }

        .download-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-open-button {
          height: 40px;
          padding: 0 17px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 11px;
          background: #f3f1e9;
          color: #080808;
          font-size: 13px;
          font-weight: 700;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .nav-open-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 28px rgba(255, 220, 135, 0.15);
        }

        /* ================================================
           HERO
        ================================================ */

        .download-hero {
          min-height: 960px;
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
          padding: 150px 0 100px;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: -4;
          opacity: 0.45;
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
          background-size: 75px 75px;
          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 22%,
              black 70%,
              transparent
            );
          transform:
            perspective(700px)
            rotateX(63deg)
            translateY(240px)
            scale(1.6);
          transform-origin: center bottom;
        }

        .hero-grid-glow {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -150px;
          height: 620px;
          z-index: -3;
          background:
            radial-gradient(
              ellipse,
              rgba(255, 194, 74, 0.13),
              transparent 64%
            );
          pointer-events: none;
        }

        .hero-content {
          width: min(1220px, calc(100% - 44px));
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        .hero-copy {
          width: min(650px, 100%);
          position: relative;
          z-index: 10;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 11px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          color: rgba(255, 255, 255, 0.55);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
          animation: heroFade 0.9s ease both;
        }

        .hero-kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c6ff91;
          box-shadow: 0 0 14px rgba(198, 255, 145, 0.8);
        }

        .hero-title {
          margin: 25px 0 0;
          font-size: clamp(65px, 8.3vw, 125px);
          line-height: 0.87;
          letter-spacing: -0.075em;
          font-weight: 650;
          max-width: 850px;
          animation: heroTitle 1s cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }

        .hero-title-gradient {
          background:
            linear-gradient(
              115deg,
              #fff 0%,
              #fff 20%,
              #d8cda9 48%,
              #a08d5e 73%,
              #fff 100%
            );
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 7s linear infinite;
        }

        .hero-description {
          margin: 32px 0 0;
          width: min(550px, 100%);
          color: rgba(255, 255, 255, 0.52);
          font-size: 17px;
          line-height: 1.75;
          animation: heroFade 1s 0.2s ease both;
        }

        .hero-actions {
          display: flex;
          gap: 11px;
          flex-wrap: wrap;
          margin-top: 30px;
          animation: heroFade 1s 0.3s ease both;
        }

        .hero-button {
          height: 52px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 13px;
          font-size: 13px;
          font-weight: 700;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border 0.25s ease;
        }

        .hero-button-primary {
          color: #090909;
          background: #f3f0e5;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.12),
            0 14px 50px rgba(255, 215, 120, 0.08);
        }

        .hero-button-primary:hover {
          transform: translateY(-3px);
          box-shadow:
            0 15px 45px rgba(255, 210, 120, 0.2);
        }

        .hero-button-secondary {
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
        }

        .hero-button-secondary:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 27px;
          color: rgba(255, 255, 255, 0.38);
          font-size: 11px;
          animation: heroFade 1s 0.4s ease both;
        }

        .hero-meta span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .hero-meta span + span::before {
          content: "";
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          margin-right: 8px;
        }

        .hero-meta-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c6ff91;
          box-shadow: 0 0 10px rgba(198, 255, 145, 0.7);
        }

        /* ================================================
           PARTICLES
        ================================================ */

        .particles {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          overflow: hidden;
        }

        .particles span {
          --size: calc(1px + (var(--i) % 3) * 1px);

          position: absolute;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.55);
          left: calc((var(--i) * 47) % 100 * 1%);
          top: calc((var(--i) * 71) % 100 * 1%);
          opacity: calc(0.1 + ((var(--i) % 5) * 0.08));
          animation:
            particleFloat
            calc(5s + (var(--i) % 7) * 1s)
            ease-in-out
            infinite alternate;
          animation-delay: calc((var(--i) % 9) * -0.7s);
        }

        /* ================================================
           3D SCENE
        ================================================ */

        .hero-scene-wrap {
          position: absolute;
          right: -40px;
          top: 50%;
          width: 680px;
          height: 680px;
          transform:
            translateY(-42%)
            translate(
              calc(var(--mouse-x) * 18px),
              calc(var(--mouse-y) * 18px)
            );
          transition: transform 0.25s ease-out;
          z-index: 2;
        }

        .scene {
          width: 100%;
          height: 100%;
          position: relative;
          perspective: 1100px;
          transform-style: preserve-3d;
        }

        .scene-glow {
          position: absolute;
          width: 430px;
          height: 430px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255, 204, 103, 0.18),
              rgba(255, 175, 55, 0.055) 38%,
              transparent 70%
            );
          filter: blur(15px);
          animation: glowPulse 5s ease-in-out infinite;
        }

        .mail-object {
          width: 300px;
          height: 300px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform:
            translate(-50%, -50%)
            rotateX(11deg)
            rotateY(-23deg)
            rotateZ(3deg);
          transform-style: preserve-3d;
          animation: objectFloat 7s ease-in-out infinite;
        }

        .mail-face {
          position: absolute;
          inset: 0;
          border-radius: 48px;
          overflow: hidden;
          backface-visibility: hidden;
        }

        .mail-face-front {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(255, 255, 255, 0.12),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #191919,
              #0d0d0d 55%,
              #070707
            );
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 35px 80px rgba(0, 0, 0, 0.65),
            0 0 100px rgba(255, 201, 98, 0.08);
          transform: translateZ(42px);
        }

        .mail-face-glow {
          position: absolute;
          inset: -50%;
          background:
            radial-gradient(
              circle,
              rgba(255, 210, 120, 0.12),
              transparent 35%
            );
          animation: faceGlow 6s linear infinite;
        }

        .mail-face-side {
          width: 84px;
          left: auto;
          right: -42px;
          transform:
            rotateY(90deg)
            translateZ(42px);
          transform-origin: left center;
          border-radius: 0 38px 38px 0;
          background: linear-gradient(
            180deg,
            #151515,
            #080808
          );
          border: 1px solid rgba(255, 255, 255, 0.09);
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
          padding: 20px;
        }

        .mail-face-side div {
          height: 3px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.08);
        }

        .mail-face-side div:nth-child(2) {
          width: 70%;
        }

        .mail-face-side div:nth-child(3) {
          width: 48%;
        }

        .mail-face-top {
          height: 84px;
          bottom: auto;
          top: -42px;
          transform:
            rotateX(90deg)
            translateZ(42px);
          transform-origin: bottom center;
          border-radius: 38px 38px 0 0;
          background: #171717;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mail-logo-ring {
          width: 112px;
          height: 112px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255, 213, 130, 0.11),
              rgba(255, 255, 255, 0.02) 62%
            );
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 0 55px rgba(255, 204, 106, 0.11),
            inset 0 0 30px rgba(255, 255, 255, 0.04);
          position: relative;
          z-index: 2;
        }

        .mail-logo-ring::before {
          content: "";
          position: absolute;
          inset: -10px;
          border-radius: inherit;
          border: 1px solid rgba(255, 214, 130, 0.1);
          animation: ringRotate 10s linear infinite;
        }

        .mail-object-name {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: baseline;
          gap: 5px;
          margin-top: 17px;
          letter-spacing: -0.04em;
        }

        .mail-object-name strong {
          font-size: 23px;
        }

        .mail-object-name span {
          color: rgba(255, 255, 255, 0.42);
          font-size: 17px;
        }

        .mail-object-status {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 9px;
          color: rgba(255, 255, 255, 0.32);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .mail-object-status span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c6ff91;
          box-shadow: 0 0 10px rgba(198, 255, 145, 0.8);
        }

        .mail-object-shadow {
          position: absolute;
          width: 320px;
          height: 90px;
          left: 50%;
          bottom: -115px;
          transform: translateX(-50%) rotateX(72deg);
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          filter: blur(25px);
        }

        /* ================================================
           FLOATING CARDS
        ================================================ */

        .floating-mail-card {
          position: absolute;
          width: 235px;
          padding: 17px;
          border-radius: 18px;
          background:
            linear-gradient(
              145deg,
              rgba(28, 28, 28, 0.9),
              rgba(12, 12, 12, 0.76)
            );
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
        }

        .floating-mail-top {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .floating-avatar {
          width: 29px;
          height: 29px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .floating-sender {
          display: flex;
          flex-direction: column;
          gap: 1px;
          flex: 1;
        }

        .floating-sender strong {
          font-size: 11px;
        }

        .floating-sender span {
          color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
        }

        .floating-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c6ff91;
          box-shadow: 0 0 10px rgba(198, 255, 145, 0.6);
        }

        .floating-subject {
          margin-top: 14px;
          font-size: 12px;
          font-weight: 650;
          letter-spacing: -0.02em;
        }

        .floating-mail-card p {
          margin: 5px 0 11px;
          color: rgba(255, 255, 255, 0.34);
          font-size: 9px;
          line-height: 1.5;
        }

        .floating-lines {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .floating-lines span {
          height: 3px;
          width: 100%;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.055);
        }

        .floating-lines span:nth-child(2) {
          width: 72%;
        }

        .floating-lines span:nth-child(3) {
          width: 48%;
        }

        .mail-card-one {
          left: -5px;
          top: 108px;
          transform: rotate(-8deg);
          animation: cardOne 8s ease-in-out infinite;
        }

        .mail-card-two {
          right: -15px;
          top: 90px;
          transform: rotate(8deg);
          animation: cardTwo 9s ease-in-out infinite;
        }

        .mail-card-three {
          right: -45px;
          bottom: 95px;
          transform: rotate(-5deg);
          animation: cardThree 10s ease-in-out infinite;
        }

        .scene-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border-radius: 999px;
          background: rgba(13, 13, 13, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(14px);
          color: rgba(255, 255, 255, 0.5);
          font-size: 9px;
          white-space: nowrap;
        }

        .scene-chip-one {
          left: 50px;
          bottom: 120px;
          animation: chipFloat 6s ease-in-out infinite;
        }

        .scene-chip-two {
          right: 80px;
          top: 235px;
          animation: chipFloat 7s 1s ease-in-out infinite;
        }

        .chip-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c6ff91;
          box-shadow: 0 0 10px rgba(198, 255, 145, 0.8);
        }

        /* ================================================
           DOWNLOAD SECTION
        ================================================ */

        .download-section {
          position: relative;
          padding: 110px 0 130px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 207, 110, 0.065),
              transparent 40%
            ),
            #070707;
        }

        .download-section-inner {
          width: min(1120px, calc(100% - 44px));
          margin: 0 auto;
        }

        .section-heading {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 55px;
        }

        .section-kicker {
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.18em;
        }

        .section-heading h2 {
          margin: 15px 0 13px;
          font-size: clamp(38px, 5vw, 65px);
          line-height: 0.95;
          letter-spacing: -0.06em;
        }

        .section-heading p {
          margin: 0 auto;
          max-width: 520px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 14px;
          line-height: 1.7;
        }

        .download-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .download-card {
          min-height: 250px;
          position: relative;
          padding: 25px;
          display: flex;
          flex-direction: column;
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.018)
            );
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .download-card::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          top: -90px;
          right: -90px;
          border-radius: 50%;
          background: rgba(255, 210, 110, 0.08);
          filter: blur(30px);
          transition: transform 0.5s ease;
        }

        .download-card:hover {
          transform: translateY(-7px);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
        }

        .download-card:hover::before {
          transform: scale(1.7);
        }

        .download-card-icon {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.85);
        }

        .download-card-content {
          display: flex;
          flex-direction: column;
          margin-top: auto;
          position: relative;
          z-index: 2;
        }

        .download-card-kicker {
          margin-bottom: 5px;
          color: rgba(255, 255, 255, 0.27);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .download-card strong {
          font-size: 21px;
          letter-spacing: -0.04em;
        }

        .download-card-subtitle {
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.35);
          font-size: 11px;
        }

        .download-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 17px;
        }

        .download-card-meta span {
          padding: 5px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.32);
          font-size: 8px;
        }

        .download-card-arrow {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.04);
          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .download-card:hover .download-card-arrow {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.09);
        }

        /* ================================================
           WEB VERSION
        ================================================ */

        .web-version {
          margin-top: 15px;
          padding: 22px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-radius: 19px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.025);
        }

        .web-version-left {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .web-version-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.65);
        }

        .web-version-copy {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .web-version-copy strong {
          font-size: 13px;
        }

        .web-version-copy span {
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
        }

        .web-button {
          height: 42px;
          padding: 0 15px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 11px;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .web-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* ================================================
           FEATURES
        ================================================ */

        .feature-section {
          position: relative;
          padding: 130px 0;
          overflow: hidden;
        }

        .feature-section-inner {
          width: min(1120px, calc(100% - 44px));
          margin: 0 auto;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .feature-box {
          padding: 27px;
          min-height: 240px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.065);
        }

        .feature-number {
          color: rgba(255, 255, 255, 0.2);
          font-size: 9px;
          letter-spacing: 0.16em;
          font-weight: 700;
        }

        .feature-icon {
          margin-top: 35px;
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.72);
        }

        .feature-box h3 {
          margin: 18px 0 7px;
          font-size: 18px;
          letter-spacing: -0.035em;
        }

        .feature-box p {
          margin: 0;
          color: rgba(255, 255, 255, 0.35);
          font-size: 11px;
          line-height: 1.7;
        }

        /* ================================================
           CTA
        ================================================ */

        .final-section {
          position: relative;
          padding: 160px 20px;
          text-align: center;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .final-glow {
          position: absolute;
          width: 700px;
          height: 400px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(
              ellipse,
              rgba(255, 201, 96, 0.12),
              transparent 68%
            );
          filter: blur(25px);
        }

        .final-content {
          position: relative;
          z-index: 2;
        }

        .final-logo {
          width: 75px;
          height: 75px;
          margin: 0 auto 25px;
          display: grid;
          place-items: center;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 80px rgba(255, 205, 110, 0.08);
        }

        .final-content h2 {
          margin: 0;
          font-size: clamp(45px, 7vw, 85px);
          line-height: 0.92;
          letter-spacing: -0.065em;
        }

        .final-content p {
          margin: 24px auto 0;
          max-width: 450px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.7;
          font-size: 13px;
        }

        .final-button {
          margin-top: 28px;
          height: 52px;
          padding: 0 21px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 13px;
          color: #080808;
          background: #f3f0e5;
          font-size: 13px;
          font-weight: 750;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .final-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 50px rgba(255, 211, 115, 0.16);
        }

        /* ================================================
           FOOTER
        ================================================ */

        .download-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 27px 0;
        }

        .download-footer-inner {
          width: min(1120px, calc(100% - 44px));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 10px;
        }

        .download-footer-links {
          display: flex;
          gap: 20px;
        }

        .download-footer-links a:hover {
          color: rgba(255, 255, 255, 0.65);
        }

        /* ================================================
           ANIMATIONS
        ================================================ */

        @keyframes heroFade {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroTitle {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.97);
            filter: blur(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 220% 50%;
          }
        }

        @keyframes particleFloat {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(
              calc((var(--i) % 5 - 2) * 15px),
              calc(-20px - (var(--i) % 4) * 13px),
              0
            );
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(0.94);
          }

          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes objectFloat {
          0%,
          100% {
            margin-top: 0;
            transform:
              translate(-50%, -50%)
              rotateX(11deg)
              rotateY(-23deg)
              rotateZ(3deg);
          }

          50% {
            margin-top: -20px;
            transform:
              translate(-50%, -50%)
              rotateX(15deg)
              rotateY(-17deg)
              rotateZ(4deg);
          }
        }

        @keyframes faceGlow {
          0% {
            transform: translate(-20%, -20%);
          }

          50% {
            transform: translate(20%, 20%);
          }

          100% {
            transform: translate(-20%, -20%);
          }
        }

        @keyframes ringRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes cardOne {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -18px;
          }
        }

        @keyframes cardTwo {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: 22px;
          }
        }

        @keyframes cardThree {
          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -14px;
          }
        }

        @keyframes chipFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        /* ================================================
           RESPONSIVE
        ================================================ */

        @media (max-width: 1100px) {
          .hero-scene-wrap {
            right: -190px;
            opacity: 0.68;
          }

          .hero-copy {
            max-width: 610px;
          }

          .download-nav-links {
            margin-left: 0;
          }
        }

        @media (max-width: 850px) {
          .download-nav-links {
            display: none;
          }

          .download-hero {
            min-height: 900px;
            padding-top: 135px;
          }

          .hero-copy {
            width: 100%;
            text-align: center;
            margin: 0 auto;
          }

          .hero-kicker {
            margin: 0 auto;
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

          .hero-scene-wrap {
            width: 560px;
            height: 560px;
            top: 67%;
            right: 50%;
            transform:
              translate(50%, -50%)
              translate(
                calc(var(--mouse-x) * 10px),
                calc(var(--mouse-y) * 10px)
              );
            opacity: 0.5;
          }

          .download-cards,
          .feature-grid {
            grid-template-columns: 1fr;
          }

          .download-card {
            min-height: 220px;
          }
        }

        @media (max-width: 560px) {
          .download-nav {
            height: 70px;
          }

          .download-nav-inner,
          .hero-content,
          .download-section-inner,
          .feature-section-inner,
          .download-footer-inner {
            width: min(100% - 30px, 1120px);
          }

          .nav-open-button {
            padding: 0 12px;
          }

          .download-hero {
            min-height: 820px;
            padding-top: 115px;
          }

          .hero-title {
            font-size: clamp(56px, 18vw, 85px);
          }

          .hero-description {
            font-size: 14px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-button {
            width: 100%;
          }

          .hero-meta {
            font-size: 9px;
            gap: 10px;
          }

          .hero-scene-wrap {
            width: 420px;
            height: 420px;
            top: 71%;
          }

          .mail-object {
            width: 210px;
            height: 210px;
          }

          .mail-logo-ring {
            width: 82px;
            height: 82px;
          }

          .mail-object-name strong {
            font-size: 17px;
          }

          .mail-object-name span {
            font-size: 13px;
          }

          .mail-face {
            border-radius: 34px;
          }

          .floating-mail-card {
            width: 180px;
            transform: scale(0.82);
          }

          .mail-card-one {
            left: -50px;
          }

          .mail-card-two {
            right: -55px;
          }

          .mail-card-three {
            right: -75px;
          }

          .scene-chip-one {
            left: -15px;
          }

          .scene-chip-two {
            right: 10px;
          }

          .download-section,
          .feature-section {
            padding: 85px 0;
          }

          .web-version {
            align-items: flex-start;
            flex-direction: column;
          }

          .web-button {
            width: 100%;
            justify-content: center;
          }

          .download-footer-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .download-footer-links {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header
        className={`download-nav ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="download-nav-inner">
          <a href="/" className="download-brand">
            <img
              src="/logo.png"
              alt="Fades"
              className="download-brand-logo"
            />

            <span className="download-brand-name">
              Fades<span>Mail</span>
            </span>
          </a>

          <nav className="download-nav-links">
            <a href="#download">Download</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </nav>

          <div className="download-nav-actions">
            <a
              href={MAIL_URL}
              className="nav-open-button"
            >
              Open Mail
              <Arrow size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main>
        <section className="download-hero" ref={heroRef}>
          <div className="hero-grid" />
          <div className="hero-grid-glow" />

          <Particles />

          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="hero-kicker-dot" />
                FADES MAIL · DESKTOP
              </div>

              <h1 className="hero-title">
                Your inbox.
                <br />
                <span className="hero-title-gradient">
                  Everywhere.
                </span>
              </h1>

              <p className="hero-description">
                Bring Fades Mail to your desktop with a fast,
                focused experience designed to stay out of your
                way.
              </p>

              <div className="hero-actions">
                <a
                  href="#download"
                  className="hero-button hero-button-primary"
                >
                  <DownloadIcon size={18} />
                  Download Fades Mail
                </a>

                <button
                  type="button"
                  onClick={openMail}
                  className="hero-button hero-button-secondary"
                >
                  Open in browser
                  <Arrow size={16} />
                </button>
              </div>

              <div className="hero-meta">
                <span>
                  <i className="hero-meta-dot" />
                  Private & invite-only
                </span>

                <span>Windows · macOS · Linux</span>

                <span>Fades Mail</span>
              </div>
            </div>
          </div>

          <div className="hero-scene-wrap">
            <ThreeDMail />
          </div>
        </section>

        {/* ===================================================
            DOWNLOAD
        =================================================== */}

        <section className="download-section" id="download">
          <div className="download-section-inner">
            <div className="section-heading">
              <span className="section-kicker">
                DOWNLOAD FADES MAIL
              </span>

              <h2>
                Pick your
                <br />
                platform.
              </h2>

              <p>
                Install Fades Mail on your computer and keep
                your inbox one click away.
              </p>
            </div>

            <div className="download-cards">
              <DownloadCard
                icon={<WindowsIcon />}
                title="Windows"
                subtitle="Windows 10 or later"
                version="x64"
                href={DOWNLOADS.windows}
                primary
              />

              <DownloadCard
                icon={<AppleIcon />}
                title="macOS"
                subtitle="Apple Silicon & Intel"
                version="Universal"
                href={DOWNLOADS.macos}
              />

              <DownloadCard
                icon={<LinuxIcon />}
                title="Linux"
                subtitle="AppImage"
                version="x64"
                href={DOWNLOADS.linux}
              />
            </div>

            <div className="web-version">
              <div className="web-version-left">
                <div className="web-version-icon">
                  <GlobeIcon />
                </div>

                <div className="web-version-copy">
                  <strong>Don't want to install anything?</strong>
                  <span>
                    Fades Mail works directly in your browser.
                  </span>
                </div>
              </div>

              <a
                href={MAIL_URL}
                className="web-button"
              >
                Open Fades Mail
                <Arrow size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================
            FEATURES
        =================================================== */}

        <section className="feature-section" id="features">
          <div className="feature-section-inner">
            <div className="section-heading">
              <span className="section-kicker">
                BUILT FOR FOCUS
              </span>

              <h2>
                Email without
                <br />
                the noise.
              </h2>

              <p>
                Fades Mail keeps the interface quiet so your
                messages can stay at the center.
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-box">
                <span className="feature-number">
                  01 / SPEED
                </span>

                <div className="feature-icon">
                  <DownloadIcon size={19} />
                </div>

                <h3>Always close.</h3>

                <p>
                  Launch your mailbox from your desktop without
                  opening another browser tab.
                </p>
              </div>

              <div className="feature-box">
                <span className="feature-number">
                  02 / PRIVACY
                </span>

                <div className="feature-icon">
                  <CheckIcon size={19} />
                </div>

                <h3>Private by design.</h3>

                <p>
                  Fades Mail remains invite-only, keeping access
                  intentionally limited.
                </p>
              </div>

              <div className="feature-box">
                <span className="feature-number">
                  03 / EXPERIENCE
                </span>

                <div className="feature-icon">
                  <Logo size={22} />
                </div>

                <h3>Feels like Fades.</h3>

                <p>
                  A focused desktop experience built around the
                  same Fades Mail interface you already know.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}

        <section className="final-section" id="about">
          <div className="final-glow" />

          <div className="final-content">
            <div className="final-logo">
              <Logo size={48} />
            </div>

            <span className="section-kicker">
              FADES MAIL
            </span>

            <h2>
              Email should
              <br />
              feel this good.
            </h2>

            <p>
              A calmer inbox. A cleaner workspace. A little
              more personality in something you use every day.
            </p>

            <a
              href="#download"
              className="final-button"
            >
              Download Fades Mail
              <DownloadIcon size={17} />
            </a>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="download-footer">
        <div className="download-footer-inner">
          <span>
            © {new Date().getFullYear()} Fades. All rights
            reserved.
          </span>

          <div className="download-footer-links">
            <a href={MAIL_URL}>Fades Mail</a>
            <a href="https://fades.lol">Fades AI</a>
            <a href="https://browse.fades.lol">
              Fades Browser
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

