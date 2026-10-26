import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AgentSkill from "./components/AgentSkill";
import About from "./components/About";
import Atlas from "./components/Atlas";
import Author from "./components/Author";
import Footer from "./components/Footer";
import GetBook from "./components/GetBook";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import Playground from "./components/Playground";
import Privacy from "./components/Privacy";
import TheBook from "./components/TheBook";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grain relative min-h-screen bg-paper text-ink">
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <TheBook />
      <Atlas />
      <Playground />
      <Author />
      <AgentSkill />
      <GetBook />
    </>
  );
}