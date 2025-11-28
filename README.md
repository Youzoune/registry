# 🚀 Youzoune Registry

Registry public de composants shadcn/ui créé par Youzoune. Partagez et distribuez vos composants React personnalisés avec la communauté.

## ✨ Fonctionnalités

- 🚀 Registry de composants personnalisés
- ⚡ Construit avec Next.js et Bun pour des performances optimales
- 🎨 Utilise Tailwind CSS 4 (alpha) et shadcn/ui
- 📦 Entièrement compatible avec le CLI shadcn
- 🔧 Support TypeScript complet
- 🌙 Mode sombre inclus
- 📱 Responsive design
- 🎯 Support des blocs et composants UI

## 🎯 Composants Disponibles

### Button

Un composant Button moderne avec de nombreuses variantes et support Radix UI.

```bash
bunx shadcn@latest add button --registry http://localhost:3000
```

### Hello World

Un composant d'exemple simple et élégant pour démarrer avec le registry.

```bash
bunx shadcn@latest add hello-world --registry http://localhost:3000
```

## 🛠️ Installation et Utilisation

### Utiliser des composants depuis ce registry

```bash
# Avec Bun (recommandé)
bunx shadcn@latest add hello-world --registry https://your-registry-url.com

# Avec npm
npx shadcn@latest add hello-world --registry https://your-registry-url.com
```

### Développement local

1. **Cloner le repository**

```bash
git clone https://github.com/Youzoune/registry.git
cd registry
```

2. **Installer les dépendances**

```bash
# Avec Bun (recommandé)
bun install

# Ou avec npm
npm install
```

3. **Démarrer le serveur de développement**

```bash
bun run dev
# ou npm run dev
```

4. **Construire le registry**

```bash
bun run registry:build
# ou npm run registry:build
```

5. **Construire pour la production**

```bash
bun run build
# ou npm run build
```

## 📁 Structure du Projet

```text
├── src/
│   ├── app/                # Application Next.js
│   │   ├── api/registry/   # API du registry
│   │   └── r/              # Routes des composants
│   ├── lib/                # Utilitaires (cn, etc.)
│   └── registry/           # Composants du registry
│       └── new-york/
│           ├── ui/         # Composants UI de base (button, etc.)
│           └── blocks/     # Composants métier (hello-world, etc.)
├── scripts/                # Scripts de build
├── public/r/               # Fichiers JSON générés
├── registry.json           # Configuration du registry
└── components.json         # Configuration shadcn/ui
```

## 🔧 Ajouter de Nouveaux Composants

1. **Créer votre composant**

```bash
mkdir -p src/registry/new-york/blocks/mon-composant
```

2. **Créer le fichier TypeScript**

```tsx
// src/registry/new-york/blocks/mon-composant/mon-composant.tsx
export function MonComposant() {
  return <div>Mon composant</div>
}
```

3. **Mettre à jour `registry.json`**

```json
{
  "registry": [
    {
      "name": "mon-composant",
      "type": "registry:block",
      "description": "Description de mon composant",
      "dependencies": [],
      "devDependencies": [],
      "registryDependencies": [],
      "files": [
        {
          "path": "src/registry/new-york/blocks/mon-composant/mon-composant.tsx",
          "content": "",
          "type": "registry:component",
          "target": ""
        }
      ],
      "tailwind": {},
      "cssVars": {},
      "meta": {
        "importSpecifier": "MonComposant",
        "moduleSpecifier": "./mon-composant"
      }
    }
  ]
}
```

4. **Construire le registry**

```bash
bun run registry:build
# ou npm run registry:build
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connecter votre repository à Vercel
2. Configurer les variables d'environnement :
   - `NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app`
3. Déployer

### Autres plateformes

Assurez-vous de définir `NEXT_PUBLIC_BASE_URL` avec votre domaine public.

## 🧪 Tests

```bash
# Tester la construction du registry
bun run registry:build
# ou npm run registry:build

# Vérifier que les fichiers JSON sont générés
ls public/r/

# Tester l'API du registry en local
curl http://localhost:3000/r/hello-world.json
curl http://localhost:3000/r/button.json
curl http://localhost:3000/r/index.json

# Lancer le linter
bun run lint
# ou npm run lint

# Formatter le code
bun run format
# ou npm run format
```

## 📡 API

Le registry expose une API REST simple :

- `GET /r/{component-name}.json` - Récupérer un composant
- `GET /r/index.json` - Lister tous les composants

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-component`)
3. Committer vos changements (`git commit -m 'Add amazing component'`)
4. Pousser vers la branche (`git push origin feature/amazing-component`)
5. Ouvrir une Pull Request

## 📄 License

MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Youzoune** - [GitHub](https://github.com/Youzoune)

---

Créé avec ❤️ en utilisant [Next.js](https://nextjs.org/), [Bun](https://bun.sh/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) et [Radix UI](https://www.radix-ui.com/)
