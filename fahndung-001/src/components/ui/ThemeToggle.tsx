"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

/**
 * ThemeToggle Component - Einfacher Light/Dark Toggle
 * Nur Sonne/Mond - kein System-Support
 * WCAG 2.2 AAA konform mit smooth Animations
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Theme initialisieren - System-aware
  useEffect(() => {
    setMounted(true);
    
    // System-Preference Observer
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
      }
    };
    
    // Initial Theme Setup
    const savedTheme = localStorage.getItem('theme');
    const systemDark = mediaQuery.matches;
    
    let currentTheme: boolean;
    if (savedTheme) {
      currentTheme = savedTheme === 'dark';
    } else {
      currentTheme = systemDark;
    }
    
    setIsDark(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme);
    
    // System Theme Listener
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Theme umschalten
  const toggleTheme = useCallback(() => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // DOM Update mit Transition
    const root = document.documentElement;
    root.style.transition = 'color-scheme 0.3s ease, background-color 0.3s ease';
    root.classList.toggle('dark', newTheme);
    
    // localStorage Update
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Accessibility
    const message = newTheme ? 'Dunkles Theme aktiviert' : 'Helles Theme aktiviert';
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
    
    // Transition Cleanup
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  }, [isDark]);

  // Keyboard Support
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  }, [toggleTheme]);

  // Hydration Protection
  if (!mounted) {
    return (
      <button 
        className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground transition-colors duration-200"
        aria-label="Theme wird geladen..."
        disabled
      >
        <SunIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className="group relative inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ease-out hover:scale-110 active:scale-95"
      aria-label={`Zu ${isDark ? 'hellem' : 'dunklem'} Theme wechseln`}
      aria-pressed={isDark}
      type="button"
    >
      {/* Sonne - Light Mode */}
      <SunIcon 
        className={`w-5 h-5 transition-all duration-500 ease-out absolute inset-0 m-auto ${
          isDark 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100 group-hover:rotate-180"
        }`}
        aria-hidden="true"
      />
      
      {/* Mond - Dark Mode */}
      <MoonIcon 
        className={`w-5 h-5 transition-all duration-500 ease-out absolute inset-0 m-auto ${
          isDark 
            ? "rotate-0 scale-100 opacity-100 group-hover:-rotate-12" 
            : "-rotate-90 scale-0 opacity-0"
        }`}
        aria-hidden="true"
      />
      
      {/* Spacer für Button-Dimensionen */}
      <div className="w-5 h-5 opacity-0" aria-hidden="true" />
      
      {/* Screen Reader Status */}
      <span className="sr-only">
        {isDark ? 'Dunkles Theme aktiv' : 'Helles Theme aktiv'}
      </span>
      
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark ? "bg-blue-500/10" : "bg-yellow-500/10"
        }`}
        aria-hidden="true"
      />
    </button>
  );
} 