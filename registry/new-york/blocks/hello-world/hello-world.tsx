export function HelloWorld() {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h1 className="text-4xl font-bold text-primary mb-4">Hello World! 👋</h1>
      <p className="text-lg text-muted-foreground mb-6 text-center max-w-md">
        Bienvenue dans le registry Youzoune ! Ce composant simple démontre
        comment créer et distribuer des composants avec shadcn/ui.
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        Prêt à être utilisé dans vos projets
      </div>
    </div>
  )
}
