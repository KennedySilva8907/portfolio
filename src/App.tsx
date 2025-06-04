import React, { useState, useEffect } from 'react';
import { 
Moon, Sun, Github, Mail, Phone, MapPin, ExternalLink, Code, Database, Globe, 
Briefcase, GraduationCap, User, ChevronDown, Star, Zap, Sparkles, Menu, X, 
ArrowUp, Terminal, Cpu, Layers, FileCode, Server, Monitor, GitBranch, Palette, Coffee 
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * Interface para definir a estrutura de uma skill de programação
 */
interface ProgrammingSkill {
name: string;
level: 'Beginner' | 'Intermediate' | 'Advanced';
percentage: number;
icon: React.ReactNode;
}

/**
 * Interface para skills de frameworks e ferramentas (sem nível)
 */
interface FrameworkSkill {
name: string;
icon: React.ReactNode;
}

/**
 * Interface para agrupar todas as categorias de skills
 */
interface SkillCategories {
programming: ProgrammingSkill[];
frameworks: FrameworkSkill[];
tools: FrameworkSkill[];
}

/**
 * Interface para definir experiências profissionais
 */
interface Experience {
title: string;
company: string;
duration: string;
description: string[];
}

/**
 * Interface para controlar visibilidade de elementos na página
 */
interface VisibilityState {
[key: string]: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Componente principal do portfólio
 * Gerencia todo o estado da aplicação e renderiza todas as seções
 */
const Portfolio: React.FC = () => {
// ============================================================================
// STATE MANAGEMENT
// ============================================================================

// Estado para controlar tema escuro/claro
const [darkMode, setDarkMode] = useState<boolean>(true);

// Estado para controlar qual seção está ativa na navegação
const [activeSection, setActiveSection] = useState<string>('home');

// Estado para controlar visibilidade de elementos (animações)
const [isVisible, setIsVisible] = useState<VisibilityState>({});

// Estado para controlar se as animações das skills já foram executadas
const [skillsAnimated, setSkillsAnimated] = useState<boolean>(false);

// Estado para controlar menu mobile aberto/fechado
const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

// Estado para controlar visibilidade do botão "voltar ao topo"
const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

// Estado para o texto digitado no efeito de máquina de escrever
const [typedText, setTypedText] = useState<string>('');

// Estado para controlar qual snippet de código está sendo mostrado
const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0);

// Estado para o texto do header animado
const [headerText, setHeaderText] = useState<string>('');

// Estado para controlar qual texto do header está sendo mostrado
const [headerIndex, setHeaderIndex] = useState<number>(0);

// ============================================================================
// CONSTANTS & DATA (MOVER PARA FORA DO COMPONENTE)
// ============================================================================

/**
 * Array de snippets de código para animação de fundo
 * Simula código sendo digitado em tempo real
 */
const CODE_SNIPPETS: string[] = [
  'const developer = "Kennedy Silva";',
  'function createAwesome() {',
  '  return innovation + creativity;',
  '}',
  'class FullStackDev {',
  '  constructor() {',
  '    this.skills = ["C#", "JavaScript", "Python"];',
  '    this.passion = "coding";',
  '  }',
  '}',
  'if (challenge.isComplex()) {',
  '  solution = findCreativeWay();',
  '}',
  'const future = await buildTomorrow();'
];

/**
 * Array de textos para animação do header
 * Rotaciona entre diferentes frases motivacionais
 */
const HEADER_TEXTS: string[] = [
  'Building Tomorrow',
  'Coding Dreams', 
  'Creating Solutions',
  'Full-Stack Magic'
];

/**
 * Objeto contendo todas as skills organizadas por categoria
 * Facilita a manutenção e adição de novas skills
 */
const skills: SkillCategories = {
  programming: [
    { name: 'C#', level: 'Advanced', percentage: 90, icon: <FileCode className="w-5 h-5" /> },
    { name: 'C++', level: 'Intermediate', percentage: 70, icon: <Terminal className="w-5 h-5" /> },
    { name: 'Python', level: 'Intermediate', percentage: 65, icon: <Code className="w-5 h-5" /> },
    { name: 'JavaScript', level: 'Advanced', percentage: 85, icon: <Zap className="w-5 h-5" /> },
    { name: 'HTML5/CSS3', level: 'Advanced', percentage: 90, icon: <Monitor className="w-5 h-5" /> },
    { name: 'SQL', level: 'Intermediate', percentage: 75, icon: <Database className="w-5 h-5" /> }
  ],
  frameworks: [
    { name: 'ASP.NET', icon: <Server className="w-5 h-5" /> },
    { name: 'REST APIs', icon: <Globe className="w-5 h-5" /> },
    { name: 'Firebase', icon: <Layers className="w-5 h-5" /> },
    { name: 'SQL Server', icon: <Database className="w-5 h-5" /> }
  ],
  tools: [
    { name: 'Visual Studio Code', icon: <Code className="w-5 h-5" /> },
    { name: 'Git & GitHub', icon: <GitBranch className="w-5 h-5" /> },
    { name: 'SSMS', icon: <Database className="w-5 h-5" /> },
    { name: 'Canva', icon: <Palette className="w-5 h-5" /> },
    { name: 'Microsoft Office', icon: <FileCode className="w-5 h-5" /> }
  ]
};

/**
 * Array de experiências profissionais
 * Estruturado para fácil manutenção e expansão
 */
const experiences: Experience[] = [
  {
    title: 'Technical Project Evaluator',
    company: 'Online Training Company',
    duration: '1 year',
    description: [
      'Conducted technical correction and evaluation of database projects',
      'Performed expert code reviews in C# and C++',
      'Provided technical mentoring and constructive feedback to students',
      'Identified and resolved complex technical problems'
    ]
  },
  {
    title: 'Development Intern',
    company: 'CINEL Lisbon',
    duration: '400+ hours (Remote)',
    description: [
      'Complete web application development with ASP.NET',
      'Creating and integrating custom REST APIs',
      'Database management and optimization with SQL Server',
      'Implementation of business logic and data validation'
    ]
  }
];

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
          setHeaderText('');
        }, 3000);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, [headerIndex]); // REMOVIDO headerTexts da dependência

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
          setTypedText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentCodeIndex]); // REMOVIDO codeSnippets da dependência

