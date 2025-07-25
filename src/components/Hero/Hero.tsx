import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Coffee, User } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
  typedText: string;
  onScrollToSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ darkMode, typedText, onScrollToSection }) => {
  const [displayedName, setDisplayedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const fullName = 'Kennedy Silva';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        
        // Cursor piscando após completar
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 600);
        
        return () => clearInterval(cursorInterval);
      }
    }, 200); // Velocidade de digitação

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 md:pt-20 relative z-10">
      {/* Código flutuante no canto superior direito */}
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

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Texto principal  */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-slide-left">
            <div className="space-y-4 lg:space-y-4">
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block">
                  {displayedName.split(' ')[0] || ''}
                  {!isTypingComplete && displayedName.split(' ').length === 1 && (
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 inline-block ml-1 align-top`}>
                      <span className="inline-block w-1 h-[3rem] sm:h-[3.5rem] md:h-[4.5rem] lg:h-[3.5rem] xl:h-[5rem] bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500"></span>
                    </span>
                  )}
                </span>
                <br />
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'} inline-block`}>
                  {displayedName.split(' ')[1] || ''}
                  {!isTypingComplete && displayedName.split(' ').length === 2 && (
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 inline-block ml-1 align-top`}>
                      <span className="inline-block w-1 h-[3rem] sm:h-[3.5rem] md:h-[4.5rem] lg:h-[3.5rem] xl:h-[5rem] bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500"></span>
                    </span>
                  )}
                  {isTypingComplete && (
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 inline-block ml-1 align-top`}>
                      <span className="inline-block w-1 h-[3rem] sm:h-[3.5rem] md:h-[4.5rem] lg:h-[3.5rem] xl:h-[5rem] bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500"></span>
                    </span>
                  )}
                </span>
              </h1>
              
             
              <div className="px-2 sm:px-0">
                <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-blue-400 font-medium flex items-center justify-center lg:justify-start gap-2 flex-wrap">              
                  <span className="text-center lg:text-left leading-snug">Information Systems Management Technician</span>
                </p>
              </div>
              
              
              <div className="px-2 sm:px-0">
                <p className={`text-base sm:text-lg lg:text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto lg:mx-0`}>
                  Full-stack developer with expertise in AI solutions, ASP.NET, and database management. 
                  Passionate about creating innovative digital experiences.
                </p>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
              <button
                onClick={() => onScrollToSection('contact')}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium cursor-glow flex items-center justify-center gap-3 text-base shadow-lg"
              >
                <Coffee className="w-5 h-5" />
                Get In Touch
              </button>
              <a
                href="https://github.com/kennedysilva8907"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 font-medium text-base shadow-lg ${
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
          <div className="flex justify-center lg:justify-end animate-slide-right mt-8 lg:mt-0">
            <div className="relative group">
              {/* Efeito de brilho animado de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 scale-110 animate-pulse"></div>
              
              {/* Partículas de código ao redor da imagem */}
              <div className="absolute inset-0 hidden sm:block">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute text-xs sm:text-sm font-mono opacity-40 animate-bounce ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  >
                    {['[', ']', '()', '=>', '&&'][i % 5]}
                  </div>
                ))}
              </div>
              
              {/* Container principal da imagem  */}
              <div className={`relative w-[220px] h-[324px] sm:w-[240px] sm:h-[352px] lg:w-[270px] lg:h-[396px] rounded-3xl overflow-hidden border-4 ${
                darkMode ? 'border-slate-600' : 'border-gray-300'
              } shadow-2xl transform transition-all duration-500 group-hover:scale-105`}>
                
                {/* Gradiente overlay superior */}
                <div className="absolute top-0 left-0 right-0 h-16 lg:h-20 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
                
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

                {/* Fallback */}
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-center ${
                    darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}
                  style={{ display: 'none' }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-medium text-blue-400">Kennedy Silva</p>
                      <p className="text-xs text-gray-400 mt-1">Full-Stack Developer</p>
                    </div>
                  </div>
                </div>
                
                {/* Overlay com informações  */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 lg:p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <div className="text-white">
                    <h3 className="font-bold text-base lg:text-lg mb-1">Kennedy Silva</h3>
                    <p className="text-xs lg:text-sm opacity-90">Full-Stack Developer</p>
                    
                    {/* Status disponível  */}
                    <div className="flex items-center gap-2 lg:gap-3 mt-3 lg:mt-4 bg-black/30 backdrop-blur-sm rounded-full px-2 lg:px-3 py-1.5 lg:py-2 w-fit">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-400 rounded-full"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                      <span className="text-xs font-medium text-green-300">Available for work</span>
                    </div>
                  </div>
                </div>
              </div>
              
             
              <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-blue-400 opacity-60 hidden xl:block">
                DEVELOPER
              </div>
              <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 rotate-90 text-xs font-medium text-purple-400 opacity-60 hidden xl:block">
                CREATIVE
              </div>
            </div>
          </div>
        </div>

        {/* Seta para scroll */}
        <div className="text-center mt-12 lg:mt-16 animate-fade-up">
          <ChevronDown 
            className={`w-6 h-6 lg:w-8 lg:h-8 mx-auto cursor-pointer transition-colors duration-300 hover:text-blue-400 animate-bounce ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
            onClick={() => onScrollToSection('about')}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;