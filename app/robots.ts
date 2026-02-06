import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/auth/'],
      },
    ],
    sitemap: 'https://sugu-study.com/sitemap.xml',
  }
}
