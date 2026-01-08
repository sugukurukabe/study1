import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layouts/DashboardNav'
import MobileBottomNav from '@/components/layouts/MobileBottomNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <DashboardNav user={user} profile={profile} />
      
      {/* Main Content */}
      <main className="pb-16 md:pb-0">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav profile={profile} />
    </div>
  )
}


