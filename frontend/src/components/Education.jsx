import { ExternalLink } from "lucide-react";
import logoCollege from "../assets/college-logo.png";
import logoClub from "../assets/club-logo.png";

const certifications = [
  {
    title: "Innogeeks",
    timeline: "2024-2025",
    role: "Technical Member",
    badgeUrl: logoClub,
    verifyLink: "https://innogeeks.in",
    color: "border-blue-500",
  },
  {
    title: "KIET Group of Institutions",
    timeline: "2024-2028",
    role: "Bachelor Student",
    badgeUrl: logoCollege,
    verifyLink: "https://kiet.edu",
    color: "border-blue-500",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
          Education &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Experience
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          My academic background and community involvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`bg-gray-900/50 p-6 rounded-xl border ${cert.color} border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex items-center gap-6`}
          >
            <div className="w-16 h-16 flex-shrink-0 bg-gray-800 rounded-lg p-2 flex items-center justify-center overflow-hidden">
              {" "}
              <img
                src={cert.badgeUrl}
                alt={cert.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-100 leading-tight mb-1">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {cert.role} • {cert.timeline}
              </p>

              <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Website <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