/**
 * Effect principal para scroll e intersection observer
 * Gerencia navegação ativa e animações baseadas em scroll
 */
useEffect(() => {
  let observer: IntersectionObserver | null = null;

  const handleScroll = (): void => {
    const sections: string[] = ['home', 'about', 'experience', 'skills', 'education', 'contact'];
    const scrollPosition = window.scrollY + 100;

    // Controla visibilidade do botão "voltar ao topo"
    setShowBackToTop(window.scrollY > 300);

    // Determina qual seção está ativa baseada na posição do scroll
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  // Intersection Observer para animações de entrada
  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Atualiza estado de visibilidade
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          
          // Trigger especial para animação das skills
          if (entry.target.id === 'skills' && entry.isIntersecting && !skillsAnimated) {
            setTimeout(() => setSkillsAnimated(true), 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observa todas as seções
    const sections = ['home', 'about', 'experience', 'skills', 'education', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && observer) {
        observer.observe(element);
      }
    });
  };

  // Adiciona listener de scroll
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Executa uma vez no mount
  
  // Setup do observer
  setupObserver();

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
}, [skillsAnimated]); 


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Função para scroll suave até uma seção específica
 * @param sectionId - ID da seção para fazer scroll
 */
const scrollToSection = (sectionId: string): void => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  setMobileMenuOpen(false);
};


/**
 * Função para alternar tema escuro/claro
 */
const toggleDarkMode = (): void => {
  setDarkMode(!darkMode);
};

/**
 * Função para alternar menu mobile
 */
const toggleMobileMenu = (): void => {
  setMobileMenuOpen(!mobileMenuOpen);
};


// ============================================================================
// RENDER
// ============================================================================

