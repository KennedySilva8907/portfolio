import React from 'react';
import {
  FileCode,
  Terminal,
  Code,
  Zap,
  Monitor,
  Database,
  Server,
  Globe,
  Layers,
  Palette,
  GitBranch,
} from 'lucide-react';
import { SkillCategories, Experience } from '../types';

/**
 * Array de snippets de código para animação de fundo
 */
export const CODE_SNIPPETS: string[] = [
  'const developer = "Kennedy Silva";',
  "function createAwesome() {",
  "  return innovation + creativity;",
  "}",
  "class FullStackDev {",
  "  constructor() {",
  '    this.skills = ["C#", "JavaScript", "Python"];',
  '    this.passion = "coding";',
  "  }",
  "}",
  "if (challenge.isComplex()) {",
  "  solution = findCreativeWay();",
  "}",
  "const future = await buildTomorrow();",
];

/**
 * Array de textos para animação do header
 */
export const HEADER_TEXTS: string[] = [
  "Building Tomorrow",
  "Coding Dreams", 
  "Creating Solutions",
  "Full-Stack Magic",
];

/**
 * Seções de navegação
 */
export const NAVIGATION_SECTIONS = [
  "home",
  "about", 
  "experience",
  "skills",
  "education",
  "contact",
] as const;

/**
 * Dados das skills organizadas por categoria
 */
export const SKILLS_DATA: SkillCategories = {
  programming: [
    {
      name: "C#",
      level: "Advanced",
      percentage: 90,
      icon: React.createElement(FileCode, { className: "w-5 h-5" }),
    },
    {
      name: "C++",
      level: "Intermediate", 
      percentage: 70,
      icon: React.createElement(Terminal, { className: "w-5 h-5" }),
    },
    {
      name: "Python",
      level: "Intermediate",
      percentage: 60,
      icon: React.createElement(Code, { className: "w-5 h-5" }),
    },
    {
      name: "JavaScript",
      level: "Advanced",
      percentage: 85,
      icon: React.createElement(Zap, { className: "w-5 h-5" }),
    },
    {
      name: "TypeScript",
      level: "Intermediate",
      percentage: 55,
      icon: React.createElement(Code, { className: "w-5 h-5" }),
    },
    {
      name: "HTML5/CSS3",
      level: "Advanced",
      percentage: 90,
      icon: React.createElement(Monitor, { className: "w-5 h-5" }),
    },
    {
      name: "SQL",
      level: "Intermediate",
      percentage: 75,
      icon: React.createElement(Database, { className: "w-5 h-5" }),
    },
  ],
  frameworks: [
    { name: "ASP.NET", icon: React.createElement(Server, { className: "w-5 h-5" }) },
    { name: "React", icon: React.createElement(Code, { className: "w-5 h-5" }) },
    { name: "REST APIs", icon: React.createElement(Globe, { className: "w-5 h-5" }) },
    { name: "Firebase", icon: React.createElement(Layers, { className: "w-5 h-5" }) },
    { name: "SQL Server", icon: React.createElement(Database, { className: "w-5 h-5" }) },
    { name: "Tailwind CSS", icon: React.createElement(Palette, { className: "w-5 h-5" }) },
  ],
  tools: [
    { name: "Visual Studio Code", icon: React.createElement(Code, { className: "w-5 h-5" }) },
    { name: "Git & GitHub", icon: React.createElement(GitBranch, { className: "w-5 h-5" }) },
    { name: "SSMS", icon: React.createElement(Database, { className: "w-5 h-5" }) },
    { name: "Canva", icon: React.createElement(Palette, { className: "w-5 h-5" }) },
    { name: "Adobe Photoshop", icon: React.createElement(Palette, { className: "w-5 h-5" }) },
    { name: "Microsoft Office", icon: React.createElement(FileCode, { className: "w-5 h-5" }) },
  ],
};

/**
 * Dados das experiências profissionais
 */
export const EXPERIENCES_DATA: Experience[] = [
  {
    title: "Technical Project Evaluator & Corrector",
    company: "Online Training Company",
    duration: "1 year (Remote)",
    description: [
      "Conducted technical correction and evaluation of database projects",
      "Performed expert code reviews in C# and C++",
      "Provided technical mentoring and constructive feedback to students",
      "Identified and resolved complex technical problems",
      "Remote project correction and quality assurance",
    ],
  },
  {
    title: "Development Intern",
    company: "CINEL Lisbon",
    duration: "400+ hours (Remote)",
    description: [
      "Complete web application development with ASP.NET",
      "Creating and integrating custom REST APIs",
      "Database management and optimization with SQL Server",
      "Implementation of business logic and data validation",
    ],
  },
];