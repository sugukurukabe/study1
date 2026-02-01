'use client'

import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getTierName, getTierColor } from '@/lib/utils/tierCheck'
import { User } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase/types'
import { BookOpen, Trophy, Users, LogOut } from 'lucide-react'
import Link from 'next/link'

type Profile = Database['public']['Tables']['profiles']['Row']

interface DashboardNavProps {
  user: User
  profile: Profile | null
}

export default function DashboardNav({ user, profile }: DashboardNavProps) {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'ja'

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}/login`)
    router.refresh()
  }

  return (
    <nav className="hidden md:block border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href={`/${locale}/home`} className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">
              {t('common.appName')}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link href={`/${locale}/home`} className="text-gray-700 hover:text-indigo-600">
              ホーム
            </Link>
            <Link href={`/${locale}/learn`} className="text-gray-700 hover:text-indigo-600">
              学習
            </Link>
            <Link href={`/${locale}/exam/drill`} className="text-gray-700 hover:text-indigo-600">
              試験
            </Link>
            {profile && profile.current_tier >= 2 && (
              <>
                <Link href={`/${locale}/history`} className="text-gray-700 hover:text-indigo-600">
                  履歴
                </Link>
                <Link href={`/${locale}/badges`} className="text-gray-700 hover:text-indigo-600">
                  <Trophy className="h-5 w-5" />
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Badge className={getTierColor((profile?.current_tier || 1) as 1 | 2 | 3)}>
              {getTierName((profile?.current_tier || 1) as 1 | 2 | 3, 'ja')}
            </Badge>
            
            <Link href={`/${locale}/profile`}>
              <Avatar>
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}


