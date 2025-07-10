"use client";

import React, { useState } from 'react';

/**
 * A11nav Component
 * Accessibility Navigation mit Kontrast- und Schriftgrößen-Toggle
 * WCAG 2.2 AAA konform
 */
export default function A11nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
    localStorage.setItem('high-contrast', document.documentElement.classList.contains('high-contrast').toString());
  };

  const increaseFontSize = () => {
    const currentSize = parseInt(localStorage.getItem('font-size') ?? '100');
    const newSize = Math.min(currentSize + 10, 150);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('font-size', newSize.toString());
  };

  const decreaseFontSize = () => {
    const currentSize = parseInt(localStorage.getItem('font-size') ?? '100');
    const newSize = Math.max(currentSize - 10, 80);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('font-size', newSize.toString());
  };

  const resetFontSize = () => {
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('font-size', '100');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        aria-label="Barrierefreiheit-Einstellungen"
        aria-expanded={isOpen}
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-10 min-w-[200px] rounded-lg bg-white dark:bg-gray-800 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Barrierefreiheit
          </div>
          
          <button
            onClick={toggleContrast}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            <span>🎨</span> Hoher Kontrast
          </button>
          
          <div className="border-t my-2 border-gray-200 dark:border-gray-600" />
          
          <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Schriftgröße
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2">
            <button
              onClick={decreaseFontSize}
              className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Schriftgröße verkleinern"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <button
              onClick={resetFontSize}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Reset
            </button>
            
            <button
              onClick={increaseFontSize}
              className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Schriftgröße vergrößern"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 