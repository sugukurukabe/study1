import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n/request'

// next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'ja',
  localePrefix: 'as-needed',
})

export async function middleware(request: NextRequest) {
  // 環境変数チェック - 未設定の場合はSupabaseチェックをスキップ
  const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  let user = null
  let supabaseResponse = NextResponse.next({ request })
  
  if (hasSupabaseConfig) {
    try {
      // 1. Supabaseセッション更新
      const sessionResult = await updateSession(request)
      supabaseResponse = sessionResult.supabaseResponse
      user = sessionResult.user
    } catch (error) {
      console.error('Supabase middleware error:', error)
    }
  }
  
  // 2. 認証が必要なパスの保護
  const protectedPaths = ['/home', '/learn', '/exam', '/profile', '/history', '/badges', '/referral']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.includes(path)
  )
  
  if (isProtectedPath && !user && hasSupabaseConfig) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // 3. 多言語処理
  const intlResponse = intlMiddleware(request)
  
  // Supabaseのクッキーをintlレスポンスにマージ
  if (hasSupabaseConfig) {
    supabaseResponse.cookies.getAll().forEach(cookie => {
      intlResponse.cookies.set(cookie.name, cookie.value, cookie)
    })
  }
  
  return intlResponse
}

export const config = {
  matcher: [
    '/((?!_next|api|.*\\..*).*)',
  ],
}

