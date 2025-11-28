import * as React from 'react'
import { HelloWorld } from '@/registry/new-york/blocks/hello-world/hello-world'

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Youzoune Registry 🚀
        </h1>
        <p className="text-muted-foreground text-lg">
          Registry public pour composants shadcn/ui personnalisés
        </p>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
          Distribuez et partagez vos composants React, hooks et utilitaires avec
          la communauté en utilisant le CLI shadcn.
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-8">
        <div className="bg-card relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Hello World Component</h2>
              <p className="text-muted-foreground text-sm">
                Votre premier composant dans le registry Youzoune
              </p>
            </div>
          </div>

          <div className="bg-background relative flex min-h-[350px] items-center justify-center rounded-md border">
            <HelloWorld />
          </div>

          <div className="bg-muted/50 mt-4 rounded-md p-4">
            <h3 className="mb-2 font-medium">Installation</h3>
            <code className="bg-background rounded border px-2 py-1 text-sm">
              npx shadcn@latest add hello-world --registry
              https://your-registry-url.com
            </code>
          </div>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          <p>
            Construit avec ❤️ par Youzoune |
            <a
              href="https://github.com/youzoune/registry"
              className="text-primary ml-1 hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
