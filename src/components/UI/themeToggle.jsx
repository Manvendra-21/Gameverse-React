import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("gamverse-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.body.classList.add("light-theme");
    }
  }, []);

  function toggleTheme() {
    setDarkMode((previousMode) => {
      const newMode = !previousMode;

      if (newMode) {
        document.body.classList.remove("light-theme");
        localStorage.setItem("gamverse-theme", "dark");
      } else {
        document.body.classList.add("light-theme");
        localStorage.setItem("gamverse-theme", "light");
      }

      return newMode;
    });
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;