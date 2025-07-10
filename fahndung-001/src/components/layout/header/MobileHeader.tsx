"use client";

import React from 'react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import A11nav from '../ui/a11nav';
import UserAuth from '../ui/UserAuth';
import { SearchModal } from './SearchModal';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  breadcrumb?: React.ReactNode;
}

/**
 * MobileHeader Component
 * Mobile Navigation Bar (unter 1024px)
 * Kompakte Header-Leiste mit Hamburger Menu und Breadcrumbs
 */
export function MobileHeader({ onMenuToggle, breadcrumb }: MobileHeaderProps) {
  return (
    <div className="lg:hidden w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Logo size="md" />

        {/* Mobile Controls */}
        <div className="flex items-center gap-3">
          <SearchModal size="compact" />
          <UserAuth variant="mobile" size="compact" />
          
          {/* Hamburger Menu Button */}
          <button
            onClick={onMenuToggle}
            className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Mobilmenü öffnen"
            aria-expanded="false"
            aria-controls="mobile-menu"
            type="button"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Breadcrumbs - unter der Hauptnavigation */}
      {breadcrumb && (
        <div className="px-6 pb-3 border-t border-gray-100 dark:border-gray-800">
          <div className="pt-3">
            {breadcrumb}
          </div>
        </div>
      )}
    </div>
  );
}