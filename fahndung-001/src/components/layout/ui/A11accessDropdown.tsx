"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/**
 * A11accessDropdown Component
 * Barrierefreiheits-Menü mit Leichte Sprache & Gebärdensprache
 * Icons passen sich an Dark/Light-Mode an
 */

// --- SVG-Icons als React-Komponenten ---
export const A11yIconFill = ({ className = "" }) => (
  <svg viewBox="0 0 204.1 204.1" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M201.6,97.1c-1.3-29.4-16.5-57.9-40.3-75.2C141.6,6.9,116.1.3,91.5,2.9c-19.7,2.1-38.8,10-53.8,23-15.2,12.6-26.3,30-31.7,49-4.7,17-5.1,35.3-.4,52.4,5.6,22.2,19.3,42.2,37.9,55.5,15.9,11.9,35.7,18.3,55.5,19,22.9.8,46-6.6,64-20.8,25.6-19.4,40.5-51.8,38.6-83.9ZM114.9,115.8c4.6,10.5,13.1,18.4,21,26.4-4.6,4.7-9.3,9.3-14.2,13.7-6.6-7.2-13.9-14-19.3-22.3-6.3,8.1-13.2,15.6-20.7,22.4-4.4-4.8-9-9.5-13.5-14.2,7.5-7.8,16.5-14.7,20.8-25,2.3-4.8,2.7-10.1,3.4-15.2-10.5-1.1-20.9-2-31.3-3.7.8-6.5,1.6-13,2.6-19.5,16.9,2.5,34.2,5.1,51.3,3.1,8.5-.6,17-1.8,25.5-3,.6,6.5,1.9,12.9,2.5,19.4-10.3,1.5-20.6,2.8-31,3.5.2,4.9.9,9.9,2.9,14.4ZM98.6,47.7c8.5-2.4,17.8,4.4,18.2,13.2,1.1,9-7.8,17.3-16.7,15.7-8.7-.9-14.9-10.6-12.2-18.9,1.6-4.9,5.6-9.1,10.8-10.1Z" fill="currentColor" />
  </svg>
);

export const A11yIconOutline = ({ className = "" }) => (
  <svg viewBox="0 0 204.1 204.1" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <g>
      <path d="M91.5,2.9c24.5-2.6,50.1,4.1,69.8,19,23.9,17.3,39.1,45.8,40.3,75.2,1.9,32.1-13.1,64.5-38.6,83.9-18,14.2-41.1,21.6-64,20.8-19.8-.6-39.6-7.1-55.5-19-18.6-13.3-32.3-33.3-37.9-55.5-4.7-17.1-4.3-35.4.4-52.4,5.4-19,16.5-36.4,31.7-49C52.7,12.9,71.9,5,91.5,2.9M96.2,22.1c-30.8,1.9-59.3,23.4-69.4,52.6-6.2,16.4-6.4,34.9-1.2,51.6,5.9,18.7,18.9,35,35.8,44.8,15.4,9.2,33.9,12.9,51.6,10.4,30.3-3.9,57.3-26.8,65.7-56.3,5-15.9,4.6-33.3-.8-49-6.9-20.3-22.2-37.6-41.7-46.5-12.4-5.9-26.4-8.5-40-7.5Z" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M98.6,47.7c8.5-2.4,17.8,4.4,18.2,13.2,1.1,9-7.8,17.3-16.7,15.7-8.7-.9-14.9-10.6-12.2-18.9,1.6-4.9,5.6-9.1,10.8-10.1Z" fill="currentColor" />
      <path d="M63.7,78.4c16.9,2.5,34.2,5.1,51.3,3.1,8.5-.6,17-1.8,25.5-3,.6,6.5,1.9,12.9,2.5,19.4-10.3,1.5-20.6,2.8-30.9,3.5.2,4.9.9,9.9,2.9,14.4,4.6,10.5,13.1,18.4,21,26.4-4.6,4.7-9.3,9.3-14.2,13.7-6.7-7.2-13.9-14-19.3-22.3-6.3,8.1-13.2,15.6-20.7,22.4-4.4-4.8-9-9.5-13.5-14.2,7.5-7.8,16.5-14.7,20.8-25,2.3-4.8,2.7-10.1,3.4-15.2-10.5-1.1-20.9-2-31.3-3.7.8-6.5,1.6-13,2.6-19.5Z" fill="currentColor" />
    </g>
  </svg>
);

// --- SVG für Leichte Sprache als React-Komponente ---
export const LeichteSpracheIcon = ({ className = "" }) => (
  <svg viewBox="0 0 7.24 7.7" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="3.62" cy="1.22" r="1.22" fill="currentColor" />
    <path d="M0,2.32v4.13c.54,0,1.49.06,2.46.61.36.2.65.43.88.64V3.51c-.22-.19-.48-.39-.81-.57-.95-.53-1.98-.61-2.53-.61Z" fill="currentColor" />
    <path d="M3.9,3.51v4.19c.23-.21.52-.44.88-.64.98-.55,1.93-.62,2.46-.61V2.32c-.55,0-1.59.08-2.53.61-.32.18-.59.38-.81.57Z" fill="currentColor" />
  </svg>
);

