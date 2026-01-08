import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

export const locales = ['ja', 'vi', 'id', 'en'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
  // ロケールの決定: Cookie > Accept-Language > デフォルト(ja)
  const cookieStore = await cookies()
  const headersList = await headers()
  
  let locale: Locale = 'ja'
  
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value
  if (localeCookie && locales.includes(localeCookie as Locale)) {
    locale = localeCookie as Locale
  } else {
    const acceptLanguage = headersList.get('accept-language')
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(',')[0].split('-')[0]
      if (locales.includes(preferredLocale as Locale)) {
        locale = preferredLocale as Locale
      }
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})


