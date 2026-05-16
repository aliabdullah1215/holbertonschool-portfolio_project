const teamMembers = [
  {
    name: 'Ali Summan',
    role: 'Frontend Developer',
  },
  {
    name: 'Mohammed Basuliman',
    role: 'Backend Developer',
  },
  {
    name: 'Omar Alanzi',
    role: 'Frontend Developer',
  },
  {
    name: 'Hussam Almutairi',
    role: 'AI Engineer',
  },
];

function ClientTeamPage() {
  return (
    <section className="client-team-page">
      <div className="client-team-header">
        <h1>Meet Our Team</h1>
        <p>
          We are a passionate team dedicated to building smarter nutrition planning
          experiences.
        </p>
      </div>

      <div className="client-team-grid">
        {teamMembers.map((member) => (
          <article className="client-team-card" key={member.name}>
            <h2>{member.name}</h2>
            <p>{member.role}</p>

            <div className="client-team-links">
              <span>in</span>
              <span>GitHub</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ClientTeamPage;
