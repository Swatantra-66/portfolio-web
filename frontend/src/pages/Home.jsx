import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Certifications from "../components/Certifications";
import Education from "../components/Education";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <Contact />
    </motion.div>
  );
};

export default Home;
