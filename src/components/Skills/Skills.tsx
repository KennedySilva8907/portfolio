import React from 'react';
import { Code, Globe, Database } from 'lucide-react';
import { SkillsProps, Skill, FrameworkTool } from '../../types';

const SkillsComponent: React.FC<SkillsProps> = ({ darkMode, skills, skillsAnimated, isVisible }) => {
  return (
    <section
      id="skills"
      className={`py-24 px-6 relative z-10 ${
        darkMode ? "bg-slate-800/50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } animate-slide-left shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            <h3 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3">
              <Code className="w-6 h-6" />
              Programming Languages
            </h3>
            <div className="space-y-6">
              {skills.programming.map((skill: Skill, index: number) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  {/* Barra de progresso */}
                  <div
                    className={`w-full h-3 rounded-full ${
                      darkMode ? "bg-slate-700" : "bg-gray-200"
                    } overflow-hidden`}
                  >
                    <div
                      className="h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 hover:from-blue-300 hover:to-purple-400"
                      style={{
                        width: skillsAnimated ? `${skill.percentage}%` : "0%",
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } animate-fade-up shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            <h3 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3">
              <Globe className="w-6 h-6" />
              Frameworks & Technologies
            </h3>
            <div className="space-y-4">
              {skills.frameworks.map((framework: FrameworkTool, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-slate-800" : "bg-white"
                  } border ${
                    darkMode ? "border-slate-600" : "border-gray-200"
                  } hover:scale-105 transition-all duration-300 group flex items-center gap-3 hover:border-blue-400`}
                >
                  <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {framework.icon}
                  </div>
                  <span>{framework.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } animate-slide-right shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            <h3 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3">
              <Database className="w-6 h-6" />
              Development Tools
            </h3>
            <div className="space-y-4">
              {skills.tools.map((tool: FrameworkTool, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-slate-800" : "bg-white"
                  } border ${
                    darkMode ? "border-slate-600" : "border-gray-200"
                  } hover:scale-105 transition-all duration-300 group flex items-center gap-3 hover:border-blue-400`}
                >
                  <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsComponent;