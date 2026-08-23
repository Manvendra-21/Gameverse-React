import "./services.css";

function Services() {
  const services = [
    {
      icon: "🎮",
      title: "Game Reviews",
      description:
        "Get useful information and reviews to help you discover your next game.",
    },
    {
      icon: "📰",
      title: "Gaming News",
      description:
        "Stay updated with the latest gaming news, releases, and industry updates.",
    },
    {
      icon: "🎯",
      title: "Game Recommendations",
      description:
        "Find games based on your interests and explore new gaming experiences.",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-heading">
        <p>OUR SERVICES</p>

        <h2>Level Up Your Gaming Experience</h2>

        <span>
          Explore our collection of services created for gaming enthusiasts.
        </span>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <button>Explore</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;