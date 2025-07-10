"use client";

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

interface HoverMegaMenuProps {
  title: string;
}

interface MenuItem {
  label: string;
  href: string;
  description: string;
  urgent?: boolean;
}

/**
 * HoverMegaMenu Component
 * Desktop Dropdown mit Hover + Click Support
 * Keyboard Navigation und Focus Management
 * Jetzt mit Schadcn/UI NavigationMenu
 */
export function HoverMegaMenu({ title }: HoverMegaMenuProps) {
  // Menu Data
  const menuData: Record<string, MenuItem[]> = {
    'SICHERHEIT': [
      { 
        label: 'Aktuelle Fahndungen', 
        href: '/fahndungen/aktuell', 
        description: 'Öffentliche Fahndungen und Eilmeldungen', 
        urgent: true 
      },
      { 
        label: 'Vermisste Personen', 
        href: '/vermisste', 
        description: 'Vermisstenfälle in Baden-Württemberg'
      },
      { 
        label: 'Gesuchte Straftäter', 
        href: '/gesuchte', 
        description: 'Öffentliche Straftätersuche'
      },
      { 
        label: 'Sicherheitswarnungen', 
        href: '/warnungen', 
        description: 'Aktuelle Warnungen und Betrugsmeldungen'
      }
    ],
    'SERVICE': [
      { 
        label: 'Hinweise melden', 
        href: '/hinweise/melden', 
        description: 'Sichere Hinweisübermittlung'
      },
      { 
        label: 'Online-Anzeige', 
        href: '/anzeige/online', 
        description: 'Strafanzeige online erstatten'
      },
      { 
        label: 'Notruf & Kontakt', 
        href: '/kontakt', 
        description: 'Notrufnummern und Dienststellen'
      },
      { 
        label: 'Bürgerservice', 
        href: '/service', 
        description: 'Führungszeugnis und Services'
      }
    ],
    'POLIZEI': [
      { 
        label: 'Über die Polizei BW', 
        href: '/ueber-uns', 
        description: 'Organisation und Aufgaben'
      },
      { 
        label: 'Dienststellen', 
        href: '/dienststellen', 
        description: 'Standorte und Öffnungszeiten'
      },
      { 
        label: 'Karriere', 
        href: '/karriere', 
        description: 'Ausbildung und Stellenangebote'
      },
      { 
        label: 'Presse', 
        href: '/presse', 
        description: 'Pressemitteilungen und Medien'
      }
    ]
  };

  const items = menuData[title] ?? [];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-96 p-4">
              <div className="grid gap-1">
                {items.map((item, index) => (
                  <NavigationMenuLink
                    key={item.href}
                    asChild
                  >
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                        item.urgent 
                          ? 'hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 border border-red-200 dark:border-red-800' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800'
                      )}
                      aria-describedby={`${title}-${index}-desc`}
                    >
                      <div className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0",
                        item.urgent ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
                      )}>
                        {item.urgent ? '⚠️' : '📄'}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn(
                          "font-medium text-sm",
                          item.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                        )}>
                          {item.label}
                          {item.urgent && (
                            <span className="ml-2 text-xs text-red-600 dark:text-red-400" aria-label="Eiliger Fall">
                              (EILIG)
                            </span>
                          )}
                        </span>
                        <span 
                          id={`${title}-${index}-desc`}
                          className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                        >
                          {item.description}
                        </span>
                      </div>
                    </a>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}