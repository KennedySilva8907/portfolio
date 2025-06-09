import React from 'react';
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react';
import { NavigationProps } from '../../types';
import { NAVIGATION_SECTIONS } from '../../data';

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  activeSection,
  mobileMenuOpen,
  headerText,
  onToggleDarkMode,
  onToggleMobileMenu,
  onScrollToSection,
}) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        darkMode
          ? "bg-slate-900/95 border-slate-700"
          : "bg-white/95 border-gray-200"
      } backdrop-blur-md border-b shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo e título animado */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Terminal className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DevPortfolio
              </div>
              <div
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} font-mono`}
              >
                {headerText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {NAVIGATION_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => onScrollToSection(section)}
                className={`capitalize transition-all duration-300 hover:text-blue-400 relative px-3 py-2 rounded-lg ${
                  activeSection === section
                    ? "text-blue-400 bg-blue-400/10"
                    : darkMode
                      ? "text-gray-300 hover:bg-slate-800"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {section}
                {activeSection === section && (
                  <div className="absolute -bottom-1/4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Controles do header */}
          <div className="flex items-center space-x-4">
            {/* Botão de tema */}
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "hover:bg-slate-800 text-yellow-400"
                  : "hover:bg-gray-100 text-blue-600"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-green-400/20 text-green-400 text-xs font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <div className="flex flex-col space-y-4 pt-4">
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => onScrollToSection(section)}
                  className={`capitalize text-left transition-all duration-300 hover:text-blue-400 px-3 py-2 rounded-lg ${
                    activeSection === section
                      ? "text-blue-400 bg-blue-400/10"
                      : darkMode
                        ? "text-gray-300 hover:bg-slate-800"
                        : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;