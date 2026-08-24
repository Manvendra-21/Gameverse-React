function FeatureCard({ icon, title, description, href }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <a href={href} target="_blank" rel="noopener noreferrer">
        <button>Open</button>
      </a>
    </div>
  );
}

export default FeatureCard;