# Dark Mode Implementierung - Tailwind CSS 4.1

Diese Anleitung beschreibt die vollständige Dark Mode Implementierung nach den neuesten Tailwind CSS 4.1 Regeln.

## 🎯 Features

- ✅ **Drei-Wege Theme Toggle**: Hell, Dunkel, System
- ✅ **System Theme Erkennung**: Automatische Anpassung an OS-Einstellungen
- ✅ **Persistierung**: Theme-Einstellung wird in localStorage gespeichert
- ✅ **Keine Hydration-Fehler**: ThemeScript verhindert FOUC (Flash of Unstyled Content)
- ✅ **Tailwind CSS 4.1**: Neueste Features und Performance-Optimierungen

## 📁 Dateistruktur

```
src/
├── components/
│   ├── providers/
│   │   ├── ThemeProvider.tsx    # React Context für Theme-Management
│   │   └── ThemeScript.tsx      # Inline Script für initiale Theme-Erkennung
│   └── ui/
│       ├── ThemeToggle.tsx      # Theme Toggle Komponente
│       └── DarkModeDemo.tsx     # Demo-Komponente
├── styles/
│   └── globals.css              # Tailwind CSS mit Dark Mode Variante
└── app/
    ├── layout.tsx               # Root Layout mit Theme Provider
    └── dark-mode-demo/
        └── page.tsx             # Demo-Seite
```

## 🔧 Konfiguration

### 1. CSS-Konfiguration (`src/styles/globals.css`)

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

### 2. Theme Provider Integration

Der `ThemeProvider` wird im Root Layout integriert und verwaltet:
- Theme State (light/dark/system)
- localStorage Persistierung
- System Theme Erkennung

### 3. Theme Script

Das `ThemeScript` wird im `<head>` ausgeführt und verhindert Hydration-Fehler durch:
- Sofortige Theme-Erkennung beim Laden
- Anwendung der korrekten CSS-Klassen vor React-Hydration

## 🎨 Verwendung

### Dark Mode Klassen

```jsx
// Hintergrund
className="bg-white dark:bg-gray-900"

// Text
className="text-gray-900 dark:text-white"

// Borders
className="border-gray-200 dark:border-gray-700"

// Shadows
className="shadow-lg dark:shadow-gray-900/20"
```

### Theme Toggle Komponente

```jsx
import { ThemeToggle } from "~/components/ui/ThemeToggle";

<ThemeToggle />
```

### Theme Hook

```jsx
import { useTheme } from "~/components/providers/ThemeProvider";

const { theme, setTheme } = useTheme();

// Theme programmatisch ändern
setTheme("dark");
```

## 🚀 Demo

Besuchen Sie `/dark-mode-demo` um die Funktionalität zu testen.

## 📋 Best Practices

### 1. Farbpalette

```jsx
// Primärer Text
className="text-gray-900 dark:text-white"

// Sekundärer Text
className="text-gray-600 dark:text-gray-400"

// Tertiärer Text
className="text-gray-500 dark:text-gray-500"

// Hintergründe
className="bg-white dark:bg-gray-900"
className="bg-gray-50 dark:bg-gray-800"
```

### 2. Interaktive Elemente

```jsx
// Buttons
className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"

// Cards
className="bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-100/5"
```

### 3. Transitions

```jsx
// Smooth Transitions
className="transition-colors duration-200"
```

## 🔄 Migration von Tailwind CSS 3.x

### Vorher (3.x)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Nachher (4.x)
```css
@import "tailwindcss";
```

### Dark Mode Variante
```css
/* 3.x - Automatisch verfügbar */
/* 4.x - Explizit definieren */
@custom-variant dark (&:where(.dark, .dark *));
```

## 🐛 Troubleshooting

### Hydration-Fehler
- Stellen Sie sicher, dass `ThemeScript` im `<head>` eingebunden ist
- Verwenden Sie `suppressHydrationWarning={true}` im body

### Theme wird nicht gespeichert
- Überprüfen Sie localStorage im Browser
- Stellen Sie sicher, dass `storageKey` korrekt gesetzt ist

### System Theme wird nicht erkannt
- Testen Sie mit `window.matchMedia("(prefers-color-scheme: dark)")`
- Überprüfen Sie OS-Einstellungen

## 📚 Weitere Ressourcen

- [Tailwind CSS 4.0 Dokumentation](https://tailwindcss.com/docs)
- [Dark Mode Guide](https://tailwindcss.com/docs/dark-mode)
- [Custom Variants](https://tailwindcss.com/docs/custom-variants) 