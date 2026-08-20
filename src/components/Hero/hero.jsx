import "./hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-tag">WELCOME TO GAMVERSE</p>

        <h1>
          ENTER THE
          <span> GAMING UNIVERSE</span>
        </h1>

        <p className="hero-description">
          Discover amazing games, explore new adventures, and experience
          gaming like never before.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Explore Games</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>

      <div className="hero-image">
        <div className="game-controller">🎮</div>
        <div className="floating-text">LEVEL UP!</div>
      </div>
    </section>
  );
}

export default Hero;