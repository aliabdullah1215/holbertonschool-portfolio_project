import { Link } from 'react-router-dom';

function ClientHomePage() {
  return (
    <section className="client-home-page">
      <div className="client-home-hero">
        <h1>DataDiet</h1>
        <p>Build a nutrition plan that fits your body, goals, and daily routine.</p>

        <Link className="client-home-cta" to="/client/ai-plans">
          Generate your plan
        </Link>
      </div>
    </section>
  );
}

export default ClientHomePage;
