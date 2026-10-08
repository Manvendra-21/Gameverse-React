import "./features.css";
import FeatureCard from "./featurecard";
import { useNavigate } from "react-router-dom";


function Features() {

  const navigate = useNavigate();
  const features = [
    {
      icon: "🎮",
      title: "Game Discovery",
      description:
        "Discover exciting games and explore new gaming experiences.",
      onClick: () => navigate("/games"),
    },
    {
      icon: "🏆",
      title: "Achievements",
      description:
        "Track your progress, complete challenges, and unlock achievements.",
    },
    {
      icon: "👥",
      title: "Gaming Community",
      description:
        "Connect with other gamers and share your gaming experiences.",
      href: "https://discord.com/invite/valorant"
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features-heading">
        <p>WHAT WE OFFER</p>

        <h2>Explore Gamverse Features</h2>

        <span>
          Everything you need to discover, experience, and enjoy gaming.
        </span>
      </div>

      <div className="features-container">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            href={feature.href}
            onClick={feature.onClick}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;