import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>🎮 Gamverse</h2>

          <p>
            Your gateway to the gaming universe. Discover games,
            connect with gamers, and level up your experience.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>

        <div className="social-links">
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            💬
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            📷
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            ▶️
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            𝕏
          </a>
          
        </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} Gamverse. All rights reserved.
        </p>

        <p>Made with ❤️ for gamers.</p>
      </div>
    </footer>
  );
}

export default Footer;