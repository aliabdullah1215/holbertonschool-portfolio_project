import { Link } from 'react-router-dom';

function ClientHomePage() {
  return (
    <section className="client-home-page">
      <div className="client-home-hero">
        <h1>DataDiet</h1>
        <p>
          Create your personalized nutrition plan, and connect with nutrition
          specialists for professional support.
        </p>


        <div className="client-home-actions">
          <Link className="client-home-cta" to="/client/ai-plans">
            Generate your plan
          </Link>

          <Link className="client-home-cta" to="/client/medical-support">
            Medical support
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ClientHomePage;
