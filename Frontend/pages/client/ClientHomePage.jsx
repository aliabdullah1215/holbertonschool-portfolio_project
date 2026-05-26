import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ClientHomePage() {
  // Simple state to let the client check off daily tracking items right on the dashboard card
  const [completedMeals, setCompletedMeals] = useState({
    breakfast: true,
    lunch: false,
    dinner: false,
    snack: false,
  });

  const toggleMeal = (mealKey) => {
    setCompletedMeals(prev => ({ ...prev, [mealKey]: !prev[mealKey] }));
  };

  return (
    <div className="client-page-wrapper">
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

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--bg-mint);
        }

        .client-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background: var(--bg-mint);
          overflow-x: hidden;
          padding-top: 40px;
          position: relative;
        }

        /* =========================
           HERO
        ========================= */

        .hero {
          position: relative;
          overflow: hidden;
          padding: 40px 0 80px;
        }

        .hero-blobs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
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
          z-index: 2;
        }

        /* LEFT */

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(46,139,87,0.20);
          margin-bottom: 28px;
        }

        .hero-heading {
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: var(--green-deep);
          margin-bottom: 26px;
        }

        .hero-heading span {
          color: var(--green-mid);
        }

        .hero-subtext {
          max-width: 560px;
          font-size: 18px;
          line-height: 1.8;
          color: var(--text-body);
          margin-bottom: 40px;
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
          color: white;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 34px;
          border-radius: 999px;
          cursor: pointer;
          transition: 0.25s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          box-shadow: 0 10px 28px rgba(46,139,87,0.25);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
        }

        .btn-secondary {
          background: white;
          border: 2px solid var(--border-light);
          color: var(--green-deep);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 34px;
          border-radius: 999px;
          text-decoration: none;
          transition: 0.25s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          border-color: var(--green-mid);
          box-shadow: 0 8px 24px rgba(28,92,46,0.10);
        }

        /* =========================
           DASHBOARD CARD
        ========================= */

        .hero-card-wrapper {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .dashboard-card {
          width: 440px;
          max-width: 100%;
          background: white;
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 24px 70px rgba(28,92,46,0.15), 0 4px 14px rgba(0,0,0,0.05);
          position: relative;
          transform: rotate(0deg); 
          transition: 0.35s ease;
        }

        /* Card completely non-moving on cursor hover */
        .dashboard-card:hover {
          transform: rotate(0deg);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .card-title-small {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--green-deep);
        }

        .card-badge {
          background: rgba(46,139,87,0.10);
          color: var(--green-mid);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 999px;
        }

        /* MACROS SECTION */
        .macros-container {
          margin-bottom: 22px;
        }
        
        .macro-bar-group {
          margin-bottom: 10px;
        }

        .macro-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 4px;
        }

        .macro-label-row span:last-child {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .macro-progress-bg {
          width: 100%;
          height: 8px;
          background: #EBF4EE;
          border-radius: 999px;
          overflow: hidden;
        }

        .macro-progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.4s ease;
        }

        .divider {
          height: 1px;
          background: var(--border-light);
          margin-bottom: 18px;
        }

        /* DAILY LOG CHECKBOX LIST */
        .daily-checker-title {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--green-deep);
          margin-bottom: 12px;
        }

        .meal-check-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 22px;
        }

        .meal-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-mint);
          padding: 10px 14px;
          border-radius: 14px;
          cursor: pointer;
          user-select: none;
          transition: 0.2s ease;
          border: 1px solid transparent;
        }

        .meal-check-item:hover {
          background: #E4F2E7;
        }

        .meal-check-item.completed {
          background: rgba(46,139,87,0.08);
          border-color: rgba(46,139,87,0.15);
        }

        .checkbox-custom {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          border: 2px solid var(--green-light);
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          font-size: 10px;
          color: white;
          transition: 0.15s ease;
        }

        .meal-check-item.completed .checkbox-custom {
          background: var(--green-mid);
          border-color: var(--green-mid);
        }

        .meal-check-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--green-deep);
        }

        .meal-check-item.completed .meal-check-label {
          text-decoration: line-through;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        /* FOOTER ACTIONS */
        .card-actions-row {
          display: flex;
          gap: 12px;
        }

        .action-link-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--bg-mint);
          border: 1px solid var(--border-light);
          padding: 12px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          color: var(--green-deep);
          text-decoration: none;
          transition: 0.25s ease;
        }

        .action-link-btn:hover {
          background: white;
          border-color: var(--green-mid);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(28,92,46,0.05);
        }

        /* =========================
           FOOTER
        ========================= */

        .footer {
          background: var(--green-deep);
          padding: 50px 0 30px;
          margin-top: 40px;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-icon {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-logo-icon i {
          color: white;
        }

        .footer-logo-text {
          color: white;
          font-size: 18px;
          font-weight: 800;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.70);
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 24px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy,
        .footer-tagline {
          color: rgba(255,255,255,0.50);
          font-size: 13px;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .hero-card-wrapper {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 24px;
          }
          .footer-inner,
          .footer-bottom {
            flex-direction: column;
            gap: 18px;
            text-align: center;
          }
          .hero-heading {
            font-size: 48px;
          }
        }

        @media (max-width: 480px) {
          .hero-ctas {
            flex-direction: column;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
          .hero-heading {
            font-size: 40px;
          }
          .meal-check-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero">
        <svg
          className="hero-blobs"
          viewBox="0 0 1728 700"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="180" cy="240" rx="280" ry="220" fill="rgba(46,139,87,0.06)" />
          <ellipse cx="1580" cy="160" rx="200" ry="160" fill="rgba(46,139,87,0.05)" />
          <ellipse cx="1400" cy="580" rx="260" ry="180" fill="rgba(28,92,46,0.05)" />
        </svg>

        <div className="container">
          <div className="hero-inner">

            {/* LEFT CONTAINER */}
            <div>
              <div className="hero-label">
                <i className="fas fa-sparkles"></i>
                Your personalized nutrition workspace
              </div>

              <h1 className="hero-heading">
                Welcome to <span>DataDiet.</span>
              </h1>

              <p className="hero-subtext">
                Generate smarter meal plans, track your
                nutrition journey, and connect with verified
                nutrition specialists whenever you need
                expert guidance.
              </p>

              <div className="hero-ctas">
                <Link to="/client/ai-plans" className="btn-primary">
                  <i className="fas fa-wand-magic-sparkles"></i>
                  Generate Plan
                </Link>

                <Link to="/client/medical-support" className="btn-secondary">
                  <i className="fas fa-user-doctor"></i>
                  Medical Support
                </Link>
              </div>
            </div>

            {/* RIGHT CONTAINER */}
            <div className="hero-card-wrapper">
              <div className="dashboard-card">
                <div className="card-header">
                  <div>
                    <div className="card-title-small">Today's Progress</div>
                    <div className="card-title">Nutrition Tracker</div>
                  </div>
                  <div className="card-badge">Active Plan</div>
                </div>

                {/* MACRO PROGRESS BARS */}
                <div className="macros-container">
                  <div className="macro-bar-group">
                    <div className="macro-label-row">
                      <span>Protein</span>
                      <span>95g / 135g</span>
                    </div>
                    <div className="macro-progress-bg">
                      <div className="macro-progress-fill" style={{ width: '70%', background: '#2E8B57' }}></div>
                    </div>
                  </div>

                  <div className="macro-bar-group">
                    <div className="macro-label-row">
                      <span>Carbohydrates</span>
                      <span>160g / 210g</span>
                    </div>
                    <div className="macro-progress-bg">
                      <div className="macro-progress-fill" style={{ width: '76%', background: '#6BAF7E' }}></div>
                    </div>
                  </div>

                  <div className="macro-bar-group">
                    <div className="macro-label-row">
                      <span>Fats</span>
                      <span>42g / 65g</span>
                    </div>
                    <div className="macro-progress-bg">
                      <div className="macro-progress-fill" style={{ width: '64%', background: '#4A7C59' }}></div>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                {/* MEAL STATUS CHECKLIST */}
                <div className="daily-checker-title">Meal Checklist</div>
                <div className="meal-check-list">
                  <div 
                    className={`meal-check-item ${completedMeals.breakfast ? 'completed' : ''}`}
                    onClick={() => toggleMeal('breakfast')}
                  >
                    <div className="checkbox-custom">
                      {completedMeals.breakfast && <i className="fas fa-check"></i>}
                    </div>
                    <span className="meal-check-label">Breakfast</span>
                  </div>

                  <div 
                    className={`meal-check-item ${completedMeals.lunch ? 'completed' : ''}`}
                    onClick={() => toggleMeal('lunch')}
                  >
                    <div className="checkbox-custom">
                      {completedMeals.lunch && <i className="fas fa-check"></i>}
                    </div>
                    <span className="meal-check-label">Lunch</span>
                  </div>

                  <div 
                    className={`meal-check-item ${completedMeals.dinner ? 'completed' : ''}`}
                    onClick={() => toggleMeal('dinner')}
                  >
                    <div className="checkbox-custom">
                      {completedMeals.dinner && <i className="fas fa-check"></i>}
                    </div>
                    <span className="meal-check-label">Dinner</span>
                  </div>

                  <div 
                    className={`meal-check-item ${completedMeals.snack ? 'completed' : ''}`}
                    onClick={() => toggleMeal('snack')}
                  >
                    <div className="checkbox-custom">
                      {completedMeals.snack && <i className="fas fa-check"></i>}
                    </div>
                    <span className="meal-check-label">Snacks</span>
                  </div>
                </div>

                {/* PERFECTLY MATCHED ROUTE ACTIONS */}
                <div className="card-actions-row">
                  <Link to="/client/plans-history" className="action-link-btn">
                    <i className="fas fa-folder-open"></i>
                    Recent Plans
                  </Link>
                  <Link to="/client/assessment-tools" className="action-link-btn">
                    <i className="fas fa-chart-simple"></i>
                    Assessment Tools
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <div className="footer-logo-text">DataDiet</div>
            </div>

            <div className="footer-links">
              <Link to="/client/home">Dashboard</Link>
              <Link to="/client/ai-plans">AI Plans</Link>
              <Link to="/client/contact">Contact</Link>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 DataDiet. All rights reserved.</div>
            <div className="footer-tagline">Built with care for healthier lives 🌱</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
