import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((previousState) => !previousState);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        🎮 Gamverse
      </div>

      <button
        className="menu-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
        <li>
          <a href="#home" onClick={closeMenu}>Home</a>
        </li>

        <li>
          <a href="#features" onClick={closeMenu}>Features</a>
        </li>

        <li>
          <a href="#services" onClick={closeMenu}>Services</a>
        </li>

        <li>
          <a href="#about" onClick={closeMenu}>About</a>
        </li>

        <li>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </li>
      </ul>

      <button className="nav-button">
        Login
      </button>
    </nav>
  );
}

export default Navbar;