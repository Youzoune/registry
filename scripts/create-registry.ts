#!/usr/bin/env bun

import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

// Schema for registry configuration
const RegistryConfigSchema = z.object({
  name: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      'Registry name must be lowercase alphanumeric with hyphens',
    ),
  displayName: z.string().min(1, 'Display name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  author: z.string().min(1, 'Author name is required'),
  style: z.enum(['new-york', 'default']).default('new-york'),
})

interface CreateRegistryOptions {
  name: string
  displayName: string
  description: string
  author: string
  style?: 'new-york' | 'default'
  template?: 'basic' | 'enterprise' | 'theme'
}

async function createRegistry(options: CreateRegistryOptions) {
  // Validate input
  const validated = RegistryConfigSchema.parse(options)

  console.log(`🎨 Creating registry: ${validated.displayName}`)

  try {
    // 1. Create directories
    const registryDir = path.join(process.cwd(), 'src/registry', validated.name)
    const registriesConfigDir = path.join(process.cwd(), 'registries')
    const docsDir = path.join(process.cwd(), 'docs/registries')

    await Promise.all([
      fs.mkdir(path.join(registryDir, 'ui'), { recursive: true }),
      fs.mkdir(path.join(registryDir, 'blocks'), { recursive: true }),
      fs.mkdir(registriesConfigDir, { recursive: true }),
      fs.mkdir(docsDir, { recursive: true }),
    ])

    // 2. Create registry configuration
    const registryConfig = {
      $schema: 'https://ui.shadcn.com/schema.json',
      name: validated.name,
      displayName: validated.displayName,
      description: validated.description,
      author: validated.author,
      style: validated.style,
      rsc: true,
      tsx: true,
      tailwind: {
        config: 'tailwind.config.ts',
        css: 'src/app/globals.css',
        baseColor: 'gray',
        cssVariables: true,
        prefix: '',
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
        ui: '@/components/ui',
      },
      metadata: {
        version: '1.0.0',
        tags: [],
        category: 'component-library',
        license: 'MIT',
        featured: false,
        previewComponent: null,
      },
      registry: [],
    }

    const configPath = path.join(registriesConfigDir, `${validated.name}.json`)
    await fs.writeFile(configPath, JSON.stringify(registryConfig, null, 2))

    // 3. Create documentation file
    const docContent = `# ${validated.displayName}

## Overview

${validated.description}

**Author**: ${validated.author}  
**Style**: ${validated.style}  
**Version**: 1.0.0

## Components

### UI Components

No components yet. Add your first component with:

\`\`\`bash
bun registry add my-component --registry=${validated.name} --type=ui
\`\`\`

### Blocks

No blocks yet. Add your first block with:

\`\`\`bash  
bun registry add my-block --registry=${validated.name} --type=block
\`\`\`

## Installation

\`\`\`bash
npx shadcn@latest add component-name --registry https://yourdomain.com/${validated.name}
\`\`\`

## Development

### Adding Components

1. Create your component in \`src/registry/${validated.name}/ui/\` or \`src/registry/${validated.name}/blocks/\`
2. Update the registry configuration in \`registries/${validated.name}.json\`
3. Run \`bun run registry:build\` to generate distribution files
4. Test with \`curl http://localhost:3000/r/${validated.name}/component-name.json\`

### Component Structure

\`\`\`
src/registry/${validated.name}/
├── ui/                 # Base UI components
│   ├── button.tsx
│   └── input.tsx
└── blocks/            # Complex component blocks
    ├── hero-section/
    │   └── hero-section.tsx
    └── contact-form/
        └── contact-form.tsx
\`\`\`

## Examples

### Basic Usage

\`\`\`tsx
import { ComponentName } from "@/components/ui/component-name"

export function Example() {
  return (
    <div>
      <ComponentName variant="default" size="lg">
        Hello World
      </ComponentName>
    </div>
  )
}
\`\`\`

## Customization

This registry follows the shadcn/ui patterns for customization:

1. **CSS Variables**: Components use CSS variables for theming
2. **Tailwind Classes**: Customize appearance with Tailwind utility classes  
3. **Component Variants**: Use \`cva\` for component variations
4. **Props Interface**: Extend component props as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your component following the established patterns
4. Update this documentation
5. Submit a pull request

## License

MIT - See LICENSE file for details
`

    const docPath = path.join(docsDir, `${validated.name}.md`)
    await fs.writeFile(docPath, docContent)

    // 4. Create example component based on template
    if (options.template === 'basic' || !options.template) {
      await createBasicExampleComponent(validated.name, registryDir)
    }

    console.log(`✅ Registry "${validated.displayName}" created successfully!`)
    console.log(`📁 Registry files:`)
    console.log(`   - Configuration: registries/${validated.name}.json`)
    console.log(`   - Documentation: docs/registries/${validated.name}.md`)
    console.log(`   - Components: src/registry/${validated.name}/`)
    console.log(``)
    console.log(`🚀 Next steps:`)
    console.log(`   1. Add components to src/registry/${validated.name}/`)
    console.log(
      `   2. Update registries/${validated.name}.json with component entries`,
    )
    console.log(`   3. Run: bun run registry:build`)
    console.log(
      `   4. Test: curl http://localhost:3000/r/${validated.name}/index.json`,
    )
  } catch (error) {
    console.error('❌ Failed to create registry:', error)
    process.exit(1)
  }
}

async function createBasicExampleComponent(
  registryName: string,
  registryDir: string,
) {
  const componentContent = `export function WelcomeCard() {
  return (
    <div className="bg-card text-card-foreground flex flex-col items-center justify-center rounded-lg border p-8 shadow-sm">
      <h2 className="text-primary mb-4 text-2xl font-bold">Welcome to ${registryName}! 👋</h2>
      <p className="text-muted-foreground mb-6 max-w-md text-center">
        This is an example component from your new registry. Replace this with your own components.
      </p>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        Ready to be customized
      </div>
    </div>
  )
}`

  const componentDir = path.join(registryDir, 'blocks', 'welcome-card')
  await fs.mkdir(componentDir, { recursive: true })
  await fs.writeFile(
    path.join(componentDir, 'welcome-card.tsx'),
    componentContent,
  )

  console.log(`📦 Created example component: welcome-card`)
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
🎨 Registry Creator

Usage: bun run scripts/create-registry.ts <name> [options]

Examples:
  bun run scripts/create-registry.ts my-registry --display="My Registry" --description="Custom components for my project" --author="John Doe"
  bun run scripts/create-registry.ts theme-pack --display="Theme Pack" --description="Beautiful themed components" --author="Design Team" --template=theme

Options:
  --display       Display name for the registry (required)
  --description   Registry description (required) 
  --author        Author name (required)
  --style         Component style: new-york | default (default: new-york)
  --template      Template: basic | enterprise | theme (default: basic)
`)
    process.exit(0)
  }

  const name = args[0]
  const flags = args.slice(1).reduce(
    (acc, arg) => {
      if (arg.startsWith('--')) {
        const [key, value] = arg.substring(2).split('=')
        acc[key] = value || true
      }
      return acc
    },
    {} as Record<string, any>,
  )

  if (!flags.display || !flags.description || !flags.author) {
    console.error(
      '❌ Missing required options: --display, --description, --author',
    )
    process.exit(1)
  }

  await createRegistry({
    name,
    displayName: flags.display,
    description: flags.description,
    author: flags.author,
    style: flags.style || 'new-york',
    template: flags.template || 'basic',
  })
}

if (import.meta.main) {
  main()
}

export { createRegistry }
