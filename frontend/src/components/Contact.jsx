import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, MapPin } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "maverickswatantra@gmail.com",
    href: "mailto:maverickswatantra@gmail.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Swatantra-66",
    href: "https://github.com/Swatantra-66",
    color: "from-gray-500 to-gray-700",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Swatantra Yadav",
    href: "https://www.linkedin.com/in/swatantraar1see",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@swatantra35435",
    href: "https://twitter.com/swatantra35435",
    color: "from-sky-500 to-blue-500",
  },
];

const Contact = () => {
  return (
    <section className="section-container" id="contact">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-effect rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${method.color}`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg mb-1">
                      {method.label}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm">
                      {method.value}
                    </p>
                  </div>

                  <motion.div
                    className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

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
