"use client";

import React from 'react';
import DesktopHeader from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileMenu } from './MobileMenu';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import { useMobileMenu } from './hooks/useMobileMenu';

interface HeaderProps {
  breadcrumb: React.ReactNode;
}

/**
 * Header Component - Main Container
 * Orchestriert Desktop/Mobile Navigation mit Scroll-Effekten
 * WCAG 2.2 AAA konform mit Skip-Links
 */
export default function Header({ breadcrumb }: HeaderProps) {
  const { isScrolled } = useHeaderScroll();
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <>
      {/* Skip Link für Screenreader */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:ring-4 focus:ring-blue-300"
        tabIndex={1}
      >
        Zum Hauptinhalt springen
      </a>

      {/* Fixed Header Container */}
      <header 
        className="fixed top-0 left-0 w-full z-50"
        role="banner"
        aria-label="Hauptnavigation Fahndungsportal"
      >
        {/* Desktop Navigation (1024px+) */}
        <DesktopHeader isScrolled={isScrolled} breadcrumb={breadcrumb} />
        {/* Mobile Navigation (unter 1024px) */}
        <MobileHeader onMenuToggle={toggle} breadcrumb={breadcrumb} />
      </header>

      {/* Mobile Full-Screen Menu */}
      <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
}