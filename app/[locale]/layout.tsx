import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Noto_Sans_JP, Inter } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
})

export function generateStaticParams() {
  return [
    { locale: 'ja' },
    { locale: 'vi' },
    { locale: 'id' },
    { locale: 'en' },
  ]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // メッセージをインポート
  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    // フォールバック
    messages = (await import('@/messages/ja.json')).default
  }

  return (
    <html lang={locale} className={`${notoSansJP.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Google Search Console Verification - ユーザーが後で追加 */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        
        {/* Google Analytics */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-339K4YF1RL"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-339K4YF1RL');
            `,
          }}
        />
        
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112717782300727"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

