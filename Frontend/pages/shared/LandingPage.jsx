import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPos = window.scrollY + 130;
      const sections = [
        { id: 'for-doctors', name: 'for-doctors' },
        { id: 'features', name: 'features' },
        { id: 'how', name: 'how' },
      ];

      const current = sections.find((section) => {
        const el = document.getElementById(section.id);
        return el && el.offsetTop <= scrollPos && scrollPos < el.offsetTop + el.offsetHeight;
      });

      setActiveSection(current ? current.name : 'home');
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleStartClient = () => {
    navigate('/register');
  };

  const handleJoinDoctor = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page-wrapper">
      {/* ─── CUSTOM CSS STYLES ─── */}
      <style>{`
        :root {
          --green-deep: #1C5C2E;
          --green-mid: #2E8B57;
          --green-secondary: #4A7C59;
          --green-light: #6BAF7E;
          --bg-mint: #F0F7F1;
          --bg-offwhite: #F9F5F0;
          --white: #FFFFFF;
          --text-dark: #1C2B1E;
          --text-body: #3D5445;
          --text-secondary: #4A7C59;
          --border-light: #DFF0E5;
        }

        body {
          background: var(--green-deep);
        }

        .landing-page-wrapper {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: var(--bg-mint);
          color: var(--text-dark);
          font-size: 16px;
          line-height: 1.7;
          overflow-x: hidden;
          width: 100%;
          padding-top: 90px; /* Crucial: prevents Hero content from hiding under the fixed navbar */
        }

        /* ─── NAVBAR (FIXED STICKY POSITIONING) ─── */
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 16px 0;
          background: transparent;
          pointer-events: none; /* Allows scrolling interactions background items if needed */
        }

        .navbar {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 10px 10px 10px 20px;
          box-shadow: 0 4px 24px rgba(28,92,46,0.10), 0 1px 4px rgba(0,0,0,0.05);
          width: 780px;
          max-width: calc(100vw - 48px);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          pointer-events: auto; /* Re-enables interaction for buttons and links */
        }

        .navbar:hover {
          box-shadow: 0 6px 32px rgba(28,92,46,0.14), 0 2px 8px rgba(0,0,0,0.06);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }

               .nav-logo-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .nav-logo-text {
          font-size: 17px;
          font-weight: 700;
          color: var(--green-deep);
          letter-spacing: -0.3px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-body);
          font-size: 15px;
          font-weight: 500;
          padding: 7px 16px;
          border-radius: 100px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav-links a:hover { background: var(--bg-mint); color: var(--green-deep); }
        .nav-links a.active {
          background: var(--bg-mint);
          color: var(--green-deep);
          box-shadow: 0 10px 24px rgba(28,92,46,0.12);
          transform: translateY(-1px);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .btn-ghost {
          background: transparent;
          border: 1.5px solid var(--border-light);
          color: var(--green-secondary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 100px;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }

        .btn-ghost:hover {
          border-color: var(--green-mid);
          color: var(--green-mid);
          background: var(--bg-mint);
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 9px 20px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(46,139,87,0.35);
          opacity: 0.95;
        }

        /* ─── HERO ─── */
        .hero {
          background-color: var(--bg-mint);
          position: relative;
          overflow: hidden;
          padding: 40px 0 80px;
        }

        .hero-blobs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
        }

        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 13px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 100px;
          border: 1px solid rgba(46,139,87,0.20);
          margin-bottom: 28px;
          letter-spacing: 0.2px;
        }

        .hero-heading {
          font-size: clamp(38px, 3.6vw, 58px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: var(--green-deep);
          margin-bottom: 24px;
        }

        .hero-heading span { color: var(--green-mid); }

        .hero-subtext {
          font-size: 17px;
          line-height: 1.75;
          color: var(--text-body);
          margin-bottom: 40px;
          max-width: 480px;
        }

        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 15px 32px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(46,139,87,0.40);
        }

        .btn-hero-outline {
          background: white;
          color: var(--green-deep);
          border: 2px solid var(--border-light);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          padding: 15px 32px;
          border-radius: 100px;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-hero-outline:hover {
          border-color: var(--green-mid);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(28,92,46,0.10);
        }

        /* ─── HERO CARD ─── */
        .hero-card-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-floating-card {
          background: white;
          border-radius: 24px;
          padding: 28px;
          width: 380px;
          box-shadow: 0 20px 60px rgba(28,92,46,0.15), 0 4px 16px rgba(0,0,0,0.06);
          transform: rotate(1.5deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: relative;
        }

        .hero-floating-card:hover {
          transform: rotate(0deg) translateY(-4px);
          box-shadow: 0 30px 80px rgba(28,92,46,0.20), 0 8px 24px rgba(0,0,0,0.08);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .card-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .card-label-small {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 2px;
        }

        .card-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -0.3px;
        }

        .card-badge {
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid rgba(46,139,87,0.20);
        }

        .stats-row {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          width: 100%;
        }

        .stat-chip {
          background: var(--bg-mint);
          border-radius: 100px;
          padding: 8px 14px;
          flex: 1;
          text-align: center;
          border: 1px solid var(--border-light);
        }

        .stat-chip-value {
          font-size: 15px;
          font-weight: 800;
          color: var(--green-deep);
          display: block;
        }

        .stat-chip-label {
          font-size: 10px;
          font-weight: 500;
          color: var(--text-secondary);
          display: block;
          margin-top: -1px;
        }

        .card-divider {
          height: 1px;
          background: var(--border-light);
          margin: 16px 0;
        }

        .meal-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }

        .meal-icon-wrap {
          width: 40px;
          height: 40px;
          background: rgba(46,139,87,0.10);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .meal-icon-wrap i { color: var(--green-mid); font-size: 16px; }

        .meal-info { flex: 1; }

        .meal-time {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 2px;
        }

        .meal-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--green-deep);
        }

        .meal-tags {
          display: flex;
          gap: 5px;
          margin-top: 5px;
          flex-wrap: wrap;
        }

        .meal-tag {
          background: var(--bg-offwhite);
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 100px;
        }

        .action-chips {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .action-chip {
          background: var(--bg-mint);
          border: 1.5px solid var(--border-light);
          color: var(--green-secondary);
          font-size: 12px;
          font-weight: 600;
          padding: 7px 13px;
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .action-chip:hover {
          background: rgba(46,139,87,0.12);
          border-color: var(--green-mid);
          color: var(--green-deep);
        }

        /* mini float card */
        .mini-card {
          position: absolute;
          background: white;
          border-radius: 16px;
          padding: 12px 16px;
          box-shadow: 0 8px 32px rgba(28,92,46,0.14);
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255,255,255,0.8);
          top: -28px;
          right: -40px;
          animation: float1 4s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(0deg); }
        }

        .mini-icon {
          width: 34px;
          height: 34px;
          background: rgba(46,139,87,0.12);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mini-icon i { color: var(--green-mid); font-size: 14px; }
        .mini-text-primary { font-size: 13px; font-weight: 700; color: var(--green-deep); }
        .mini-text-secondary { font-size: 11px; color: var(--text-secondary); font-weight: 500; }

        /* ─── SECTION SHARED ─── */
        .section { padding: 100px 0; }
        .section-alt { background: var(--bg-offwhite); }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(46,139,87,0.08);
          color: var(--green-secondary);
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 20px;
          border: 1px solid rgba(46,139,87,0.15);
        }

        .section-heading {
          font-size: clamp(32px, 2.8vw, 46px);
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -1px;
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .section-sub {
          font-size: 17px;
          color: var(--text-body);
          max-width: 540px;
          line-height: 1.7;
        }

        .section-header { margin-bottom: 60px; }

        /* ─── HOW IT WORKS ─── */
        .how-wrapper { background: var(--white); }

        .steps-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          position: relative;
        }

        .steps-connector {
          position: absolute;
          top: 36px;
          left: 10%;
          right: 10%;
          height: 2px;
          background: repeating-linear-gradient(90deg, var(--green-light) 0, var(--green-light) 8px, transparent 8px, transparent 18px);
          z-index: 0;
        }

        .step-card {
          background: white;
          border-radius: 20px;
          padding: 28px 22px;
          text-align: center;
          position: relative;
          z-index: 1;
          border: 1.5px solid var(--border-light);
          margin: 0 8px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(28,92,46,0.12);
          border-color: rgba(46,139,87,0.30);
        }

        .step-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 18px;
          font-weight: 800;
          color: white;
          box-shadow: 0 4px 16px rgba(46,139,87,0.35);
        }

        .step-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--green-deep);
          margin-bottom: 8px;
          letter-spacing: -0.2px;
        }

        .step-desc {
          font-size: 13px;
          color: var(--text-body);
          line-height: 1.6;
        }

        /* ─── WHY CHOOSE ─── */
        .why-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .feature-card {
          background: white;
          border-radius: 20px;
          padding: 24px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          border: 1.5px solid var(--border-light);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(28,92,46,0.10);
          border-color: rgba(46,139,87,0.25);
        }

        .feature-icon-wrap {
          width: 48px;
          height: 48px;
          background: rgba(46,139,87,0.10);
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon-wrap i { font-size: 19px; color: var(--green-mid); }

        .feature-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--green-deep);
          margin-bottom: 6px;
          letter-spacing: -0.2px;
        }

        .feature-desc {
          font-size: 13px;
          color: var(--text-body);
          line-height: 1.65;
        }

        .credential-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
        }

        .credential-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-body);
          font-weight: 500;
        }

        .cred-check {
          width: 22px;
          height: 22px;
          background: rgba(46,139,87,0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--green-mid);
        }

        .cred-check i { color: var(--green-mid); font-size: 10px; }

        /* ─── FOR DOCTORS ─── */
        .for-doctors-section {
          padding: 100px 0;
          background: var(--bg-mint);
        }

        .doctors-card {
          background: linear-gradient(135deg, #D4EBD9 0%, #E8F5EC 60%, #F0F7F1 100%);
          border-radius: 32px;
          padding: 72px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          border: 1.5px solid rgba(46,139,87,0.15);
          position: relative;
          overflow: hidden;
        }

        .doctors-blob {
          position: absolute;
          right: -60px;
          top: -60px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(46,139,87,0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .doctors-blob-2 {
          position: absolute;
          left: 100px;
          bottom: -80px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(28,92,46,0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .doctors-left {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .doctors-right {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .doctors-heading {
          font-size: clamp(26px, 2.4vw, 38px);
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -0.8px;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .doctors-sub {
          font-size: 16px;
          color: var(--text-body);
          max-width: 520px;
          line-height: 1.7;
        }

        .btn-doctors {
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 36px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .btn-doctors:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(46,139,87,0.40);
        }

        /* ─── FOOTER ─── */
        .footer {
          background: var(--green-deep);
          padding: 60px 0 40px;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .footer-logo-text { font-size: 18px; font-weight: 700; color: white; }

        .footer-links { display: flex; gap: 24px; }

        .footer-links a {
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .footer-links a:hover { color: white; }

        .footer-contact {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .footer-contact:hover {
          color: white;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 28px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy { font-size: 13px; color: rgba(255,255,255,0.45); }
        .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.45); }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .navbar-wrapper { padding: 12px 0; }
          .hero-inner { grid-template-columns: 1fr; gap: 60px; }
          .hero-card-wrapper { justify-content: flex-start; }
          .steps-row { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .steps-connector { display: none; }
          .step-card { margin: 0; }
          .why-layout { grid-template-columns: 1fr; gap: 40px; }
          .doctors-card { flex-direction: column; gap: 40px; padding: 48px 40px; }
        }

        @media (max-width: 768px) {
          .container { padding: 0 24px; }
          .hero { padding: 40px 0 60px; }
          .section { padding: 72px 0; }
          .for-doctors-section { padding: 72px 0; }
          .hero-inner { gap: 48px; }
          .hero-floating-card { width: 100%; max-width: 380px; }
          .steps-row { grid-template-columns: 1fr 1fr; }
          .why-grid { grid-template-columns: 1fr; }
          .footer-inner { flex-direction: column; gap: 24px; text-align: center; }
          .footer-bottom { flex-direction: column; gap: 8px; }
          .navbar { width: calc(100vw - 32px); }
          .mini-card { display: none; }
        }

        @media (max-width: 480px) {
          .steps-row { grid-template-columns: 1fr; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas button { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <a href="#" className="nav-logo">
            <img
              src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png"
              alt="Data Diet"
              className="nav-logo-icon"
            />
            <span className="nav-logo-text">Data Diet</span>
          </a >
          <div className="nav-links">
            <a href="#" className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a href="#how" className={activeSection === 'how' ? 'active' : ''}>About</a>
            <a href="#features" className={activeSection === 'features' ? 'active' : ''}>Feature</a>
            <a href="#for-doctors" className={activeSection === 'for-doctors' ? 'active' : ''}>For Doctors</a>
          </div>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={handleSignIn}>Sign In</button>
            <button className="btn-primary" onClick={handleStartClient}>Get Started</button>
          </div>
        </nav >
      </div >

    {/* ─── HERO ─── */ }
     <section className="hero">
        <svg className="hero-blobs" viewBox="0 0 1728 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="180" cy="240" rx="280" ry="220" fill="rgba(46,139,87,0.06)" />
          <ellipse cx="1580" cy="160" rx="200" ry="160" fill="rgba(46,139,87,0.05)" />
          <ellipse cx="1400" cy="580" rx="260" ry="180" fill="rgba(28,92,46,0.05)" />
          <ellipse cx="320" cy="580" rx="180" ry="140" fill="rgba(46,139,87,0.04)" />
          <circle cx="860" cy="80" r="60" fill="rgba(46,139,87,0.04)" />
          <g opacity="0.35">
            <circle cx="80" cy="80" r="2.5" fill="#2E8B57" />
            <circle cx="120" cy="80" r="2.5" fill="#2E8B57" />
            <circle cx="160" cy="80" r="2.5" fill="#2E8B57" />
            <circle cx="80" cy="120" r="2.5" fill="#2E8B57" />
            <circle cx="120" cy="120" r="2.5" fill="#2E8B57" />
            <circle cx="160" cy="120" r="2.5" fill="#2E8B57" />
            <circle cx="80" cy="160" r="2.5" fill="#2E8B57" />
            <circle cx="120" cy="160" r="2.5" fill="#2E8B57" />
            <circle cx="160" cy="160" r="2.5" fill="#2E8B57" />
            <circle cx="1580" cy="380" r="2.5" fill="#2E8B57" />
            <circle cx="1620" cy="380" r="2.5" fill="#2E8B57" />
            <circle cx="1660" cy="380" r="2.5" fill="#2E8B57" />
            <circle cx="1580" cy="420" r="2.5" fill="#2E8B57" />
            <circle cx="1620" cy="420" r="2.5" fill="#2E8B57" />
            <circle cx="1660" cy="420" r="2.5" fill="#2E8B57" />
            <circle cx="1580" cy="460" r="2.5" fill="#2E8B57" />
            <circle cx="1620" cy="460" r="2.5" fill="#2E8B57" />
            <circle cx="1660" cy="460" r="2.5" fill="#2E8B57" />
          </g>
        </svg>

        <div className="container">
          <div className="hero-inner">
            {/* Left */}
            <div className="hero-left">
              <div className="hero-label">
                <i className="fas fa-sparkles" style={{ marginRight: '0px' }}></i>
                AI nutrition planning with expert support
              </div>
              <h1 className="hero-heading">
                Build a nutrition plan<br />
                that fits <span>real life.</span>
              </h1>
              <p className="hero-subtext">
                Data Diet helps clients generate personalized AI meal plans, save them, and connect with nutritionists when support is needed.
              </p>
              <div className="hero-ctas">
                <button className="btn-hero-primary" onClick={handleStartClient}>
                  <i className="fas fa-user"></i>
                  Start as Client
                </button>
                <button className="btn-hero-outline" onClick={handleJoinDoctor}>
                  <i className="fas fa-stethoscope"></i>
                  Join as Doctor
                </button>
              </div>
            </div>

            {/* Right ── Floating UI Card */}
            <div className="hero-card-wrapper">
              <div className="mini-card">
                <div className="mini-icon">
                  <i className="fas fa-fire-flame-curved"></i>
                </div>
                <div>
                  <div className="mini-text-primary">1,850 kcal</div>
                  <div className="mini-text-secondary">Daily target</div>
                </div>
              </div>

              <div className="hero-floating-card">
                <div className="card-header">
                  <div className="card-title-group">
                    <span className="card-label-small">Plan Summary</span>
                    <span className="card-title">Weight Loss Plan</span>
                  </div>
                  <span className="card-badge">Active</span>
                </div>

                <div className="stats-row">
                  <div className="stat-chip">
                    <span className="stat-chip-value">1,850</span>
                    <span className="stat-chip-label">Calories</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-value">135g</span>
                    <span className="stat-chip-label">Protein</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-value">4/day</span>
                    <span className="stat-chip-label">Meals</span>
                  </div>
                </div>

                <div className="card-divider"></div>

                <div className="meal-row">
                  <div className="meal-icon-wrap">
                    <i className="fas fa-bowl-food"></i>
                  </div>
                  <div className="meal-info">
                    <div className="meal-time">Breakfast</div>
                    <div className="meal-name">Greek yogurt bowl</div>
                    <div className="meal-tags">
                      <span className="meal-tag">Quick</span>
                      <span className="meal-tag">High protein</span>
                      <span className="meal-tag">Budget friendly</span>
                    </div>
                  </div>
                </div>

                <div className="action-chips">
                  <div className="action-chip">
                    <i className="fas fa-shuffle"></i>
                    Replace meal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

    {/* ─── HOW IT WORKS ─── */ }
    <section className="section how-wrapper" id="how">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="section-label">
              <i className="fas fa-arrow-right"></i>
              Simple flow
            </span>
          </div>
          <h2 className="section-heading" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 16px' }}>How Data Diet works</h2>
          <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center' }}>From intake to saved plans and medical support, the experience stays guided.</p>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="steps-connector"></div>
          <div className="steps-row">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-title">Choose your role</div>
              <p className="step-desc">Sign up as a client ready to eat better, or as a nutritionist ready to support others.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-title">Complete your intake</div>
              <p className="step-desc">Answer a few friendly questions about your goals, lifestyle, and dietary preferences.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-title">Generate your plan</div>
              <p className="step-desc">AI creates a personalized, calorie-aware meal plan tailored just for you ── instantly.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-title">Adjust with ease</div>
              <p className="step-desc">Swap meals, change portions, or regenerate a day. Your plan bends to fit your schedule.</p>
            </div>
            <div className="step-card">
              <div className="step-number">5</div>
              <div className="step-title">Find expert support</div>
              <p className="step-desc">Browse verified nutritionists and request a review whenever you want a human perspective.</p>
            </div>
          </div>
        </div>
      </div>
      </section >

    {/* ─── WHY CHOOSE ─── */ }
    < section id = "features" className = "section section-alt" >
      <div className="container">
        <div className="why-layout">
          <div className="why-left">
            <span className="section-label">
              <i className="fas fa-star"></i>
              Why choose Data Diet?
            </span>
            <h2 className="section-heading">AI plans that stay useful after generation.</h2>
            <p className="section-sub">The platform is designed around practical nutrition, flexible habits, and human support ── so your plan actually gets followed.</p>

            <div className="credential-list">
              <div className="credential-item">
                <div className="cred-check"><i className="fas fa-check"></i></div>
                Personalized to your specific health goals
              </div>
              <div className="credential-item">
                <div className="cred-check"><i className="fas fa-check"></i></div>
                Editable at any point ── no locked plans
              </div>
              <div className="credential-item">
                <div className="cred-check"><i className="fas fa-check"></i></div>
                Backed by verified nutrition professionals
              </div>
            </div>
          </div>

          <div className="why-right">
            <div className="why-grid">
              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <div>
                  <div className="feature-title">Personalized nutrition</div>
                  <p className="feature-desc">Every plan is generated based on your intake data ── not a one-size-fits-all template.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div>
                  <div className="feature-title">Clear plan history</div>
                  <p className="feature-desc">Save and revisit previous meal plans. Track how your nutrition evolves over time.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <i className="fas fa-list-check"></i>
                </div>
                <div>
                  <div className="feature-title">Practical meal details</div>
                  <p className="feature-desc">Each meal shows prep time, cost level, and nutritional tags so you can plan ahead.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <i className="fas fa-pencil"></i>
                </div>
                <div>
                  <div className="feature-title">Meal edits anytime</div>
                  <p className="feature-desc">Replace, regenerate, or adjust any meal with a single tap ── it stays flexible.</p>
                </div>
              </div>

              <div className="feature-card" style={{ gridColumn: '1 / -1' }}>
                <div className="feature-icon-wrap">
                  <i className="fas fa-id-badge"></i>
                </div>
                <div>
                  <div className="feature-title">Doctor verification</div>
                  <p className="feature-desc">All nutritionists are reviewed before they appear on the platform ── so you always connect with verified, credentialed professionals you can trust.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section >

    {/* ─── FOR DOCTORS ─── */ }
    < section id = "for-doctors" className = "for-doctors-section" >
      <div className="container">
        <div className="doctors-card">
          <div className="doctors-blob"></div>
          <div className="doctors-blob-2"></div>

          <div className="doctors-left">
            <span className="section-label" style={{ marginBottom: '20px' }}>
              <i className="fas fa-stethoscope"></i>
              For doctors
            </span>
            <h2 className="doctors-heading">Apply, get reviewed, and appear to clients after approval.</h2>
            <p className="doctors-sub">Submit your credentials, specialty, and professional background. Our team reviews every application to ensure clients connect only with qualified nutrition professionals.</p>

            <div className="credential-list" style={{ marginTop: '28px' }}>
              <div className="credential-item">
                <div className="cred-check"><i className="fas fa-check"></i></div>
                Submit credentials and license details
              </div>
              <div className="credential-item">
                <div className="cred-check"><i className="fas fa-check"></i></div>
                Get reviewed by our professional team
              </div>
              <div className="credential-item">
                <div className="cred-check"><i className="fas fa-check"></i></div>
                Appear on client-facing discovery pages
              </div>
            </div>
          </div>

          <div className="doctors-right">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(46,139,87,0.15), rgba(28,92,46,0.1))',
                border: '4px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 32px rgba(28,92,46,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img src="https://www.image2url.com/r2/default/images/1779593249007-16b19107-c405-4c8a-a9b7-1933c79523c9.png" alt="Doctor" width="180" height="180" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button className="btn-doctors" onClick={handleJoinDoctor}>
                <i className="fas fa-user-plus"></i>
                Register as Doctor
              </button>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '200px', lineHeight: '1.6' }}>Applications are typically reviewed within 2–3 business days.</p>
            </div>
          </div>
        </div>
      </div>
      </section >

    {/* ─── FOOTER ─── */ }
    < footer className = "footer" >
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
              <img
                src="https://www.image2url.com/r2/default/images/1779771082419-77f45caf-4ccd-438f-95c7-0caabce26494.png"
                alt="Data Diet"
                className="footer-logo-icon"
              />
              <span className="footer-logo-text">Data Diet</span>
            </div>
            <div className="footer-links">
              <a href="#">Home</a>
              <a href="#how">About</a>
              <Link to="/client/contact">Contact Us</Link>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Data Diet. All rights reserved.</span>
            <span className="footer-tagline">
              Built with care for healthier lives 🌱
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}