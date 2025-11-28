# FAQ Schema Registry

This registry provides components for generating structured data (JSON-LD) for FAQ pages to improve SEO and enable rich snippets in search results.

## Components

### FAQSchema

A React component that generates JSON-LD structured data for FAQ pages according to Schema.org specifications.

#### Installation

```bash
bunx shadcn@latest add faq-schema --registry http://localhost:3000/r/faq-schema
```

#### Usage

```tsx
import { FAQSchema } from '@/components/faq-schema'

const faqItems = [
  {
    question: 'Comment ça marche ?',
    answer: "C'est très simple, vous n'avez qu'à suivre les étapes...",
  },
  {
    question: 'Combien ça coûte ?',
    answer: 'Les prix commencent à partir de 29€/mois...',
  },
  {
    question: "Y a-t-il une période d'essai ?",
    answer: "Oui, nous offrons 14 jours d'essai gratuit sans engagement.",
  },
]

export default function FAQPage() {
  return (
    <>
      <FAQSchema
        questions={faqItems}
        pageUrl="/faq"
        pageTitle="FAQ - Questions fréquentes"
        pageDescription="Trouvez les réponses à vos questions les plus courantes"
        siteName="Mon Super Site"
        baseUrl="https://monsupersite.com"
        logoUrl="https://monsupersite.com/logo.png"
        language="fr-FR"
      />

      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">Questions Fréquentes</h1>

        {faqItems.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">{item.question}</h2>
            <p className="text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </>
  )
}
```

#### Props

| Prop              | Type        | Default                          | Description                                 |
| ----------------- | ----------- | -------------------------------- | ------------------------------------------- |
| `questions`       | `FAQItem[]` | **required**                     | Array of FAQ items with question and answer |
| `pageUrl`         | `string`    | `"/faq"`                         | Relative URL of the FAQ page                |
| `pageTitle`       | `string`    | `"FAQ"`                          | Title of the FAQ page                       |
| `pageDescription` | `string`    | `"Questions fréquemment posées"` | Description of the FAQ page                 |
| `baseUrl`         | `string`    | `""`                             | Base URL of your website                    |
| `siteName`        | `string`    | `"Mon Site"`                     | Name of your website                        |
| `logoUrl`         | `string`    | `undefined`                      | URL of your website logo                    |
| `language`        | `string`    | `"fr-FR"`                        | Language code for the page                  |

#### FAQ Item Interface

```tsx
interface FAQItem {
  question: string
  answer: string
}
```

## Benefits

- **SEO Optimization**: Helps search engines understand your FAQ content
- **Rich Snippets**: Enables FAQ rich snippets in search results
- **Schema.org Compliance**: Follows official Schema.org FAQPage specifications
- **Zero Dependencies**: No external libraries required
- **TypeScript Ready**: Full TypeScript support with proper typing

## Registry Information

- **Name**: faq-schema
- **Type**: UI Component Registry
- **Style**: new-york
- **Components**: 1 (FAQSchema)
- **Dependencies**: None

## Testing

You can test the registry endpoints:

```bash
# Registry index
curl http://localhost:3000/r/faq-schema/index.json

# FAQ Schema component
curl http://localhost:3000/r/faq-schema/faq-schema.json

# All registries
curl http://localhost:3000/r/registries.json
```
