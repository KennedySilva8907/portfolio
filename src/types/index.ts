import React from 'react';

// ============================================================================
// SKILL TYPES
// ============================================================================

export interface Skill {
  name: string;
  level: string;
  percentage: number;
  icon: React.ReactNode;
}

export interface FrameworkTool {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategories {
  programming: Skill[];
  frameworks: FrameworkTool[];
  tools: FrameworkTool[];
}

// ============================================================================
// EXPERIENCE TYPES
// ============================================================================

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

// ============================================================================
// VISIBILITY STATE
// ============================================================================

export interface VisibilityState {
  [key: string]: boolean;
}

// ============================================================================
// COMPONENT PROPS - TODOS OS TIPOS NECESSÁRIOS
// ============================================================================

export interface SectionProps {
  darkMode: boolean;
  isVisible: boolean;
}

export interface NavigationProps {
  darkMode: boolean;
  activeSection: string;
  mobileMenuOpen: boolean;
  headerText: string;
  onToggleDarkMode: () => void;
  onToggleMobileMenu: () => void;
  onScrollToSection: (section: string) => void;
}

export interface HeroProps {
  darkMode: boolean;
  typedText: string;
  headerText?: string;
  onScrollToSection: (section: string) => void;
}

export interface ExperienceProps {
  darkMode: boolean;
  experiences: Experience[];
  isVisible: boolean;
}

export interface SkillsProps {
  darkMode: boolean;
  skills: SkillCategories;
  skillsAnimated: boolean;
  isVisible: boolean;
}

export interface FooterProps {
  darkMode: boolean;
  onScrollToSection: (section: string) => void;
}

// ============================================================================
// EXPORT ADICIONAL PARA GARANTIR QUE É UM MÓDULO
// ============================================================================

export {};