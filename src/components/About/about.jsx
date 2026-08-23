import "./about.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-image">
        <div className="about-circle">
          🎮
        </div>

        <div className="about-badge">
          <strong>100+</strong>
          <span>Gaming Experiences</span>
        </div>
      </div>

      <div className="about-content">
        <p className="about-tag">ABOUT GAMVERSE</p>

        <h2>
          Your Gateway to the
          <span> Gaming World</span>
        </h2>

        <p>
          Gamverse is a gaming-focused platform created to bring gamers
          together and help them discover exciting gaming experiences.
        </p>

        <p>
          From discovering new games to exploring gaming news and
          recommendations, Gamverse is designed to make your gaming journey
          more enjoyable.
        </p>

        <div className="about-stats">
          <div>
            <strong>100+</strong>
            <span>Games</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Reviews</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Community</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;