// --- SVG für Gebärdensprache: beide Hände currentColor ---
export const GebaerdenspracheIcon = ({ className = "" }) => (
  <svg viewBox="0 0 7.15 7.7" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <g>
      {/* Untere Hand */}
      <path d="M3.35,3.36s.09-.02.12.02c.03.04.03.1.02.15-.02.1-.08.18-.15.25-.1.11-.22.19-.35.27-.16.09-.33.16-.5.23-.05.02-.09.06-.09.11,0,.05.04.1.09.12.24.1.5.15.76.22.48.11.96.22,1.43.36.16.05.32.09.47.16.04.02.08.06.1.11.02.08-.02.18-.1.21-.06.02-.12,0-.18,0-.13-.02-.26-.05-.39-.08-.23-.05-.46-.09-.69-.14-.2-.04-.41-.09-.61-.12-.04,0-.09-.01-.12.02-.03.02-.03.06-.01.08.04.05.1.07.15.09.38.16.76.3,1.14.47.09.04.18.08.27.12.05.02.09.04.14.07.08.04.18.08.22.16.03.07.01.16-.04.21-.04.05-.11.07-.17.07-.12-.01-.23-.06-.34-.1-.52-.18-1.03-.37-1.54-.57-.05-.02-.12-.04-.17,0-.02.03-.01.08.02.1.08.08.18.14.27.2.26.16.52.31.78.46.13.07.26.15.38.22.06.04.12.07.17.11.03.03.05.06.05.1,0,.07-.04.14-.1.18-.05.04-.12.03-.18.01-.09-.03-.18-.08-.27-.12-.02,0-.04-.02-.05-.03-.07-.03-.13-.07-.2-.1-.02-.01-.04-.02-.07-.03-.12-.06-.23-.12-.35-.18-.05-.03-.11-.06-.16-.09-.08-.05-.17-.09-.25-.14-.08-.05-.17-.09-.25-.14-.05-.03-.1-.06-.16-.08-.04,0-.09.03-.07.07.03.07.09.12.14.17.19.18.38.36.57.54.1.1.2.19.29.29.03.04.07.08.08.13.02.07-.03.14-.09.16-.08.03-.16,0-.23-.04-.14-.08-.26-.19-.39-.29-.16-.13-.31-.26-.47-.39,0,0-.01,0-.02,0h.01c-.15-.12-.29-.25-.45-.35-.03-.02-.07-.04-.1-.06-.17-.1-.35-.19-.54-.27-.22-.1-.43-.21-.62-.37-.17-.14-.33-.31-.44-.5-.01-.03-.03-.05-.04-.08-.01-.02-.02-.05-.04-.07,0-.03.02-.04.04-.06.17-.19.33-.39.45-.62,0,0,0-.02.01-.02.04-.08.09-.17.1-.26.13.03.27,0,.39-.04.11-.04.22-.08.33-.13.09-.05.18-.11.28-.14.03-.01.07-.02.1-.02.21-.04.43-.09.63-.17.27-.1.54-.21.79-.34.08-.04.15-.08.22-.11Z" fill="currentColor" />
      {/* Obere Hand */}
      <path d="M5.13.07c.08-.06.18-.09.27-.05.05.02.09.07.1.12.01.06,0,.13-.03.19-.1.16-.21.3-.32.45-.16.21-.32.42-.46.64-.09.14-.19.28-.27.43-.02.04-.04.1-.02.14.01.03.04.03.07.03.02-.02.04-.03.06-.05.47-.46.94-.9,1.43-1.34.09-.08.18-.16.28-.23.06-.04.13-.05.2-.04.06.02.1.06.13.11.02.04.03.08.02.13-.01.07-.06.13-.11.19-.08.08-.15.16-.23.24-.13.13-.24.26-.37.38-.16.16-.31.31-.46.47-.15.15-.3.3-.44.45-.04.05-.08.09-.11.15-.01.03.02.06.04.07.04,0,.07-.02.11-.03.18-.1.35-.22.53-.34.36-.24.72-.49,1.09-.72.07-.04.14-.08.23-.08.08,0,.16.05.18.13.03.07.01.14-.03.2-.04.06-.09.1-.14.14-.28.24-.57.46-.86.68-.24.18-.48.35-.72.54-.03.03-.08.07-.08.12,0,.05.05.07.09.07.07,0,.14-.03.21-.05.43-.15.86-.3,1.3-.45.08-.03.17-.04.25,0,.04.02.07.06.08.1.02.05,0,.1-.03.14-.08.12-.21.17-.33.24-.15.08-.31.16-.47.23-.06.03-.12.06-.19.09-.15.07-.31.15-.46.22-.12.06-.24.11-.36.17-.01,0-.02.01-.02.02,0,0,0,0-.01,0-.04.02-.09.05-.13.07-.19.1-.37.21-.54.33-.09.06-.18.12-.27.17-.04.02-.08.04-.12.07-.01,0-.02.01-.03.02-.07.04-.15.06-.23.06-.22-.02-.43-.06-.64-.11-.2-.05-.4-.1-.6-.16,0,0-.01,0-.01-.01.01,0,.03,0,.04-.01.03-.01.05-.02.08-.03.06-.02.11-.05.16-.08.25-.12.49-.28.65-.51.06-.1.11-.21.1-.32,0-.09-.04-.18-.12-.23-.07-.05-.15-.05-.23-.04-.07.02-.12.06-.18.09-.07.04-.14.07-.22.11-.19.09-.39.17-.59.24-.24.08-.49.16-.75.19-.02,0-.04,0-.05,0,.06-.07.13-.14.17-.22.11-.18.16-.38.19-.59.03-.16.05-.32.1-.48.05-.16.11-.32.17-.48.09-.27.16-.55.22-.83.03-.12.05-.24.07-.36.01-.07.02-.14.04-.21.01-.04.04-.08.08-.09.05-.02.11,0,.16.04.1.08.15.21.17.33.01.11.02.21,0,.32-.01.2-.05.39-.1.58-.02.12-.05.24-.01.36,0,0,0,.02.01.02.02.05.07.08.12.09.05,0,.11,0,.16-.02.14-.07.25-.19.36-.3.07-.08.14-.17.21-.26.21-.27.42-.54.64-.8.17-.21.34-.41.53-.6.08-.09.16-.18.26-.26Z" fill="currentColor" />
    </g>
  </svg>
);

