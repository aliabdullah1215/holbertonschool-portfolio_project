import React from 'react';

function DoctorContactPage() {
  return (
    <article className="workspace-card workspace-card--section contact-page doctor-contact-page">
      {/* ─── CUSTOM EMBEDDED CSS ─── */}
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

        .doctor-contact-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          /* subtle off-white card background to match site */
          background-color: var(--bg-offwhite);
          color: var(--text-dark);
          padding: 60px 40px;
          border-radius: 24px;
          border: 1.5px solid var(--border-light);
          /* gentle green-tinted shadow consistent with brand */
          box-shadow: 0 10px 40px rgba(46,139,87,0.06);
          max-width: 1040px;
          margin: 40px auto;
          width: 100%;
        }

        /* ─── HEADER SECTION ─── */
        .contact-page__header {
          text-align: center;
          margin-bottom: 50px;
        }

        .contact-page__header h2 {
          font-size: clamp(28px, 2.5vw, 36px);
          font-weight: 800;
          color: var(--green-deep);
          letter-spacing: -0.8px;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .contact-page__header p {
          font-size: 16px;
          color: var(--text-body);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ─── CONTACT CARDS GRID ─── */
        .contact-methods {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .contact-method-card {
          /* white cards with light border for clear contrast */
          background: var(--white);
          border: 1.5px solid var(--border-light);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        /* Ensure readable dark text for primary contact page body text
           allow headings and CTAs to keep their brand colors */
        .doctor-contact-page,
        .doctor-contact-page p,
        .doctor-contact-page .contact-method-card,
        .doctor-contact-page .contact-method-card p {
          color: var(--text-dark) !important;
        }

        .contact-method-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 46px rgba(46,139,87,0.10);
          border-color: rgba(46, 139, 87, 0.20);
        }

        /* Card Icons styling */
        .contact-card-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 22px;
          box-shadow: 0 6px 18px rgba(46,139,87,0.08);
        }

        /* Individual brand colors matched beautifully */
        .contact-method-card:nth-child(1) .contact-card-icon {
          background: rgba(46, 139, 87, 0.12);
          color: var(--green-mid);
        }
        .contact-method-card:nth-child(2) .contact-card-icon {
          background: rgba(28, 92, 46, 0.1);
          color: var(--green-deep);
        }
        .contact-method-card:nth-child(3) .contact-card-icon {
          background: rgba(37, 211, 102, 0.12);
          color: #20BA56;
        }

        .contact-method-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--green-deep);
          margin-bottom: 8px;
          letter-spacing: -0.2px;
        }

        .contact-method-card p {
          font-size: 14px;
          color: var(--text-body);
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1; /* Pushes the CTA link button neatly to the bottom */
        }

        /* ─── CONTACT BUTTON LINKS ─── */
        .contact-method-card a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 12px 20px;
          border-radius: 100px;
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* Link buttons styling variants */
        .contact-method-card:nth-child(1) a {
          background: white;
          color: var(--green-deep);
          border: 1.5px solid var(--border-light);
        }
        .contact-method-card:nth-child(1) a:hover {
          border-color: var(--green-mid);
          box-shadow: 0 4px 12px rgba(28, 92, 46, 0.05);
        }

        .contact-method-card:nth-child(2) a {
          background: white;
          color: var(--green-deep);
          border: 1.5px solid var(--border-light);
        }
        .contact-method-card:nth-child(2) a:hover {
          border-color: var(--green-mid);
          box-shadow: 0 4px 12px rgba(28, 92, 46, 0.05);
        }

        /* Special WhatsApp Accent color button */
        .contact-method-card:nth-child(3) a {
          background: var(--green-mid);
          color: white;
          border: none;
        }
        .contact-method-card:nth-child(3) a:hover {
          background: var(--green-deep);
          box-shadow: 0 8px 22px rgba(37, 211, 102, 0.14);
          transform: translateY(-1px);
        }

        /* ─── RESPONSIVE BREAKPOINTS ─── */
        @media (max-width: 900px) {
          .contact-methods {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .doctor-contact-page {
            padding: 40px 24px;
            margin: 20px auto;
          }
          .contact-method-card {
            padding: 28px 20px;
          }
        }
      `}</style>

      {/* ─── MAIN HEADER ─── */}
      <div className="contact-page__header">
        <h2>Contact our support team</h2>
        <p>Our dedicated support team is here to assist you with any inquiries, platform questions, or guidance you may need.</p>
      </div>

      {/* ─── CHANNELS GRID ─── */}
      <div className="contact-methods">
        {/* Email Card */}
        <section className="contact-method-card">
          <div className="contact-card-icon">
            <i className="far fa-envelope"></i>
          </div>
          <h3>Email Support</h3>
          <p>Reach out for profile verification updates, licensing uploads, and technical documentation support.</p>
          <a href="mailto:doctors@datadiet.app">
            <i className="fas fa-paper-plane" style={{ fontSize: '12px' }}></i>
            doctors@datadiet.app
          </a>
        </section>

        {/* Phone Card */}
        <section className="contact-method-card">
          <div className="contact-card-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <h3>Phone Line</h3>
          <p>Direct priority helpline access for urgent clinical onboarding questions or account status inquiries.</p>
          <a href="tel:+966550000000">
            <i className="fas fa-headset" style={{ fontSize: '13px' }}></i>
            +966 55 000 0000
          </a>
        </section>

        {/* WhatsApp Card */}
        <section className="contact-method-card">
          <div className="contact-card-icon">
            <i className="fab fa-whatsapp"></i>
          </div>
          <h3>WhatsApp Help</h3>
          <p>Instant support channel for quick answers, simple data adjustments, and chat inquiries with support teams.</p>
          <a href="https://wa.me/966550000000" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp" style={{ fontSize: '15px' }}></i>
            Chat On WhatsApp
          </a>
        </section>
      </div>
    </article>
  );
}

export default DoctorContactPage;
