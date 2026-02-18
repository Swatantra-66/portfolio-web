import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/portfolio-logo.png";

const navLinks = [
  { name: "Home", path: "/", hash: "#" },
  { name: "Skills", path: "/", hash: "#skills" },
  { name: "Projects", path: "/", hash: "#projects" },
  { name: "Certifications", path: "/", hash: "#certifications" },
  { name: "Contact", path: "/", hash: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    setIsOpen(false);
    if (hash === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash) {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            onClick={() => handleNavClick("#")}
            className="relative z-10"
          >
            <motion.div
              className="text-2xl font-display font-bold flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-10 w-10 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500 blur-md opacity-20 rounded-full"></div>

                <img
                  src={logoImg}
                  alt="Swatantra Logo"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Swatantra
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link.hash)}
                className="text-[var(--text-secondary)] hover:text-primary-400 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin">
              <motion.button
                className="btn-primary text-sm px-5 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin
              </motion.button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 p-2 rounded-lg glass-effect"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.hash)}
                    className="block py-2 text-[var(--text-secondary)] hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  <button className="w-full btn-primary text-sm">
                    Admin Panel
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
