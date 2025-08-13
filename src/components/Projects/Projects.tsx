import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, ExternalLink, Github, Globe, Zap, Star, Brain,
  Utensils, Sparkles, Eye, EyeOff, Lock
} from 'lucide-react';
import { ProjectsProps, Project } from '../../types';

const Projects: React.FC<ProjectsProps> = ({ darkMode, isVisible }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [previewLoaded, setPreviewLoaded] = useState<{ [key: number]: boolean }>({});
  const [showPreview, setShowPreview] = useState<{ [key: number]: boolean }>({});

  // REMOVIDO: isAutoPlaying e useEffect do auto-play

  // (SEM ALTERAÇÕES DE DADOS)
  const projects: Project[] = [
    {
      id: 1,
      title: "GastroAI",
      description: "Artificial intelligence specialized in gastronomy to assist amateur and professional cooks.",
      longDescription: "GastroAI is an innovative application that combines artificial intelligence with gastronomy. Developed to revolutionize the culinary experience, it offers personalized recipes, professional tips, and intelligent meal planning.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Gemini API"],
      image: "/projects/gastroai-preview.png",
      liveUrl: "https://gastro-ai-pap.vercel.app/",
      githubUrl: "https://github.com/kennedysilva8907/gastro-ai",
      isPrivateRepo: true,
      features: [
        "AI-powered personalized recipes",
        "Professional cooking tips",
        "Intelligent meal planning",
        "Interactive cooking techniques",
        "Responsive and intuitive interface"
      ],
      category: "AI & Web Development",
      status: "live",
      year: "2025"
    },
    {
      id: 2,
      title: "Project in Development",
      description: "New innovative project in development that will be revealed soon.",
      longDescription: "This is a placeholder for the next incredible project that is being developed. Stay tuned for more news and revolutionary features!",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      image: "/projects/coming-soon.png",
      liveUrl: "#",
      isPrivateRepo: false,
      features: [
        "In development",
        "Innovative features",
        "Modern design",
        "Cutting-edge technologies"
      ],
      category: "Web Development",
      status: "in-progress",
      year: "2025"
    }
  ];

  const nextProject = () => {
    setCurrentProject(prev => (prev + 1 + projects.length) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject(prev => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  const togglePreview = (projectId: number) => {
    setShowPreview(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handlePreviewLoad = (projectId: number) => {
    setPreviewLoaded(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  const handleGithubClick = (project: Project) => {
    if (project.isPrivateRepo) {
      alert('Este repositório é privado. Contacta-me para discutir o código.');
      return;
    }
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  const currentProjectData = projects[currentProject];

  // Render do preview (VOLTADO AO ORIGINAL - site funcional completo)
  const renderProjectPreview = (project: Project) => {
    const isPreviewVisible = showPreview[project.id];
    const isLoaded = previewLoaded[project.id];
    
    if (project.liveUrl === '#') {
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20"></div>
          <div className="relative z-10 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-blue-200 mb-4">Innovative Project</p>
            <div className="flex justify-center gap-2">
              {['⚡', '🚀', '💡', '🎯', '✨'].map((emoji, i) => (
                <span key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        {/* Botão Mostrar/Esconder Preview */}
        <button
          onClick={() => togglePreview(project.id)}
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            darkMode 
              ? 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600' 
              : 'bg-white/90 hover:bg-gray-50 text-gray-900 border border-gray-200'
          } backdrop-blur-sm shadow-lg hover:scale-105`}
          aria-label={isPreviewVisible ? 'Esconder preview' : 'Mostrar preview'}
        >
          {isPreviewVisible ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Preview
            </>
          )}
        </button>

        {isPreviewVisible ? (
          <div className="relative w-full h-full">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-30">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white font-medium">Loading preview...</p>
                </div>
              </div>
            )}

            {/* IFRAME ORIGINAL - SITE FUNCIONAL COMPLETO */}
            <iframe
              src={project.liveUrl}
              className="absolute inset-0 w-full h-full rounded-lg border-0"
              title={`Preview of ${project.title}`}
              onLoad={() => handlePreviewLoad(project.id)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            />

            {/* Botão para abrir em nova aba (aparece no hover) */}
            <div 
              className="absolute inset-0 bg-transparent hover:bg-blue-500/5 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 z-20 pointer-events-none"
              aria-hidden="true"
            >
              <button
                type="button"
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="pointer-events-auto bg-blue-500/90 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transform scale-90 hover:scale-100 transition-transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                aria-label="Abrir site em nova aba"
              >
                <ExternalLink className="w-5 h-5" />
                Open Site
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center select-none">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-red-400/20 to-yellow-400/20"></div>
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Utensils className="w-5 h-5 text-orange-300" />
                <span className="text-orange-200">Culinary Intelligence</span>
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="flex justify-center gap-2">
                {['🍳', '📚', '🔪', '🗓️', '👨‍🍳'].map((emoji, i) => (
                  <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                    {emoji}
                  </span>
                ))}
              </div>
              <p className="text-orange-200 text-sm mt-4 opacity-75">
                Click "Show Preview" to view the website
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="projects"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover some of the projects I've developed, from innovative web applications
            to artificial intelligence solutions.
          </p>
        </div>
        
        <div className="relative">
          <div className={`rounded-3xl overflow-hidden shadow-2xl border ${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          }`}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Área de Preview */}
              <div className="relative h-80 sm:h-96 lg:h-auto lg:min-h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10 pointer-events-none"></div>
                <div className={`w-full h-full ${
                  darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  {renderProjectPreview(currentProjectData)}
                </div>
              </div>

              {/* Área de Conteúdo */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">
                      {currentProjectData.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {currentProjectData.title}
                  </h3>

                  <p className={`text-base sm:text-lg mb-6 leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {currentProjectData.longDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {currentProjectData.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className={`flex items-center gap-3 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProjectData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode 
                              ? 'bg-slate-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={currentProjectData.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-3 shadow-lg ${
                      currentProjectData.liveUrl === '#' 
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                    }`}
                    onClick={(e) => {
                      if (currentProjectData.liveUrl === '#') {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Globe className="w-5 h-5" />
                    {currentProjectData.liveUrl === '#' ? 'Coming Soon' : 'View Project'}
                  </a>
                  
                  <button
                    onClick={() => handleGithubClick(currentProjectData)}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg ${
                      currentProjectData.isPrivateRepo
                        ? darkMode
                          ? 'border-amber-600 text-amber-400 hover:bg-amber-900/20'
                          : 'border-amber-500 text-amber-600 hover:bg-amber-50'
                        : darkMode 
                          ? 'border-slate-600 hover:border-blue-400 text-gray-300 hover:text-white hover:bg-slate-700' 
                          : 'border-gray-300 hover:border-blue-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {currentProjectData.isPrivateRepo ? (
                      <>
                        <Lock className="w-5 h-5" />
                        Private Repo
                      </>
                    ) : (
                      <>
                        <Github className="w-5 h-5" />
                        View Code
                      </>
                    )}
                  </button>
                </div>

                {currentProjectData.isPrivateRepo && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    darkMode ? 'bg-amber-900/20 text-amber-300 border border-amber-800' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span className="font-medium">Private Repository</span>
                    </div>
                    <p className="mt-1 opacity-90">
                      This repository is private. Contact me directly to discuss the source code and implementation details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {projects.length > 1 && (
            <>
              <button
                onClick={prevProject}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 ${
                  darkMode 
                    ? 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600' 
                    : 'bg-white/90 hover:bg-gray-50 text-gray-900 border border-gray-200'
                } backdrop-blur-sm shadow-lg`}
                aria-label="Projeto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProject}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 ${
                  darkMode 
                    ? 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600' 
                    : 'bg-white/90 hover:bg-gray-50 text-gray-900 border border-gray-200'
                } backdrop-blur-sm shadow-lg`}
                aria-label="Próximo projeto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {projects.length > 1 && (
          <div className="flex justify-center mt-8 gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? 'bg-blue-500 scale-125'
                    : darkMode
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para projeto ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
