import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/ja/home'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // nextパラメータにロケールが含まれていない場合は追加
      const redirectPath = next.startsWith('/ja') || next.startsWith('/id') || next.startsWith('/vi') || next.startsWith('/en')
        ? next
        : `/ja${next}`
      return NextResponse.redirect(`${origin}${redirectPath}`)
    }
  }

  // エラーの場合はログインページにリダイレクト
  return NextResponse.redirect(`${origin}/ja/login`)
}


