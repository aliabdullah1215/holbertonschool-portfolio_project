function DashboardSectionPage({ eyebrow, title, description, notes = [] }) {
  return (
    <article className="workspace-card workspace-card--section">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>

      {notes.length ? (
        <div className="section-note-list">
          {notes.map((note) => (
            <div key={note.title} className="section-note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default DashboardSectionPage;
