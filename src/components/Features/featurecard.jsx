function FeatureCard({
  icon,
  title,
  description,
  href,
  onClick
}) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {onClick ? (
        <button onClick={onClick}>
          Open
        </button>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Dive In</button>
        </a>
      )}

    </div>
  );
}

export default FeatureCard;