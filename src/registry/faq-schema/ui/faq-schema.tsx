'use client'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  questions: FAQItem[]
  pageUrl?: string
  pageTitle?: string
  pageDescription?: string
  baseUrl?: string
  siteName?: string
  logoUrl?: string
  language?: string
}

/**
 * FAQSchema - A component that generates JSON-LD structured data for FAQ pages
 *
 * @example
 * const faqItems = [
 *   { question: "Comment ça marche ?", answer: "C'est très simple..." },
 *   { question: "Combien ça coûte ?", answer: "Les prix commencent à..." }
 * ]
 *
 * <FAQSchema
 *   questions={faqItems}
 *   pageUrl="/faq"
 *   pageTitle="FAQ - Questions fréquentes"
 *   pageDescription="Trouvez les réponses à vos questions"
 *   siteName="Mon Site"
 *   baseUrl="https://monsite.com"
 * />
 */
export function FAQSchema({
  questions,
  pageUrl = '/faq',
  pageTitle = 'FAQ',
  pageDescription = 'Questions fréquemment posées',
  baseUrl = '',
  siteName = 'Mon Site',
  logoUrl,
  language = 'fr-FR',
}: FAQSchemaProps) {
  // Construire la liste des questions au format Schema.org
  const schemaQuestions = questions.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }))

  // Construire l'URL complète
  const fullUrl = baseUrl ? `${baseUrl}${pageUrl}` : pageUrl

  // Générer le schéma JSON-LD pour FAQPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: schemaQuestions,
    url: fullUrl,
    name: pageTitle,
    description: pageDescription,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
      ...(logoUrl && {
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
        },
      }),
    },
    inLanguage: language,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
