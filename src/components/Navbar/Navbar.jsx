import { useEffect, useState } from "react";
import "./Navbar.css";

import {getCurrentUser,login,signup,logout,} from "../../utils/auth";

function Navbar() {
const [showAuth, setShowAuth] = useState(false);
const [mode, setMode] = useState("login");

const [userId, setUserId] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [loggedInUser, setLoggedInUser] = useState(
getCurrentUser
);

const [message, setMessage] = useState("");
const [error, setError] = useState(false);

// Synchronize login state with other components
useEffect(() => {
function updateUser() {
setLoggedInUser(getCurrentUser());
}

window.addEventListener(
  "gameverseAuthChange",
  updateUser
);

return () => {
  window.removeEventListener(
    "gameverseAuthChange",
    updateUser
  );
};


}, []);

function handleSubmit(e) {
e.preventDefault();

setMessage("");

let result;

if (mode === "signup") {
  if (password !== confirmPassword) {
    setError(true);
    setMessage("Passwords do not match.");
    return;
  }

  result = signup(userId, password);
} else {
  result = login(userId, password);
}

setError(!result.success);
setMessage(result.message);

if (result.success) {
  setLoggedInUser(getCurrentUser());

  setUserId("");
  setPassword("");
  setConfirmPassword("");

  setShowAuth(false);
  setMessage("");
}

}

function handleLogout() {
logout();

setLoggedInUser(null);
setMessage("");

}

function openAuth(selectedMode) {
setMode(selectedMode);
setMessage("");
setError(false);
setPassword("");
setConfirmPassword("");
setShowAuth(true);
}

return (
<> 
  <nav className="navbar"> 
  <div className="logo">Gameverse</div>

    <ul className="nav-links">
      <li><a href="/#home">Home</a></li>
      <li><a href="/#features">Features</a></li>
      <li><a href="/#services">Services</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>

    <div className="auth-section">
      {loggedInUser ? (
        <>
          <span className="welcome">
            Hi, {loggedInUser}!
          </span>

          <button
            className="nav-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="nav-button"
            onClick={() => openAuth("login")}
          >
            Login
          </button>

          <button
            className="nav-button"
            onClick={() => openAuth("signup")}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  </nav>

  {showAuth && (
    <div
      className="auth-overlay"
      onClick={() => setShowAuth(false)}
    >
      <div
        className="auth-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={() => setShowAuth(false)}
          type="button"
        >
          ×
        </button>

        <h2>
          {mode === "login"
            ? "Login to Gameverse"
            : "Create an Account"}
        </h2>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
              setError(false);
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setMessage("");
              setError(false);
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoComplete="username"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === "login"
                ? "current-password"
                : "new-password"
            }
            required
          />

          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="new-password"
              required
            />
          )}

          {message && (
            <p className={error ? "error" : "success"}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
          >
            {mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )}
</>

);
}

export default Navbar;
