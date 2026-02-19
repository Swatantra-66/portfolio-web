import { motion } from "framer-motion";
import collegeLogo from "../assets/college-logo.png";
import clubLogo from "../assets/club-logo.png";
import { ExternalLink } from "lucide-react";

const experienceData = [
  {
    id: 1,
    institution: "Innogeeks",
    role: "Technical Member",
    date: "2024 - 2025",
    logo: clubLogo,
    link: "https://innogeeks.in",
  },
];

const educationData = [
  {
    id: 1,
    institution: "KIET Group of Institutions",
    role: "Bachelor of Technology",
    date: "2024 - 2028",
    logo: collegeLogo,
    link: "https://www.kiet.edu/",
  },
];

const Education = () => {
  return (
    <section className="section-container" id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
          Experience & <span className="gradient-text">Education</span>
        </h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          My academic background and community involvement
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
            Work Experience
          </h3>
          <div className="space-y-4">
            {experienceData.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-5 md:p-6 rounded-2xl border border-white/10 hover:border-primary-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-5 z-10">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 border border-white/20 shadow-lg overflow-hidden">
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-display font-bold text-white tracking-wide group-hover:text-primary-100 transition-colors">
                      {item.institution}
                    </span>
                    <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent mt-1">
                      {item.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 z-10">
                  <span className="text-[var(--text-secondary)] text-sm font-medium">
                    {item.date}
                  </span>
                  <ExternalLink className="w-4 h-4 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
            Education
          </h3>
          <div className="space-y-4">
            {educationData.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-5 md:p-6 rounded-2xl border border-white/10 hover:border-primary-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-5 z-10">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 border border-white/20 shadow-lg overflow-hidden">
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-display font-bold text-white tracking-wide group-hover:text-primary-100 transition-colors">
                      {item.institution}
                    </span>
                    <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent mt-1">
                      {item.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 z-10">
                  <span className="text-[var(--text-secondary)] text-sm font-medium">
                    {item.date}
                  </span>
                  <ExternalLink className="w-4 h-4 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
