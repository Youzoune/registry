export function HelloWorld() {
  return (
    <div className="bg-card text-card-foreground flex flex-col items-center justify-center rounded-lg border p-8 shadow-sm">
      <h1 className="text-primary mb-4 text-4xl font-bold">Hello World! 👋</h1>
      <p className="text-muted-foreground mb-6 max-w-md text-center text-lg">
        Bienvenue dans le registry Youzoune ! Ce composant simple démontre
        comment créer et distribuer des composants avec shadcn/ui.
      </p>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        Prêt à être utilisé dans vos projets
      </div>
    </div>
  )
}
