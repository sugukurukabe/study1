import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sugu-study.com'
  const locales = ['ja', 'id', 'vi', 'en']
  const sectors = ['agriculture', 'livestock']
  
  const routes: MetadataRoute.Sitemap = []

  // ホームページ（各言語）
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          ja: `${baseUrl}/ja`,
          id: `${baseUrl}/id`,
          vi: `${baseUrl}/vi`,
          en: `${baseUrl}/en`,
        },
      },
    })
  })

  // 業種ページ（各言語）
  locales.forEach(locale => {
    sectors.forEach(sector => {
      routes.push({
        url: `${baseUrl}/${locale}/sectors/${sector}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            ja: `${baseUrl}/ja/sectors/${sector}`,
            id: `${baseUrl}/id/sectors/${sector}`,
            vi: `${baseUrl}/vi/sectors/${sector}`,
            en: `${baseUrl}/en/sectors/${sector}`,
          },
        },
      })
    })
  })

  // 静的ページ
  const staticPages = ['login', 'signup']
  locales.forEach(locale => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    })
  })

  return routes
}
