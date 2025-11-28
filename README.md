# 🚀 Youzoune Registry

Registry public de composants shadcn/ui créé par Youzoune. Partagez et distribuez vos composants React personnalisés avec la communauté.

## ✨ Fonctionnalités

- 🚀 Registry de composants personnalisés
- ⚡ Construit avec Bun pour des performances optimales
- 🎨 Utilise Tailwind CSS 4 et shadcn/ui
- 📦 Entièrement compatible avec le CLI shadcn
- 🔧 Support TypeScript complet
- 🌙 Mode sombre inclus
- 📱 Responsive design

## 🎯 Composants Disponibles

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

2. **Installer les dépendances avec Bun**
```bash
bun install
```

3. **Démarrer le serveur de développement**
```bash
bun run dev
```

4. **Construire le registry**
```bash
bun run registry:build
```

5. **Construire pour la production**
```bash
bun run build
```

## 📁 Structure du Projet

```
├── app/                    # Application Next.js
├── components/             # Composants de l'interface
├── lib/                    # Utilitaires (cn, etc.)
├── registry/               # Composants du registry
│   └── new-york/
│       ├── ui/            # Composants UI de base
│       └── blocks/        # Composants métier
├── scripts/               # Scripts de build
├── public/r/              # Fichiers JSON générés
└── registry.json          # Configuration du registry
```

## 🔧 Ajouter de Nouveaux Composants

1. **Créer votre composant**
```bash
mkdir -p registry/new-york/blocks/mon-composant
```

2. **Créer le fichier TypeScript**
```tsx
// registry/new-york/blocks/mon-composant/mon-composant.tsx
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
      "files": [
        {
          "path": "registry/new-york/blocks/mon-composant/mon-composant.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

4. **Construire le registry**
```bash
bun run registry:build
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

# Vérifier que les fichiers JSON sont générés
ls public/r/

# Tester l'API du registry
curl http://localhost:3000/r/hello-world.json
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

Créé avec ❤️ en utilisant [Next.js](https://nextjs.org/), [Bun](https://bun.sh/), [Tailwind CSS](https://tailwindcss.com/) et [shadcn/ui](https://ui.shadcn.com/)