export default function A11accessDropdown({ centered = false, onClose }: { centered?: boolean; onClose?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Mouse-Over/Leave nur auf Desktop (ab lg)
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  const handleMouseEnter = () => {
    if (isDesktop) {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (isDesktop) {
      closeTimeout.current = setTimeout(() => setIsOpen(false), 150);
    }
  };
  const handleClick = () => {
    setIsOpen((v) => !v);
  };

  // Handler für Link-Klicks - schließt Dropdown und optional das mobile Menü
  const handleLinkClick = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-a11y-dropdown]')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Schriftgrößen-Logik
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

  // Theme-Toggle-Logik (wie im Original)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches;
        document.documentElement.classList.toggle('dark', newTheme);
      }
    };
    const savedTheme = localStorage.getItem('theme');
    const systemDark = mediaQuery.matches;
    let currentTheme: boolean;
    if (savedTheme) {
      currentTheme = savedTheme === 'dark';
    } else {
      currentTheme = systemDark;
    }
    document.documentElement.classList.toggle('dark', currentTheme);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return (
    <div
      className={centered ? 'relative inline-block' : 'relative'}
    >
      {/* Toggle Button */}
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex items-center justify-center ${centered ? 'w-14 h-14' : 'w-10 h-10'} p-2 rounded-lg
        ${isOpen ? 'text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-200'}
        hover:text-blue-700 dark:hover:text-blue-200
        bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        aria-label="Barrierefreiheit-Menü"
        aria-expanded={isOpen}
        type="button"
        data-a11y-dropdown-trigger
      >
        <A11yIconFill className="w-full h-full" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={
            centered
              ? 'absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 min-w-[220px] rounded-lg bg-white dark:bg-gray-800 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in'
              : 'absolute right-0 top-10 z-20 min-w-[220px] rounded-lg bg-white dark:bg-gray-800 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in'
          }
          data-a11y-dropdown
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Leichte Sprache */}
          <Link
            href="/leichte-sprache"
            className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors group"
            onClick={handleLinkClick}
          >
            <span className="relative w-6 h-6 flex items-center justify-center">
              <LeichteSpracheIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors" />
            </span>
            Leichte Sprache
          </Link>

          <div className="border-t my-1 border-gray-200 dark:border-gray-700" />

          {/* Gebärdensprache */}
          <Link
            href="/gebaerdensprache"
            className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 focus:bg-blue-100 dark:focus:bg-blue-800 outline-none transition-colors group"
            tabIndex={0}
            role="menuitem"
            onClick={handleLinkClick}
          >
            <span className="relative w-6 h-6 flex items-center justify-center">
              <GebaerdenspracheIcon className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-200 group-focus:text-blue-700 dark:group-focus:text-blue-200 transition-colors" />
            </span>
            Gebärdensprache
          </Link>

          {/* --- Schriftgröße --- */}
          <div className="border-t my-2 border-gray-200 dark:border-gray-700" />
          <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">Schriftgröße</div>
          <div className="flex items-center gap-2 px-4 py-2 justify-center">
            <button
              onClick={decreaseFontSize}
              className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Schriftgröße verkleinern"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={resetFontSize}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              type="button"
            >
              Reset
            </button>
            <button
              onClick={increaseFontSize}
              className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Schriftgröße vergrößern"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Media Query für mobile Zentrierung, nur wenn centered aktiv ist */}
      {centered && (
        <style jsx>{`
          @media (max-width: 1024px) {
            [data-a11y-dropdown] {
              left: 50% !important;
              transform: translateX(-50%) !important;
              right: auto !important;
            }
          }
        `}</style>
      )}
    </div>
  );
} 