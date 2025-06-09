import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { FooterProps } from '../../types';

const Footer: React.FC<FooterProps> = ({ darkMode, onScrollToSection }) => {
  return (
    <footer
      className={`py-12 px-6 border-t relative z-10 ${
        darkMode
          ? "border-slate-700 bg-slate-900"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-blue-400" />
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © 2025 Kennedy Silva. Full Stack Developer. Built with React,
            TypeScript & Tailwind CSS.
          </p>
        </div>
        <button
          onClick={() => onScrollToSection("home")}
          className="text-blue-400 hover:text-blue-500 transition-colors duration-300 flex items-center gap-2 mx-auto"
        >
          <ArrowUp className="w-4 h-4" />
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;