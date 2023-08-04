import { HeaderLayout } from '@/components/layouts/header-layout'
import { Separator } from '@/components/ui/separator'

import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Courses',
    href: '/account/courses',
  },
  {
    title: 'Profile',
    href: '/account/profile',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <HeaderLayout>
      <div className="space-y-6 p-10 pb-16 flex-1 overflow-auto">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Account</h2>
          <p className="text-muted-foreground">
            Manage your account and which courses you are enrolled in.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl overflow-auto">{children}</div>
        </div>
      </div>
    </HeaderLayout>
  )
}
