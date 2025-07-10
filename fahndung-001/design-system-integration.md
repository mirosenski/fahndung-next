# shadcn/ui Design System Integration

## Globale Design Tokens

### 1. CSS Custom Properties (bereits konfiguriert)
```css
/* src/styles/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* ... weitere Tokens */
}
```

### 2. Globale Theme-Konfiguration
```typescript
// src/lib/theme.ts
export const theme = {
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    // ...
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    // ...
  }
}
```

### 3. Globale Komponenten-Varianten
```typescript
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...",
        // Globale Varianten für alle Apps
        brand: "bg-brand text-brand-foreground...",
        success: "bg-success text-success-foreground...",
      },
      size: {
        // Globale Größen
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3 text-sm", 
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      }
    }
  }
)
```

## Globale Komponenten-Registry
```typescript
// src/components/ui/index.ts
export { Button } from './button'
export { Input } from './input'
export { Card } from './card'
// Alle Komponenten zentral exportieren
```

## Verwendung in verschiedenen Projekten
```typescript
// In jedem Projekt
import { Button, Input, Card } from '@your-org/ui'

// Konsistente Verwendung
<Button variant="brand" size="lg">
  Globale Brand Button
</Button>
``` 