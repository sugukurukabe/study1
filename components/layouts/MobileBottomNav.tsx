'use client'

import { Home, BookOpen, FileText, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface MobileBottomNavProps {
  profile: Profile | null
}

export default function MobileBottomNav({ profile }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/home', icon: Home, label: 'ホーム' },
    { href: '/learn', icon: BookOpen, label: '学習' },
    { href: '/exam/drill', icon: FileText, label: '試験' },
    { href: '/profile', icon: User, label: 'プロフィール' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname?.includes(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 transition-colors',
                isActive 
                  ? 'text-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


