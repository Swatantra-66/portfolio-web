import { motion } from "framer-motion";
import { Code2, Database, Cloud, Wrench } from "lucide-react";

const skillsData = [
  {
    category: "Backend",
    icon: Code2,
    skills: ["Go (Gin)", "Node.js", "Gorilla Mux", "REST APIs", "C++"],
    color: "from-green-500 to-emerald-500",
  },
  {
    category: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQL", "Database Design"],
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "DevOps & Tools",
    icon: Wrench,
    skills: ["Docker", "Git", "CI/CD", "AWS"],
    color: "from-orange-500 to-red-500",
  },
  {
    category: "Frontend",
    icon: Code2,
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    color: "from-blue-500 to-cyan-500",
  },
];

const Skills = () => {
  return (
    <section className="section-container" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
          Skills & <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          The scalable stack I use to engineer robust, high-performance systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsData.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-2xl p-6 card-hover relative overflow-hidden group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-display font-bold mb-4">
                  {category.category}
                </h3>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                      <span className="text-[var(--text-secondary)] text-sm">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-[var(--text-secondary)] mb-4">
          Currently focused on
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Go",
            "Backend Development",
            "Computer Networks",
            "PostgreSQL",
            "Docker",
            "Cloud Computing",
          ].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 rounded-full glass-effect text-sm font-medium text-primary-400"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
