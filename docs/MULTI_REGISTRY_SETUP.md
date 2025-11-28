# Multi-Registry Setup Guide

## Overview

This guide helps you set up a multi-registry system where you can manage multiple component registries with automatic landing page integration and documentation.

## Quick Setup

### 1. Create Registry Structure

```bash
# Create registries directory
mkdir -p registries
mkdir -p docs/registries
mkdir -p src/registry

# Move existing registry
mv registry.json registries/youzoune-registry.json
```

### 2. Registry Configuration Format

Each registry in `registries/` follows this format:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "name": "registry-name",
  "displayName": "Registry Display Name",
  "description": "Short description for landing page",
  "author": "Author Name",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "gray",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "registry": [
    // Components array
  ]
}
```

### 3. Component Directory Structure

```
src/registry/
├── youzoune-registry/
│   ├── ui/
│   │   └── button.tsx
│   └── blocks/
│       └── hello-world/
│           └── hello-world.tsx
├── theme-registry/
│   ├── ui/
│   └── blocks/
└── enterprise-registry/
    ├── ui/
    └── blocks/
```

### 4. Registry Documentation Template

Create `docs/registries/{registry-name}.md`:

```markdown
# Registry Name

## Overview

Brief description of the registry's purpose and target audience.

## Components

### UI Components

- **Component Name**: Description and use case
- **Another Component**: Description

### Blocks

- **Block Name**: Description and use case

## Installation

\`\`\`bash
npx shadcn@latest add component-name --registry https://yourdomain.com/registry-name
\`\`\`

## Examples

### Basic Usage

\`\`\`tsx
import { ComponentName } from "@/components/ui/component-name"

export function Example() {
return <ComponentName />
}
\`\`\`

## Customization

Guidelines for customizing components from this registry.
```

## Implementation Steps

### Step 1: Update Build Script

Modify `scripts/build-registry.ts` to handle multiple registries:

```typescript
// Process all registries in registries/ directory
const registriesDir = path.join(process.cwd(), 'registries')
const registryFiles = await fs.readdir(registriesDir)

for (const file of registryFiles) {
  if (file.endsWith('.json')) {
    const registryName = path.basename(file, '.json')
    // Process each registry separately
    // Output to public/r/{registry-name}/
  }
}
```

### Step 2: Update API Routes

Create registry-specific API routes:

- `/api/registry/[registry]/[component]`
- `/r/[registry]/[component]`

### Step 3: Landing Page Integration

Update `src/app/page.tsx` to:

1. Auto-discover all registries
2. Display registry cards with previews
3. Link to documentation pages
4. Show installation commands

### Step 4: Add Registry Management Commands

```json
// package.json scripts
{
  "registry:build-all": "bun run scripts/build-all-registries.ts",
  "registry:create": "bun run scripts/create-registry.ts",
  "registry:validate": "bun run scripts/validate-registries.ts"
}
```

## Recommended Features

### 1. Registry Metadata

Add to each registry config:

```json
{
  "metadata": {
    "version": "1.0.0",
    "tags": ["ui", "theme", "enterprise"],
    "category": "component-library",
    "license": "MIT",
    "repository": "https://github.com/user/registry",
    "featured": true,
    "previewComponent": "hero-section"
  }
}
```

### 2. Component Categories

Organize components within registries:

```json
{
  "categories": {
    "forms": ["input", "button", "select"],
    "layout": ["container", "grid", "flex"],
    "navigation": ["navbar", "sidebar", "breadcrumbs"]
  }
}
```

### 3. Registry Discovery API

Create `/api/registries` endpoint:

```json
{
  "registries": [
    {
      "name": "youzoune-registry",
      "displayName": "Youzoune Registry",
      "description": "General purpose components",
      "componentCount": 15,
      "featured": true
    }
  ]
}
```

### 4. CLI Integration

Custom CLI commands:

```bash
# Create new registry
bun registry create my-registry --template=basic

# Add component to registry
bun registry add my-component --registry=my-registry --type=ui

# Validate all registries
bun registry validate

# Preview registry
bun registry preview my-registry
```

## File Structure After Setup

```
project/
├── registries/
│   ├── youzoune-registry.json
│   ├── theme-registry.json
│   └── enterprise-registry.json
├── docs/
│   └── registries/
│       ├── youzoune-registry.md
│       ├── theme-registry.md
│       └── enterprise-registry.md
├── src/registry/
│   ├── youzoune-registry/
│   ├── theme-registry/
│   └── enterprise-registry/
├── public/r/
│   ├── youzoune-registry/
│   ├── theme-registry/
│   └── enterprise-registry/
└── scripts/
    ├── build-all-registries.ts
    ├── create-registry.ts
    └── validate-registries.ts
```

## Next Steps

1. **Implement the multi-registry build system**
2. **Create registry management CLI tools**
3. **Update landing page for auto-discovery**
4. **Add documentation generation**
5. **Set up registry validation**
6. **Create component templates and scaffolding**

This setup provides a scalable foundation for managing multiple component registries with proper documentation and discovery.
