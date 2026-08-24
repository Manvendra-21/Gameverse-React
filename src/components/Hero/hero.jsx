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
        </div>
      </div>

      <div className="hero-image">
        <button  onClick={() => window.open("https://dinogameonline.io/", "_blank")} className="game-button">
          <div className="game-controller">🎮</div>
          <div className="floating-text">CLICK TO PLAY !</div>
        </button>
      </div>
    </section>
  );
}

export default Hero;