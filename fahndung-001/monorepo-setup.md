# shadcn/ui Monorepo Integration

## Globale Konfiguration

### 1. Root-level components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "apps/web/tailwind.config.ts",
    "css": "apps/web/src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils"
  }
}
```

### 2. Workspace-spezifische Konfiguration
```json
// apps/web/components.json
{
  "extends": "../../components.json",
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils"
  }
}
```

### 3. Globale Komponenten-Bibliothek
```
packages/
  ui/
    components/
      button.tsx
      input.tsx
    index.ts
```

## Verwendung in verschiedenen Apps
```typescript
// In app1
import { Button } from "@repo/ui/components/button"

// In app2  
import { Button } from "@repo/ui/components/button"
``` 