import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AgentSkill from "./components/AgentSkill";
import Atlas from "./components/Atlas";
import Author from "./components/Author";
import Footer from "./components/Footer";
import GetBook from "./components/GetBook";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import Playground from "./components/Playground";
import TheBook from "./components/TheBook";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grain relative min-h-screen bg-paper text-ink">
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      <Nav />
      <main>
        <Hero />
        <Marquee />
        <TheBook />
        <Atlas />
        <Playground />
        <Author />
        <AgentSkill />
        <GetBook />
        <Footer />
      </main>
    </div>
  );
}