return (
  <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
    darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
  }`}>
    
    {/* ============================================================================ */}
    {/* ANIMATED BACKGROUND */}
    {/* ============================================================================ */}
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Partículas de código flutuantes */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-xs font-mono opacity-20 animate-pulse ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {['</', '/>', '{}', '[]', '()', '=>', '&&', '||', 'const', 'let', 'var', 'function'][Math.floor(Math.random() * 12)]}
          </div>
        ))}
      </div>

      {/* Grid de fundo melhorado */}
      <div 
        className={`absolute inset-0 opacity-5 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />



      {/* Linhas de código flutuantes  */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-px opacity-10 ${
              darkMode 
                ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-blue-600 to-transparent'
            }`}
            style={{
              width: `${200 + Math.random() * 300}px`,
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Efeito Matrix no canto esquerdo */}
      <div className="absolute left-0 top-0 h-full w-20 opacity-5 overflow-hidden hidden lg:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-xs font-mono ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}
            style={{
              left: `${i * 10}px`,
              animation: `matrix ${5 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 20 }, (_, j) => (
              <div key={j} className="mb-2">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* ============================================================================ */}
{/* CUSTOM CSS ANIMATIONS */}
{/* ============================================================================ */}
<style dangerouslySetInnerHTML={{
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
  `
}} />


    
    {/* ============================================================================ */}
    {/* NAVIGATION BAR */}
    {/* ============================================================================ */}
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      darkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-200'
    } backdrop-blur-md border-b shadow-lg`}>
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
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-mono`}>
                {headerText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'skills', 'education', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all duration-300 hover:text-blue-400 relative px-3 py-2 rounded-lg ${
                  activeSection === section 
                    ? 'text-blue-400 bg-blue-400/10' 
                    : darkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
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
              onClick={toggleDarkMode}
              className={`p-3 rounded-lg transition-all duration-300 ${
                darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-100 text-blue-600'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-green-400/20 text-green-400 text-xs font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <div className="flex flex-col space-y-4 pt-4">
              {['home', 'about', 'experience', 'skills', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-left transition-all duration-300 hover:text-blue-400 px-3 py-2 rounded-lg ${
                    activeSection === section 
                      ? 'text-blue-400 bg-blue-400/10' 
                      : darkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
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

    {/* ============================================================================ */}
    {/* HERO SECTION */}
    {/* ============================================================================ */}
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32 md:pt-20 relative z-10">
    <div className={`absolute top-24 right-8 p-4 rounded-lg ${
darkMode ? 'bg-slate-800/90' : 'bg-white/90'
} backdrop-blur-sm border ${
darkMode ? 'border-slate-700' : 'border-gray-200'
} font-mono text-sm max-w-xs hidden lg:block shadow-2xl z-30`}>
<div className="flex items-center gap-2 mb-3">
  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
    portfolio.js
  </span>
</div>
<div className={`${darkMode ? 'text-green-400' : 'text-green-600'} leading-relaxed min-h-[20px]`}>
  {typedText}
  <span className="animate-pulse text-blue-400">|</span>
</div>
</div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto principal */}
          <div className="text-center lg:text-left space-y-8 animate-slide-left">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Kennedy
                </span>
                <br />
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Silva</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-400 font-medium flex items-center gap-2">
                <Cpu className="w-6 h-6" />
                Information Systems Management Technician
              </p>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
                Full-stack developer with expertise in AI solutions, ASP.NET, and database management. 
                Passionate about creating innovative digital experiences.
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium cursor-glow flex items-center gap-2"
              >
                <Coffee className="w-5 h-5" />
                Get In Touch
              </button>
              <a
                href="https://github.com/kennedysilva8907"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-8 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 font-medium ${
                  darkMode 
                    ? 'border-slate-600 hover:border-blue-400 text-gray-300 hover:text-white hover:bg-slate-800' 
                    : 'border-gray-300 hover:border-blue-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Github className="w-5 h-5" />
                View GitHub
              </a>
            </div>
          </div>

          {/* Foto de perfil com efeitos */}
          <div className="flex justify-center lg:justify-end animate-slide-right">
            <div className="relative group">
              {/* Efeito de brilho animado de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 scale-110 animate-pulse"></div>
              
              {/* Partículas de código ao redor da imagem */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute text-sm font-mono opacity-40 animate-bounce ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  >
                    {['{', '}', '<', '>', '/', '*', '+', '=', '[]', '()', '=>', '&&'][i]}
                  </div>
                ))}
              </div>
              
              {/* Container principal da imagem */}
              <div className={`relative w-[270px] h-[396px] rounded-3xl overflow-hidden border-4 ${
                darkMode ? 'border-slate-600' : 'border-gray-300'
              } shadow-2xl transform transition-all duration-500 group-hover:scale-105`}>
                
                {/* Gradiente overlay superior */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
                
                {/* Imagem principal */}
                <img
  src="/profile-photo.png"
  alt="Kennedy Silva"
  className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110"
  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
  if (target.nextSibling) {
    (target.nextSibling as HTMLElement).style.display = 'flex';
  }
}}

/>


                
                                 {/* Fallback elegante */}
                  <div 
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}
                    style={{ display: 'none' }}
                  >
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-400">Kennedy Silva</p>
                        <p className="text-xs text-gray-400 mt-1">270×396</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay com informações */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <div className="text-white">
                      <h3 className="font-bold text-lg mb-1">Kennedy Silva</h3>
                      <p className="text-sm opacity-90">Full-Stack Developer</p>
                      
                      {/* Status disponível melhorado */}
                      <div className="flex items-center gap-3 mt-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 w-fit">
                        <div className="relative">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <span className="text-xs font-medium text-green-300">Available for work</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Texto flutuante lateral */}
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-blue-400 opacity-60 hidden lg:block">
                  DEVELOPER
                </div>
                <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 rotate-90 text-xs font-medium text-purple-400 opacity-60 hidden lg:block">
                  CREATIVE
                </div>
              </div>
            </div>
          </div>

          {/* Seta para scroll */}
          <div className="text-center mt-16 animate-fade-up">
            <ChevronDown 
              className={`w-8 h-8 mx-auto cursor-pointer transition-colors duration-300 hover:text-blue-400 animate-bounce ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
              onClick={() => scrollToSection('about')}
            />
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* BACK TO TOP BUTTON */}
      {/* ============================================================================ */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection('home')}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 cursor-glow ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* ============================================================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================================================ */}
      <section id="about" className={`py-24 px-6 relative z-10 ${
        darkMode ? 'bg-slate-800/50' : 'bg-white'
      }`}>
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
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dedicated and versatile professional with a strong ability to adapt to both in-person and remote work environments. 
                During my internship at CINEL Lisbon, I developed solid skills in self-employment and remote project management, 
                demonstrating discipline and organization.
              </p>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I am always available for new challenges, whether in a face-to-face, remote, or hybrid environment, 
                adapting easily to the needs of the team and the company.
              </p>

              {/* Informações adicionais */}
              <div className="grid sm:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-4 flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5" />
                    Languages
                  </h3>
                  <div className="space-y-2">
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Portuguese (Native)</p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>English (B1)</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-4 flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5" />
                    Availability
                  </h3>
                  <div className="space-y-2">
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remote</p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hybrid</p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>On-site</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de estatísticas */}
            <div className={`p-8 rounded-2xl ${
              darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
            } border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            } animate-slide-right`}>
              <h3 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                <Star className="w-6 h-6" />
                Quick Stats
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'Experience', value: '1+ Year', icon: <Briefcase className="w-5 h-5" /> },
                  { label: 'Internship Hours', value: '400+', icon: <Cpu className="w-5 h-5" /> },
                  { label: 'Projects Completed', value: 'Multiple', icon: <Code className="w-5 h-5" /> },
                  { label: 'Specialization', value: 'Full-Stack', icon: <Layers className="w-5 h-5" /> }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-400/10 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">{stat.icon}</div>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</span>
                    </div>
                    <span className="font-semibold text-blue-400">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* EXPERIENCE SECTION */}
      {/* ============================================================================ */}
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
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-2xl ${
                  darkMode ? 'bg-slate-800/50' : 'bg-white'
                } border ${
                  darkMode ? 'border-slate-700' : 'border-gray-200'
                } hover:scale-105 transition-all duration-300 animate-fade-up shadow-lg hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-400/20">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-400 mb-2">{exp.title}</h3>
                      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                  } mt-4 lg:mt-0 self-start`}>
                    {exp.duration}
                  </span>
                </div>
                
                {/* Lista de responsabilidades */}
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    } hover:text-blue-400 transition-colors duration-300`}>
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

      {/* ============================================================================ */}
      {/* SKILLS SECTION */}
      {/* ============================================================================ */}
      <section id="skills" className={`py-24 px-6 relative z-10 ${
        darkMode ? 'bg-slate-800/50' : 'bg-white'
      }`}>
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
            <div className={`p-8 rounded-2xl ${
              darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
            } border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            } animate-slide-left shadow-lg hover:shadow-2xl transition-all duration-300`}>
              <h3 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                <Code className="w-6 h-6" />
                Programming Languages
              </h3>
              <div className="space-y-6">
                {skills.programming.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {skill.level}
                      </span>
                    </div>
                    {/* Barra de progresso */}
                    <div className={`w-full h-3 rounded-full ${
                      darkMode ? 'bg-slate-700' : 'bg-gray-200'
                    } overflow-hidden`}>
                      <div 
                        className="h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 hover:from-blue-300 hover:to-purple-400"
                        style={{ 
                          width: skillsAnimated ? `${skill.percentage}%` : '0%',
                          transitionDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className={`p-8 rounded-2xl ${
              darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
            } border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            } animate-fade-up shadow-lg hover:shadow-2xl transition-all duration-300`}>
              <h3 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                <Globe className="w-6 h-6" />
                Frameworks & Technologies
              </h3>
              <div className="space-y-4">
                {skills.frameworks.map((framework, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    darkMode ? 'bg-slate-800' : 'bg-white'
                  } border ${
                    darkMode ? 'border-slate-600' : 'border-gray-200'
                  } hover:scale-105 transition-all duration-300 group flex items-center gap-3 hover:border-blue-400`}>
                    <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {framework.icon}
                    </div>
                    <span>{framework.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className={`p-8 rounded-2xl ${
              darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
            } border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            } animate-slide-right shadow-lg hover:shadow-2xl transition-all duration-300`}>
              <h3 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                <Database className="w-6 h-6" />
                Development Tools
              </h3>
              <div className="space-y-4">
                {skills.tools.map((tool, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    darkMode ? 'bg-slate-800' : 'bg-white'
                  } border ${
                    darkMode ? 'border-slate-600' : 'border-gray-200'
                  } hover:scale-105 transition-all duration-300 group flex items-center gap-3 hover:border-blue-400`}>
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

      {/* ============================================================================ */}
      {/* EDUCATION SECTION */}
      {/* ============================================================================ */}
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
            <div className={`p-8 rounded-2xl ${
              darkMode ? 'bg-slate-800/50' : 'bg-white'
            } border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            } hover:scale-105 transition-all duration-300 animate-slide-left shadow-lg hover:shadow-2xl`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-400/20">
                    <GraduationCap className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">
                      Information Systems Management Technician
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Pedro Alexandrino Secondary School
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                } mt-4 lg:mt-0 self-start`}>
                  2025
                </span>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Graduating in 2025 with practical experience in full-stack development and AI solutions integration.
              </p>
            </div>

            {/* Educação Básica */}
            <div className={`p-8 rounded-2xl ${
              darkMode ? 'bg-slate-800/50' : 'bg-white'
            } border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            } hover:scale-105 transition-all duration-300 animate-slide-right shadow-lg hover:shadow-2xl`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-400/20">
                    <GraduationCap className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">
                      Basic Education
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      9th Grade Completed
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                } mt-4 lg:mt-0 self-start`}>
                  2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================================================ */}
      <section id="contact" className={`py-24 px-6 relative z-10 ${
        darkMode ? 'bg-slate-800/50' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ready to collaborate on your next project? Let's connect!
            </p>
          </div>

          {/* Cards de contato */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <a
              href="mailto:kennedysilva2k22@gmail.com"
              className={`p-8 rounded-2xl ${
                darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
              } border ${
                darkMode ? 'border-slate-700' : 'border-gray-200'
              } hover:scale-105 transition-all duration-300 group cursor-glow animate-slide-left shadow-lg hover:shadow-2xl`}
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold mb-2 text-blue-400">Email</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                kennedysilva2k22@gmail.com
              </p>
            </a>

            <a
              href="tel:+351964619289"
              className={`p-8 rounded-2xl ${
                darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
              } border ${
                darkMode ? 'border-slate-700' : 'border-gray-200'
              } hover:scale-105 transition-all duration-300 group cursor-glow animate-fade-up shadow-lg hover:shadow-2xl`}
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold mb-2 text-blue-400">Phone</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                +351 964 619 289
              </p>
            </a>

            <a
              href="https://github.com/kennedysilva8907"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-8 rounded-2xl ${
                darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
              } border ${
                darkMode ? 'border-slate-700' : 'border-gray-200'
              } hover:scale-105 transition-all duration-300 group cursor-glow animate-slide-right shadow-lg hover:shadow-2xl`}
            >
              <Github className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold mb-2 text-blue-400">GitHub</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                @kennedysilva8907
              </p>
            </a>
          </div>

          {/* Card de disponibilidade */}
          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-slate-900/50' : 'bg-gray-50'
          } border ${
            darkMode ? 'border-slate-700' : 'border-gray-200'
          } animate-fade-up shadow-lg`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">Let's Work Together</h3>
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Currently available for new opportunities in full-stack development, 
              AI integration projects, and remote collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* FOOTER */}
      {/* ============================================================================ */}
      <footer className={`py-12 px-6 border-t relative z-10 ${
        darkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-blue-400" />
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Kennedy Silva. Built with React & Tailwind CSS.
            </p>
          </div>
          <button 
            onClick={() => scrollToSection('home')}
            className="text-blue-400 hover:text-blue-500 transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
