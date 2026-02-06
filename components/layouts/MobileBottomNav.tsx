'use client'

import { Home, BookOpen, FileText, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface MobileBottomNavProps {
  profile: Profile | null
}

export default function MobileBottomNav({ profile }: MobileBottomNavProps) {
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string || 'ja'

  const navItems = [
    { href: `/${locale}/home`, icon: Home, label: 'ホーム' },
    { href: `/${locale}/learn`, icon: BookOpen, label: '学習' },
    { href: `/${locale}/exam/drill`, icon: FileText, label: '試験' },
    { href: `/${locale}/profile`, icon: User, label: 'プロフィール' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-20">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname?.includes(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1.5 transition-colors active:scale-95 min-h-[44px]',
                isActive 
                  ? 'text-indigo-600 font-semibold' 
                  : 'text-gray-600 hover:text-indigo-600'
              )}
            >
              <Icon className="h-7 w-7" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


