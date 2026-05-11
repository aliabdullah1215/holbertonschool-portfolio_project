function DoctorAboutPage() {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">Doctor Journey</span>
      <h2>About the Platform</h2>
      <p>
        Data Diet helps connect digital nutrition guidance with real professional support,
        giving doctors a structured place to present their expertise.
      </p>

      <div className="content-grid">
        <section className="content-card">
          <h3>Your role</h3>
          <p>
            Approved doctors are displayed in the client medical support section so users
            can reach out for consultations using the contact information you provide.
          </p>
        </section>
        <section className="content-card">
          <h3>Why approval matters</h3>
          <p>
            The review step helps protect platform quality and ensures that client-facing
            profiles are trustworthy and professionally relevant.
          </p>
        </section>
        <section className="content-card">
          <h3>What comes later</h3>
          <p>
            As the product grows, doctors can become a stronger part of the support layer
            around personalized digital nutrition services.
          </p>
        </section>
      </div>
    </article>
  );
}

export default DoctorAboutPage;
