import React from 'react';
import { Briefcase } from 'lucide-react';
import { ExperienceProps, Experience as ExperienceType } from '../../types';

const ExperienceComponent: React.FC<ExperienceProps> = ({ darkMode, experiences, isVisible }) => {
  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Lista de experiências */}
        <div className="space-y-12">
          {experiences.map((exp: ExperienceType, index: number) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${
                darkMode ? "bg-slate-800/50" : "bg-white"
              } border ${
                darkMode ? "border-slate-700" : "border-gray-200"
              } hover:scale-105 transition-all duration-300 animate-fade-up shadow-lg hover:shadow-2xl`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-400/20">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">
                      {exp.title}
                    </h3>
                    <p
                      className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {exp.company}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-blue-900/30 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                  } mt-4 lg:mt-0 self-start`}
                >
                  {exp.duration}
                </span>
              </div>

              {/* Lista de responsabilidades */}
              <ul className="space-y-3">
                {exp.description.map((item: string, i: number) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-blue-400 transition-colors duration-300`}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceComponent;