export function EducationalOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sugu-Study',
    description: '特定技能2号試験対策のためのオンライン学習プラットフォーム / Platform pembelajaran online untuk persiapan ujian Tokutei Ginou 2',
    url: 'https://sugu-study.com',
    logo: 'https://sugu-study.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['Japanese', 'Indonesian', 'Vietnamese', 'English'],
    },
    offers: {
      '@type': 'Offer',
      category: 'Educational',
      price: '0',
      priceCurrency: 'JPY',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CourseSchema({ 
  name, 
  description, 
  provider = 'Sugu-Study',
  inLanguage 
}: {
  name: string
  description: string
  provider?: string
  inLanguage: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://sugu-study.com',
    },
    educationalLevel: 'Professional',
    inLanguage,
    availableLanguage: ['ja', 'id', 'vi', 'en'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT30M', // 30分/日
    },
    offers: {
      '@type': 'Offer',
      category: 'Free',
      price: '0',
      priceCurrency: 'JPY',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sugu-Study',
    url: 'https://sugu-study.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sugu-study.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['ja', 'id', 'vi', 'en'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
