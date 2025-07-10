# shadcn/ui als NPM Package

## Globale Komponenten-Bibliothek erstellen

### 1. Package Structure
```
@your-org/ui/
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── lib/
│       └── utils.ts
└── README.md
```

### 2. package.json
```json
{
  "name": "@your-org/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles/globals.css"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

### 3. Globale Komponenten exportieren
```typescript
// src/components/index.ts
export { Button, buttonVariants } from './button'
export { Input } from './input'
export { Card, CardHeader, CardContent } from './card'
// Alle Komponenten zentral exportieren
```

### 4. Verwendung in Projekten
```bash
# Installation
npm install @your-org/ui

# Verwendung
import { Button, Input } from '@your-org/ui'
import '@your-org/ui/styles' // CSS importieren
```

## Globale Konfiguration
```typescript
// In jedem Projekt
import { Button } from '@your-org/ui'

// Konsistente Verwendung über alle Projekte
<Button variant="brand" size="lg">
  Globale Komponente
</Button>
``` 