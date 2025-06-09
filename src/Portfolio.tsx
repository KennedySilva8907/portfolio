import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

// Importações dos dados e tipos
import { SKILLS_DATA, EXPERIENCES_DATA, CODE_SNIPPETS, HEADER_TEXTS, NAVIGATION_SECTIONS } from './data';
import { VisibilityState } from './types'; // 

// Importações dos componentes
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import ExperienceComponent from './components/Experience/Experience';
import SkillsComponent from './components/Skills/Skills';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import GlobalMouseEffect from './components/GlobalMouseEffect'; // 

/**
 * Componente principal do portfólio
 * Gerencia todo o estado da aplicação e renderiza todas as seções
 */
const Portfolio: React.FC = () => {
// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const [darkMode, setDarkMode] = useState<boolean>(true);
const [activeSection, setActiveSection] = useState<string>("home");
const [isVisible, setIsVisible] = useState<VisibilityState>({});
const [skillsAnimated, setSkillsAnimated] = useState<boolean>(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
const [typedText, setTypedText] = useState<string>("");
const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0);
const [headerText, setHeaderText] = useState<string>("");
const [headerIndex, setHeaderIndex] = useState<number>(0);

// ============================================================================
// EFFECTS & ANIMATIONS
// ============================================================================

/**
 * Effect para animação de digitação do header
 */
useEffect(() => {
  const currentText = HEADER_TEXTS[headerIndex];
  let charIndex = 0;

  const typeInterval = setInterval(() => {
    if (charIndex < currentText.length) {
      setHeaderText(currentText.substring(0, charIndex + 1));
      charIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        setHeaderIndex((prev) => (prev + 1) % HEADER_TEXTS.length);
        setHeaderText("");
      }, 3000);
    }
  }, 150);

  return () => clearInterval(typeInterval);
}, [headerIndex]);

/**
 * Effect para animação de digitação do código
 */
useEffect(() => {
  const currentSnippet = CODE_SNIPPETS[currentCodeIndex];
  let charIndex = 0;

  const typeInterval = setInterval(() => {
    if (charIndex < currentSnippet.length) {
      setTypedText(currentSnippet.substring(0, charIndex + 1));
      charIndex++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        setCurrentCodeIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        setTypedText("");
      }, 2000);
    }
  }, 100);

  return () => clearInterval(typeInterval);
}, [currentCodeIndex]);

/**
 * Effect principal para scroll e intersection observer
 */
useEffect(() => {
  let observer: IntersectionObserver | null = null;

  const handleScroll = (): void => {
    const scrollPosition = window.scrollY + 100;
    setShowBackToTop(window.scrollY > 300);

    for (const section of NAVIGATION_SECTIONS) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));

          if (
            entry.target.id === "skills" &&
            entry.isIntersecting &&
            !skillsAnimated
          ) {
            setTimeout(() => setSkillsAnimated(true), 500);
          }
        });
      },
      { threshold: 0.1 },
    );

    NAVIGATION_SECTIONS.forEach((section) => {
      const element = document.getElementById(section);
      if (element && observer) {
        observer.observe(element);
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
  setupObserver();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
}, [skillsAnimated]);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const scrollToSection = (sectionId: string): void => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  setMobileMenuOpen(false);
};

const toggleDarkMode = (): void => {
  setDarkMode(!darkMode);
};

const toggleMobileMenu = (): void => {
  setMobileMenuOpen(!mobileMenuOpen);
};

// ============================================================================
// RENDER
// ============================================================================

return (
  <div
    className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
    }`}
  >
    {/* ✅ EFEITO GLOBAL DO MOUSE - ADICIONADO AQUI */}
    <GlobalMouseEffect darkMode={darkMode} />

    {/* CSS Animations */}
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateX(-100px) translateY(0px); opacity: 0; }
            50% { transform: translateX(100px) translateY(-20px); opacity: 0.3; }
          }
          
          @keyframes matrix {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
          }
          
          .cursor-glow {
            animation: glow 2s ease-in-out infinite;
          }
          
          @keyframes slideInFromLeft {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes slideInFromRight {
            0% { transform: translateX(100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes fadeInUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .animate-slide-left { animation: slideInFromLeft 0.8s ease-out; }
          .animate-slide-right { animation: slideInFromRight 0.8s ease-out; }
          .animate-fade-up { animation: fadeInUp 0.6s ease-out; }
        `,
      }}
    />

    {/* Navigation */}
    <Navigation
      darkMode={darkMode}
      activeSection={activeSection}
      mobileMenuOpen={mobileMenuOpen}
      headerText={headerText}
      onToggleDarkMode={toggleDarkMode}
      onToggleMobileMenu={toggleMobileMenu}
      onScrollToSection={scrollToSection}
    />

    {/* Hero Section */}
    <Hero
      darkMode={darkMode}
      typedText={typedText}
      onScrollToSection={scrollToSection}
    />

    {/* About Section */}
    <About
      darkMode={darkMode}
      isVisible={isVisible.about || false}
    />

    {/* Experience Section */}
    <ExperienceComponent
      darkMode={darkMode}
      experiences={EXPERIENCES_DATA}
      isVisible={isVisible.experience || false}
    />

    {/* Skills Section */}
    <SkillsComponent
      darkMode={darkMode}
      skills={SKILLS_DATA}
      skillsAnimated={skillsAnimated}
      isVisible={isVisible.skills || false}
    />

    {/* Education Section */}
    <Education
      darkMode={darkMode}
      isVisible={isVisible.education || false}
    />

    {/* Contact Section */}
    <Contact
      darkMode={darkMode}
      isVisible={isVisible.contact || false}
    />

    {/* Footer */}
    <Footer
      darkMode={darkMode}
      onScrollToSection={scrollToSection}
    />

    {/* Back to Top Button */}
    {showBackToTop && (
      <button
        onClick={() => scrollToSection("home")}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 cursor-glow ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    )}
  </div>
);
};

export default Portfolio;