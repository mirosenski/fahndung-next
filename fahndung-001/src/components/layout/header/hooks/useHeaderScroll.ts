"use client";

import { useState, useEffect } from 'react';

/**
 * useHeaderScroll Hook
 * Verwaltet Scroll-basierte Header-Effekte
 * Performance-optimiert mit passive Scroll Listener
 */
export function useHeaderScroll(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Passive scroll für bessere Performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial state
    updateScrollState();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { 
    isScrolled, 
    scrollY,
    // Utility für verschiedene Scroll-Stufen
    isDeepScrolled: scrollY > 200,
    scrollProgress: Math.min(scrollY / 500, 1) // 0-1 für Animationen
  };
}