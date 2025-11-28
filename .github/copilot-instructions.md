# Youzoune Registry - AI Development Guide

## Project Overview

This is a **shadcn/ui component registry** built with Next.js 15, Bun, and Tailwind CSS 4 (alpha). The registry allows sharing and distributing custom React components compatible with the shadcn CLI.

## Architecture & Data Flow

### Registry System Architecture

- **Source**: `src/registry/new-york/` contains component source files (`.tsx`)
- **Configuration**: `registry.json` defines component metadata and file mappings
- **Build Process**: `scripts/build-registry.ts` reads source files and generates JSON manifests
- **Distribution**: Generated JSONs in `public/r/` served via API routes and static files

### Dual API Pattern

The project implements **two separate API endpoints** for component distribution:

- `/api/registry/[name]` - Dynamic API reading from `registry.json` (real-time file content)
- `/r/[name]` - Static API serving pre-built JSONs from `public/r/` (build-time content)

The `/r/` route is the primary endpoint used by shadcn CLI.

## Key Development Workflows

### Adding New Components

1. Create component in `src/registry/new-york/ui/` (base components) or `src/registry/new-york/blocks/` (complex components)
2. Add entry to `registry.json` with exact file path and metadata
3. Run `bun run registry:build` to generate distribution files
4. Test with: `curl http://localhost:3000/r/{component-name}.json`

### Build & Development Commands

```bash
# Start development (essential for testing components)
bun run dev

# Build registry JSONs (required after component changes)
bun run registry:build

# Full production build (runs registry:build automatically)
bun run build
```

### Registry Configuration Pattern

Each component in `registry.json` follows this structure:

```json
{
  "name": "component-name",
  "type": "registry:ui|registry:block",
  "files": [
    {
      "path": "src/registry/new-york/...",
      "content": "",
      "type": "registry:component"
    }
  ],
  "dependencies": ["external-deps"],
  "registryDependencies": ["internal-registry-deps"]
}
```

## Project-Specific Patterns

### Component Structure Standards

- **UI Components**: `src/registry/new-york/ui/` - Base components (button, input, etc.)
- **Blocks**: `src/registry/new-york/blocks/` - Complex components with multiple elements
- **Styling**: Uses `cva` (class-variance-authority) for component variants
- **Exports**: Always export component and any variant functions

### File Path Conventions

- Registry paths in `registry.json` use `src/registry/...` (source paths)
- Build script reads from these source paths and generates `public/r/{name}.json`
- API routes serve from `public/r/` directory (static) or read dynamically

### Tailwind & Styling Integration

- **Version**: Tailwind CSS 4.0 alpha with PostCSS plugin
- **Theme**: Uses CSS variables (`cssVariables: true`) for theming
- **Utilities**: Custom `cn()` utility in `src/lib/utils.ts` combines `clsx` and `tailwind-merge`

### shadcn CLI Compatibility

- Registry serves components compatible with `bunx shadcn@latest add {component} --registry {url}`
- JSON format matches official shadcn registry schema
- Component target paths automatically set to `components/{basename}`

## Critical Integration Points

### Build Process Dependencies

The `scripts/build-registry.ts` must run whenever:

- Component source files change
- `registry.json` configuration updates
- Before deployment (automated in production build)

### CORS Configuration

Both API routes include CORS headers for cross-origin registry access:

```typescript
'Access-Control-Allow-Origin': '*'
```

### Environment Variables

- `NEXT_PUBLIC_BASE_URL` - Required for production deployment
- Default development: `http://localhost:3000`

## Testing Registry Components

```bash
# Test individual component
curl http://localhost:3000/r/button.json

# Test registry index
curl http://localhost:3000/r/index.json

# Test with shadcn CLI
bunx shadcn@latest add button --registry http://localhost:3000
```

## Multi-Registry System Setup

### Creating a New Registry

When creating a new registry (e.g., for different themes, organizations, or component sets):

1. **Create Registry Configuration**

   ```json
   // registries/my-new-registry.json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "name": "my-new-registry",
     "description": "Description of the new registry",
     "style": "new-york",
     "registry": [...]
   }
   ```

2. **Create Component Directory**

   ```bash
   mkdir -p src/registry/my-new-registry/{ui,blocks}
   ```

3. **Add Registry Documentation**

   ```markdown
   // docs/registries/my-new-registry.md

   # My New Registry

   ## Overview

   Description and purpose of this registry

   ## Components

   - List of available components
   - Usage examples
   - Installation instructions
   ```

4. **Update Landing Page Integration**
   - Registry auto-discovery reads from `registries/` directory
   - Landing page displays all registries with their documentation
   - Each registry gets its own showcase section

5. **Build Process Integration**
   ```bash
   # Extended build script processes all registries
   bun run registry:build-all
   ```

### Registry Documentation Standards

Each registry should have:

- `docs/registries/{registry-name}.md` - Main documentation
- Component showcase on landing page
- Installation examples with correct registry URL
- Auto-generated component list from registry configuration

### Landing Page Auto-Discovery

The landing page should:

- Scan `registries/` directory for all `.json` files
- Display each registry as a card with preview components
- Link to detailed documentation pages
- Show installation commands with correct URLs

## Additional Recommendations

### Registry Management Features

1. **Registry Versioning**: Add version field to registry configs for compatibility tracking
2. **Category System**: Group components by categories (forms, navigation, layout, etc.)
3. **Preview Components**: Designated showcase components for landing page previews
4. **Registry Tags**: Tags for filtering and discovery (ui, blocks, themes, etc.)

### Developer Experience Enhancements

1. **CLI Tools**: Custom scripts for creating new registries and components
2. **Component Templates**: Scaffolding templates for common component patterns
3. **Validation**: Schema validation for registry configurations
4. **Hot Reload**: Auto-rebuild registry when files change in development

### Documentation System

1. **Auto-Generated Docs**: Component API documentation from TypeScript interfaces
2. **Interactive Examples**: Live code playground for each component
3. **Usage Analytics**: Track which components are most popular
4. **Contribution Guidelines**: Clear process for adding to existing registries

## Common Gotchas

- **File paths**: Registry paths in `registry.json` must exactly match actual file locations
- **Build requirement**: Components won't be available via API until `registry:build` runs
- **Content field**: Leave `content: ""` in `registry.json` - build script populates it
- **Type distinction**: Use `registry:ui` for base components, `registry:block` for complex ones
- **Registry isolation**: Each registry should have its own namespace to avoid component conflicts
