// Icons werden als Emojis oder SVG dargestellt

export interface MenuItem {
  label: string;
  href: string;
  urgent?: boolean;
  description?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const navigationData = {
  SICHERHEIT: [
    {
      label: 'Aktuelle Fahndungen',
      href: '/fahndung',
      description: 'Alle aktiven Fahndungen anzeigen'
    },
    {
      label: 'Vermisste Personen',
      href: '/fahndung/vermisst',
      urgent: true,
      description: 'Vermisste Personen suchen'
    },
    {
      label: 'Eilige Fälle',
      href: '/fahndung/eilig',
      urgent: true,
      description: 'Eilige Fahndungsfälle'
    }
  ],
  SERVICE: [
    {
      label: 'Hilfe & FAQ',
      href: '/hilfe',
      description: 'Häufig gestellte Fragen'
    },
    {
      label: 'Kontakt',
      href: '/kontakt',
      description: 'Kontakt zur Polizei'
    },
    {
      label: 'Impressum',
      href: '/impressum',
      description: 'Rechtliche Informationen'
    },
    {
      label: 'Datenschutz',
      href: '/datenschutz',
      description: 'Datenschutzerklärung'
    }
  ],
  POLIZEI: [
    {
      label: 'Dashboard',
      href: '/dashboard',
      description: 'Polizei-Dashboard'
    },
    {
      label: 'Neue Fahndung',
      href: '/fahndung/erstellen',
      description: 'Fahndung erstellen'
    },
    {
      label: 'Meine Fahndungen',
      href: '/fahndung/meine',
      description: 'Eigene Fahndungen verwalten'
    },
    {
      label: 'Einstellungen',
      href: '/profil/einstellungen',
      description: 'Profil-Einstellungen'
    }
  ]
}; 