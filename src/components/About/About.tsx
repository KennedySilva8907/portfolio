import React from 'react';
import { Globe, MapPin, Star, Briefcase, Cpu, Code, Layers } from 'lucide-react';
import { SectionProps } from '../../types';

const About: React.FC<SectionProps> = ({ darkMode, isVisible }) => {
  return (
    <section
      id="about"
      className={`py-24 px-6 relative z-10 ${
        darkMode ? "bg-slate-800/50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto sobre mim */}
          <div className="space-y-6 animate-slide-left">
            <p
              className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Dedicated and versatile professional with a strong ability to
              adapt to both in-person and remote work environments. During my
              internship at CINEL Lisbon, I developed solid skills in
              self-employment and remote project management, demonstrating
              discipline and organization.
            </p>

            <p
              className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              I am always available for new challenges, whether in a
              face-to-face, remote, or hybrid environment, adapting easily to
              the needs of the team and the company.
            </p>

            {/* Informações adicionais */}
            <div className="grid sm:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-semibold text-blue-400 mb-4 flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5" />
                  Languages
                </h3>
                <div className="space-y-2">
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Portuguese (Native)
                  </p>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    English (B1)
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-400 mb-4 flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  Availability
                </h3>
                <div className="space-y-2">
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Remote
                  </p>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Hybrid
                  </p>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    On-site
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card de estatísticas */}
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } animate-slide-right`}
          >
            <h3 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-3">
              <Star className="w-6 h-6" />
              Quick Stats
            </h3>
            <div className="space-y-6">
              {[
                {
                  label: "Experience",
                  value: "1+ Year",
                  icon: <Briefcase className="w-5 h-5" />,
                },
                {
                  label: "Internship Hours",
                  value: "400+",
                  icon: <Cpu className="w-5 h-5" />,
                },
                {
                  label: "Projects Completed",
                  value: "Multiple",
                  icon: <Code className="w-5 h-5" />,
                },
                {
                  label: "Specialization",
                  value: "Full-Stack",
                  icon: <Layers className="w-5 h-5" />,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-400/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-400">{stat.icon}</div>
                    <span
                      className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <span className="font-semibold text-blue-400">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;