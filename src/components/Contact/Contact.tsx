import React from 'react';
import { Mail, Phone, ExternalLink, Github, Coffee } from 'lucide-react';
import { SectionProps } from '../../types';

const Contact: React.FC<SectionProps> = ({ darkMode, isVisible }) => {
  return (
    <section
      id="contact"
      className={`py-24 px-6 relative z-10 ${
        darkMode ? "bg-slate-800/50" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p
            className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Ready to collaborate on your next project? Let's connect!
          </p>
        </div>

        {/* Cards de contato */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <a
            href="mailto:kennedysilva2k22@gmail.com"
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } hover:scale-105 transition-all duration-300 group cursor-glow animate-slide-left shadow-lg hover:shadow-2xl`}
          >
            <Mail className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold mb-2 text-blue-400">Email</h3>
            <p
              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} break-words`}
            >
              kennedysilva2k22@gmail.com
            </p>
          </a>

          <a
            href="tel:+351964619289"
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } hover:scale-105 transition-all duration-300 group cursor-glow animate-fade-up shadow-lg hover:shadow-2xl`}
          >
            <Phone className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold mb-2 text-blue-400">Phone</h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              +351 964 619 289
            </p>
          </a>

          <a
            href="https://www.linkedin.com/in/kennedy-silva-3b627b369"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } hover:scale-105 transition-all duration-300 group cursor-glow animate-slide-right shadow-lg hover:shadow-2xl`}
          >
            <ExternalLink className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold mb-2 text-blue-400">LinkedIn</h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Professional Profile
            </p>
          </a>

          <a
            href="https://github.com/kennedysilva8907"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-2xl ${
              darkMode ? "bg-slate-900/50" : "bg-gray-50"
            } border ${
              darkMode ? "border-slate-700" : "border-gray-200"
            } hover:scale-105 transition-all duration-300 group cursor-glow animate-slide-right shadow-lg hover:shadow-2xl`}
          >
            <Github className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold mb-2 text-blue-400">GitHub</h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              @kennedysilva8907
            </p>
          </a>
        </div>

        {/* Card de disponibilidade */}
        <div
          className={`p-8 rounded-2xl ${
            darkMode ? "bg-slate-900/50" : "bg-gray-50"
          } border ${
            darkMode ? "border-slate-700" : "border-gray-200"
          } animate-fade-up shadow-lg`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-blue-400">
              Let's Work Together
            </h3>
          </div>
          <p
            className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Currently available for new opportunities in full-stack
            development, AI integration projects, and remote collaborations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;