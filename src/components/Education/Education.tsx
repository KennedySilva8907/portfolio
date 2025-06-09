import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SectionProps } from '../../types';

const Education: React.FC<SectionProps> = ({ darkMode, isVisible }) => {
  return (
    <section id="education" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Curso Técnico */}
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-800/50" : "bg-white"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } hover:scale-105 transition-all duration-300 animate-slide-left shadow-lg hover:shadow-2xl`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-400/20">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    Information Systems Management Technician
                  </h3>
                  <p
                    className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Pedro Alexandrino Secondary School
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
                2025
              </span>
            </div>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Graduating in 2025 with practical experience in full-stack
              development and AI solutions integration.
            </p>
          </div>

          {/* Educação Básica */}
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-800/50" : "bg-white"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } hover:scale-105 transition-all duration-300 animate-slide-right shadow-lg hover:shadow-2xl`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-400/20">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    Basic Education
                  </h3>
                  <p
                    className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    9th Grade Completed
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
                2022
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;