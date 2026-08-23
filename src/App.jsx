import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/hero.jsx";
import Features from "./components/Features/features.jsx";
import Services from "./components/Services/services.jsx";
import About from "./components/About/about.jsx";
import Contact from "./components/Contact/contact.jsx";
import Footer from "./components/Footer/footer.jsx";
import ThemeToggle from "./components/UI/themeToggle.jsx";

function App() {
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

export default App;