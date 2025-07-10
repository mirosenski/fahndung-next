"use client";

import React from 'react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import A11nav from '../ui/a11nav';
import UserAuth from '../ui/UserAuth';
import { HoverMegaMenu } from './HoverMegaMenu';
import { SearchModal } from './SearchModal';
import A11accessDropdown from '../ui/A11accessDropdown';

interface DesktopHeaderProps {
  isScrolled: boolean;
  breadcrumb?: React.ReactNode;
}

/**
 * DesktopHeader Component
 * Desktop Navigation (1024px+) mit Glassmorphism
 * Scroll-adaptive Größe und Schatten
 */
export default function DesktopHeader({ isScrolled, breadcrumb }: DesktopHeaderProps) {
  return (
    <div className={`hidden lg:block mx-auto w-full max-w-[1273px] rounded-[10px] border border-gray-300/70 dark:border-white/20 backdrop-blur-[50px] bg-white/60 dark:bg-gray-900/40 px-6 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'mt-2 h-auto shadow-xl shadow-black/10 bg-white/80 dark:bg-gray-900/50' 
        : 'mt-4 h-auto shadow-lg shadow-black/5'
    }`}>
      <div className="w-full flex items-center justify-between pt-4 pb-2">
        {/* Logo */}
        <Logo size={isScrolled ? "md" : "lg"} />
        {/* Navigation */}
        <nav 
          className="flex items-center gap-4" 
          role="navigation" 
          aria-label="Hauptnavigation Desktop"
        >
          {/* Mega Menu Items */}
          <HoverMegaMenu title="SICHERHEIT" />
          <HoverMegaMenu title="SERVICE" />
          <HoverMegaMenu title="POLIZEI" />
          {/* Right Actions */}
          <div className="flex items-center gap-3 ml-6">
            <ThemeToggle />
            <SearchModal size={isScrolled ? 'compact' : 'default'} />
            <UserAuth variant="desktop" size={isScrolled ? 'compact' : 'default'} />
            <A11accessDropdown />
          </div>
        </nav>
      </div>
      {/* Breadcrumb direkt unter der Navigation, innerhalb der Box */}
      {breadcrumb && (
        <div className="w-full pb-2">
          {breadcrumb}
        </div>
      )}
    </div>
  );
}