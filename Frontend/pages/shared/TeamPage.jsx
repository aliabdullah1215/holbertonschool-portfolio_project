const teamMembers = [
  {
    name: 'Ali Summan',
    role: 'Project Manager',
    linkedin: 'https://www.linkedin.com/in/ali-summan-9a39102aa/',
    github: 'https://github.com/aliabdullah1215',
  },
  {
    name: 'Mohammed Basuliman',
    role: 'Backend Developer',
    linkedin: 'https://www.linkedin.com/in/mohammed-basuliman-0a687a333/',
    github: 'https://github.com/oDoDyK',
  },
  {
    name: 'Omar Alanzi',
    role: 'Frontend Developer',
    linkedin: 'https://www.linkedin.com/in/omar-alanzi-6138062b7/',
    github: 'https://github.com/omar-hail',
  },
  {
    name: 'Hussam Almutairi',
    role: 'Backend Developer',
    linkedin: 'https://www.linkedin.com/in/hussam-alshalahi-9066b5272/',
    github: 'https://github.com/AoximL',
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
              <a href={member.linkedin} target="_blank" rel="noreferrer">
                in
              </a>

              <a href={member.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}

export default ClientTeamPage;
