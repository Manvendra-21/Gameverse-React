import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser") || null
  );


  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[userId]) {
      if (users[userId] === password) {
        localStorage.setItem("loggedInUser", userId);
        setLoggedInUser(userId);
        setShowAuth(false);
        setUserId("");
        setPassword("");
      } else {
        alert("Wrong password.");
      }
    } else {
      users[userId] = password;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", userId);
      setLoggedInUser(userId);
      setShowAuth(false);
      setUserId("");
      setPassword("");
    }
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">Gameverse</div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="auth-section">
          {loggedInUser ? (
            <>
              <span className="welcome">Hi, {loggedInUser}!</span>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="nav-button" onClick={() => setShowAuth(true)}>
              Login
            </button>
          )}
        </div>
      </nav>

      {showAuth && (
        <div className="auth-overlay">
          <div className="auth-box">
            <button className="close-button" onClick={() => setShowAuth(false)}>
              x
            </button>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="auth-submit">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
