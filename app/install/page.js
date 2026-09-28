"use client";

import { useEffect, useState } from "react";

const MAIL_URL = "https://mail.fades.lol";

/*
  Replace these with your actual installer URLs.
*/
const DOWNLOADS = {
  windows: "/downloads/fades-mail-windows.exe",
  mac: "/downloads/fades-mail-macos.dmg",
  linux: "/downloads/fades-mail-linux.AppImage",
};

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function DownloadPage() {
  const [platform, setPlatform] = useState("windows");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes("mac")) {
      setPlatform("mac");
    } else if (ua.includes("linux")) {
      setPlatform("linux");
    } else {
      setPlatform("windows");
    }
  }, []);

  const platformName = {
    windows: "Windows",
    mac: "macOS",
    linux: "Linux",
  };

  return (
    <main className="download-page">
      {/* Background */}
      <div className="background">
        <div className="grid" />

        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />

        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />

        <div className="ring ring-one" />
        <div className="ring ring-two" />
      </div>

      {/* Navigation */}
      <header className="nav">
        <a href="/" className="brand">
          <div className="logo-box">
            <img src="/logo.png" alt="Fades Mail" />
          </div>

          <span>Fades Mail</span>
        </a>

        <div className="nav-actions">
          <a href="/" className="nav-button">
            Home
          </a>

          <a href={MAIL_URL} className="nav-button primary">
            Open Mail
            <ArrowIcon />
          </a>
        </div>
      </header>

      {/* Main */}
      <section className="content">
        <div className="badge">
          <span className="status-dot" />
          Fades Mail
        </div>

        <h1>
          Download
          <br />
          <span>Fades Mail.</span>
        </h1>

        <p className="description">
          Get Fades Mail on your desktop.
          <br />
          Simple, fast, and private.
        </p>

        <div className="download-area">
          <a
            href={DOWNLOADS[platform]}
            className="download-button"
            download
          >
            <DownloadIcon />

            <span>
              Download for {platformName[platform]}
              <small>Recommended for your device</small>
            </span>

            <ArrowIcon />
          </a>

          <div className="platforms">
            <button
              className={platform === "windows" ? "active" : ""}
              onClick={() => setPlatform("windows")}
            >
              Windows
            </button>

            <button
              className={platform === "mac" ? "active" : ""}
              onClick={() => setPlatform("mac")}
            >
              macOS
            </button>

            <button
              className={platform === "linux" ? "active" : ""}
              onClick={() => setPlatform("linux")}
            >
              Linux
            </button>
          </div>
        </div>

        <a href={MAIL_URL} className="browser-link">
          Continue in your browser
          <ArrowIcon />
        </a>
      </section>

      <div className="bottom-text">
        © {new Date().getFullYear()} Fades Mail
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #050505;
        }

        body {
          overflow-x: hidden;
        }

        .download-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(255, 255, 255, 0.055),
              transparent 30%
            ),
            #050505;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =========================
           BACKGROUND
        ========================= */

        .background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .grid {
          position: absolute;
          inset: -50%;
          opacity: 0.23;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          transform: perspective(600px) rotateX(62deg) translateY(20%);
          animation: gridMove 16s linear infinite;
        }

        .glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(100px);
          opacity: 0.35;
        }

        .glow-one {
          width: 500px;
          height: 500px;
          left: -180px;
          top: -180px;
          background: rgba(255, 255, 255, 0.09);
          animation: glowFloat 10s ease-in-out infinite;
        }

        .glow-two {
          width: 450px;
          height: 450px;
          right: -180px;
          bottom: -120px;
          background: rgba(150, 150, 150, 0.12);
          animation: glowFloat 13s ease-in-out infinite reverse;
        }

        .glow-three {
          width: 300px;
          height: 300px;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.06);
          filter: blur(120px);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: radial-gradient(
            circle at 30% 25%,
            rgba(255, 255, 255, 0.18),
            rgba(255, 255, 255, 0.015) 55%,
            transparent 75%
          );
          box-shadow:
            inset -20px -20px 60px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(255, 255, 255, 0.035);
        }

        .orb-one {
          width: 180px;
          height: 180px;
          left: 7%;
          top: 22%;
          animation: orbFloatOne 11s ease-in-out infinite;
        }

        .orb-two {
          width: 100px;
          height: 100px;
          right: 12%;
          top: 18%;
          animation: orbFloatTwo 9s ease-in-out infinite;
        }

        .orb-three {
          width: 65px;
          height: 65px;
          left: 18%;
          bottom: 12%;
          animation: orbFloatThree 8s ease-in-out infinite;
        }

        .ring {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          transform-style: preserve-3d;
        }

        .ring-one {
          width: 600px;
          height: 600px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateX(65deg) rotateZ(15deg);
          animation: ringSpin 30s linear infinite;
        }

        .ring-two {
          width: 850px;
          height: 850px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateX(65deg) rotateZ(-25deg);
          animation: ringSpinReverse 40s linear infinite;
        }

        /* =========================
           NAV
        ========================= */

        .nav {
          width: 100%;
          max-width: 1200px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 5;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
        }

        .logo-box {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }

        .logo-box img {
          width: 21px;
          height: 21px;
          object-fit: contain;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-button {
          height: 38px;
          padding: 0 15px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          font-size: 13px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(15px);
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }

        .nav-button:hover {
          color: white;
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .nav-button.primary {
          background: white;
          color: #050505;
          border-color: white;
        }

        .nav-button.primary:hover {
          background: #e9e9e9;
        }

        /* =========================
           CONTENT
        ========================= */

        .content {
          width: 100%;
          max-width: 720px;
          min-height: calc(100vh - 150px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          z-index: 3;
          padding: 70px 24px 110px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(15px);
          color: rgba(255, 255, 255, 0.65);
          font-size: 12px;
          margin-bottom: 25px;
          animation: fadeUp 0.7s ease both;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
        }

        h1 {
          margin: 0;
          font-size: clamp(54px, 8vw, 92px);
          line-height: 0.95;
          letter-spacing: -0.065em;
          font-weight: 700;
          animation: fadeUp 0.7s 0.08s ease both;
        }

        h1 span {
          color: rgba(255, 255, 255, 0.42);
        }

        .description {
          margin: 25px 0 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 15px;
          line-height: 1.65;
          animation: fadeUp 0.7s 0.16s ease both;
        }

        .download-area {
          width: 100%;
          max-width: 430px;
          margin-top: 34px;
          animation: fadeUp 0.7s 0.24s ease both;
        }

        .download-button {
          width: 100%;
          min-height: 70px;
          padding: 13px 17px;
          display: flex;
          align-items: center;
          gap: 13px;
          text-align: left;
          text-decoration: none;
          color: #050505;
          background: white;
          border-radius: 15px;
          border: 1px solid white;
          box-shadow:
            0 15px 60px rgba(0, 0, 0, 0.35),
            0 0 60px rgba(255, 255, 255, 0.04);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .download-button:hover {
          transform: translateY(-3px);
          box-shadow:
            0 20px 70px rgba(0, 0, 0, 0.45),
            0 0 70px rgba(255, 255, 255, 0.09);
        }

        .download-button > svg:first-child {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }

        .download-button span {
          flex: 1;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          font-weight: 650;
        }

        .download-button small {
          margin-top: 3px;
          font-size: 11px;
          font-weight: 400;
          opacity: 0.5;
        }

        .platforms {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
        }

        .platforms button {
          padding: 7px 11px;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: rgba(255, 255, 255, 0.35);
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .platforms button:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        .platforms button.active {
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.06);
        }

        .browser-link {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          color: rgba(255, 255, 255, 0.42);
          text-decoration: none;
          font-size: 12px;
          animation: fadeUp 0.7s 0.3s ease both;
          transition: color 0.2s ease;
        }

        .browser-link:hover {
          color: white;
        }

        .bottom-text {
          position: absolute;
          bottom: 20px;
          z-index: 3;
          color: rgba(255, 255, 255, 0.2);
          font-size: 10px;
        }

        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 70px;
          }
        }

        @keyframes glowFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(40px, -30px, 0);
          }
        }

        @keyframes orbFloatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(45px, -30px, 30px);
          }
        }

        @keyframes orbFloatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-30px, 35px, 20px);
          }
        }

        @keyframes orbFloatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(35px, -20px, 0);
          }
        }

        @keyframes ringSpin {
          from {
            transform: translate(-50%, -50%) rotateX(65deg) rotateZ(15deg);
          }

          to {
            transform: translate(-50%, -50%) rotateX(65deg) rotateZ(375deg);
          }
        }

        @keyframes ringSpinReverse {
          from {
            transform: translate(-50%, -50%) rotateX(65deg) rotateZ(-25deg);
          }

          to {
            transform: translate(-50%, -50%) rotateX(65deg) rotateZ(-385deg);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {
          .nav {
            padding: 18px 16px;
          }

          .brand span {
            display: none;
          }

          .nav-button {
            height: 35px;
            padding: 0 11px;
            font-size: 12px;
          }

          .content {
            min-height: calc(100vh - 100px);
            padding-top: 40px;
          }

          h1 {
            font-size: 57px;
          }

          .description {
            font-size: 14px;
          }

          .orb-one {
            left: -100px;
          }

          .ring-one {
            width: 400px;
            height: 400px;
          }

          .ring-two {
            width: 550px;
            height: 550px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}
