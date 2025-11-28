import * as React from "react"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Youzoune Registry 🚀
        </h1>
        <p className="text-lg text-muted-foreground">
          Registry public pour composants shadcn/ui personnalisés
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Distribuez et partagez vos composants React, hooks et utilitaires 
          avec la communauté en utilisant le CLI shadcn.
        </p>
      </header>
      
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-6 min-h-[450px] relative bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Hello World Component</h2>
              <p className="text-sm text-muted-foreground">
                Votre premier composant dans le registry Youzoune
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center min-h-[350px] relative border rounded-md bg-background">
            <HelloWorld />
          </div>
          
          <div className="mt-4 p-4 bg-muted/50 rounded-md">
            <h3 className="font-medium mb-2">Installation</h3>
            <code className="text-sm bg-background px-2 py-1 rounded border">
              npx shadcn@latest add hello-world --registry https://your-registry-url.com
            </code>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Construit avec ❤️ par Youzoune | 
            <a 
              href="https://github.com/youzoune/registry" 
              className="ml-1 text-primary hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}