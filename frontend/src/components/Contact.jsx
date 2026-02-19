import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.936H5.045z" />
  </svg>
);

const contactMethods = [
  {
    icon: MailIcon,
    label: "Email",
    value: "maverickswatantra@gmail.com",
    href: "mailto:maverickswatantra@gmail.com",
    bgClass: "bg-gradient-to-br from-cyan-400 to-blue-500",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "Swatantra-66",
    href: "https://github.com/Swatantra-66",
    bgClass: "bg-gray-700",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "Swatantra Yadav",
    href: "https://www.linkedin.com/in/swatantraar1see",
    bgClass: "bg-blue-600",
  },
  {
    icon: XIcon,
    label: "Twitter",
    value: "@swatantra35435",
    href: "https://twitter.com/swatantra35435",
    bgClass: "bg-black border border-white/20",
  },
];

const Contact = () => {
  return (
    <section className="section-container" id="contact">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          I'm always open to new opportunities and interesting projects
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* 2. The New Bento-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                // Hover animation kept subtle to match the premium feel
                className="glass-effect flex items-center gap-5 p-5 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors duration-300 group cursor-pointer"
              >
                {/* Colored Icon Box */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ${method.bgClass}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-lg tracking-wide">
                    {method.label}
                  </span>
                  <span className="text-[var(--text-secondary)] text-sm">
                    {method.value}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Location & Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-effect rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary-400" />
            <span className="text-[var(--text-secondary)]">Ayodhya, INDIA</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Available for new opportunities
            </span>
          </div>

          <p className="mt-6 text-[var(--text-secondary)]">
            Open to freelance projects, Intern & full-time positions, and
            collaborations
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
