import { Link } from 'react-router-dom';

function DoctorHomePage() {
  return (
    <section className="doctor-home-page">
      <div className="client-home-hero">
        <h1>Data Diet</h1>
        <p>
          Join our trusted network of nutrition specialists and support clients
          with professional guidance.
        </p>

        <div className="client-home-actions">
          <Link className="client-home-cta" to="/doctor/join">
           Join Our Medical Team
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DoctorHomePage;
