import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/hero.jsx";
import Features from "./components/Features/features.jsx";
import Services from "./components/Services/services.jsx";
import About from "./components/About/about.jsx";
import Contact from "./components/Contact/contact.jsx";
import Footer from "./components/Footer/footer.jsx";
import ThemeToggle from "./components/UI/themeToggle.jsx";
import { Routes, Route } from "react-router-dom";
import GameDiscovery from "./components/GameDiscovery/GameDiscovery.jsx";
import GameReviews from "./components/GameReviews/GameReviews.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
      <Footer />
      <ThemeToggle />
    </>
  );
}


function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/games"
        element={<GameDiscovery />}
      />

      <Route
        path="/game-reviews"
        element={<GameReviews />}
      />

    </Routes>
  );
}


export default App;