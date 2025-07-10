"use client";

import React, { useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ThemeToggle from '../ui/ThemeToggle';
import { navigationData } from '../../constants/navigationData';
import type { MenuSection } from '../../types/header';
import A11accessDropdown from '../ui/A11accessDropdown';
import { cn } from "~/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 * Full-Screen Mobile Navigation mit Accordion-Struktur
 * Focus-Trap und Keyboard Navigation
 * Jetzt mit Schadcn/UI Dialog und Accordion
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Menu Data
  const menuSections: MenuSection[] = [
    {
      title: 'SICHERHEIT',
      items: navigationData.SICHERHEIT
    },
    {
      title: 'SERVICE',
      items: navigationData.SERVICE
    },
    {
      title: 'POLIZEI',
      items: navigationData.POLIZEI
    }
  ];

  // Focus Management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="lg:hidden !fixed !inset-0 !max-w-none !w-screen !h-screen !rounded-none !left-0 !top-0 !translate-x-0 !translate-y-0 z-[9999] p-0 border-0 bg-white dark:bg-gray-900" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="flex flex-col items-center justify-center pt-3 pb-6 border-b border-gray-200 dark:border-gray-700 gap-2">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white text-center mt-0 mb-3">
            Fahndungsportal
          </DialogTitle>
          <div className="flex flex-row items-center justify-center gap-6 w-full mb-0">
            <ThemeToggle />
            <div className="relative inline-block">
              <A11accessDropdown centered onClose={onClose} />
            </div>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Menü schließen"
              type="button"
            >
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </DialogHeader>

        {/* Menu Sections */}
        <div className="flex-1 max-h-[60vh] overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {menuSections.map((section) => (
              <AccordionItem key={section.title} value={section.title} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200">
                  <span className="font-semibold text-gray-900 dark:text-white">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="px-4" role="region" aria-label={`${section.title} Links`}>
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 mx-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                          item.urgent 
                            ? 'hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 border border-red-200 dark:border-red-800' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800'
                        )}
                        onClick={onClose}
                        aria-label={item.urgent ? `${item.label} - Eiliger Fall` : item.label}
                      >
                        <div className={cn(
                          "w-5 h-5 flex-shrink-0",
                          item.urgent ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
                        )}>
                          {item.urgent ? '⚠️' : '📄'}
                        </div>
                        <span className={cn(
                          "font-medium",
                          item.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                        )}>
                          {item.label}
                          {item.urgent && (
                            <span className="ml-2 text-xs" aria-label="Eiliger Fall">
                              (EILIG)
                            </span>
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-end">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={onClose}
            >
              Hinweis melden
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}