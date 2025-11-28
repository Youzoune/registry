import * as React from 'react'
import { Button } from '@/registry/new-york/ui/button'

interface Registry {
  name: string
  displayName: string
  description: string
  componentCount: number
  featured: boolean
}

interface RegistryData {
  registries: Registry[]
  totalComponents: number
  totalRegistries: number
}

// This would typically fetch from /r/registries.json in a real app
async function getRegistries(): Promise<RegistryData> {
  // Mock data - replace with actual fetch in production
  return {
    registries: [
      {
        name: 'youzoune-registry',
        displayName: 'Youzoune Registry',
        description: 'General purpose React components with modern design',
        componentCount: 12,
        featured: true
      },
      {
        name: 'theme-registry', 
        displayName: 'Theme Registry',
        description: 'Beautiful themed components for different design systems',
        componentCount: 8,
        featured: true
      },
      {
        name: 'enterprise-registry',
        displayName: 'Enterprise Registry', 
        description: 'Professional components for enterprise applications',
        componentCount: 15,
        featured: false
      }
    ],
    totalComponents: 35,
    totalRegistries: 3
  }
}

async function getRegistryComponents(registryName: string) {
  // This would fetch from /r/{registry-name}/index.json
  // For now, return mock data
  return {
    items: [
      { name: 'button', type: 'registry:ui', description: 'Customizable button component' },
      { name: 'hello-world', type: 'registry:block', description: 'Welcome component' }
    ]
  }
}

function RegistryCard({ registry }: { registry: Registry }) {
  const [components, setComponents] = React.useState<any[]>([])
  
  React.useEffect(() => {
    getRegistryComponents(registry.name).then(data => {
      setComponents(data.items.slice(0, 3)) // Show first 3 components
    })
  }, [registry.name])

  return (
    <div className="bg-card relative flex flex-col rounded-lg border p-6 shadow-sm">
      {registry.featured && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-medium">
            Featured
          </span>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{registry.displayName}</h3>
        <p className="text-muted-foreground text-sm mt-1">{registry.description}</p>
        <p className="text-muted-foreground text-xs mt-2">
          {registry.componentCount} components
        </p>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium mb-2">Components Preview</h4>
        <div className="space-y-1">
          {components.map((component) => (
            <div key={component.name} className="bg-muted/50 rounded px-2 py-1">
              <span className="text-xs font-mono">{component.name}</span>
              <span className="text-muted-foreground text-xs ml-2">
                ({component.type.replace('registry:', '')})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="bg-muted/50 rounded p-3">
          <p className="text-xs font-medium mb-1">Installation</p>
          <code className="text-xs break-all">
            npx shadcn@latest add component-name --registry https://yourdomain.com/{registry.name}
          </code>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            View Components
          </Button>
          <Button variant="outline" size="sm">
            Docs
          </Button>
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  const registryData = await getRegistries()
  const featuredRegistries = registryData.registries.filter(r => r.featured)
  const otherRegistries = registryData.registries.filter(r => !r.featured)

  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-4 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Component Registries 🚀
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Discover and use high-quality React components
          </p>
        </div>
        
        <div className="flex justify-center gap-8 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold">{registryData.totalRegistries}</div>
            <div className="text-muted-foreground">Registries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{registryData.totalComponents}</div>
            <div className="text-muted-foreground">Components</div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-8">
        {featuredRegistries.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Featured Registries</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredRegistries.map((registry) => (
                <RegistryCard key={registry.name} registry={registry} />
              ))}
            </div>
          </section>
        )}

        {otherRegistries.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">All Registries</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherRegistries.map((registry) => (
                <RegistryCard key={registry.name} registry={registry} />
              ))}
            </div>
          </section>
        )}

        <section className="bg-muted/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Install Components</h3>
              <p className="text-muted-foreground text-sm mb-2">
                Use the shadcn CLI to install components from any registry:
              </p>
              <code className="bg-background rounded border px-2 py-1 text-sm block">
                npx shadcn@latest add button --registry https://yourdomain.com/registry-name
              </code>
            </div>
            <div>
              <h3 className="font-medium mb-2">Browse & Discover</h3>
              <p className="text-muted-foreground text-sm mb-2">
                Explore each registry to find components that fit your needs:
              </p>
              <ul className="text-sm space-y-1">
                <li>• View component documentation</li>
                <li>• See live examples and previews</li>
                <li>• Check compatibility and dependencies</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="text-muted-foreground text-center text-sm">
          <p>
            Built with ❤️ using shadcn/ui |
            <a
              href="https://github.com/youzoune/registry"
              className="text-primary ml-1 hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}