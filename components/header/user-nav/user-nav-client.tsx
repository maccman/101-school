'use client'

import { User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { notEmpty } from '@/lib/not-empty'

interface Props {
  userId: string | null
  userName: string | null
  userEmail: string | null
}

export function UserNavClient({ userId, userName, userEmail }: Props) {
  const router = useRouter()
  const initialsSource = userName || userEmail
  const initials = initialsSource ? getInitials(initialsSource) : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-7 w-7 rounded-full mx-2 text-3xs">
          <Avatar className="h-7 w-7">
            <AvatarFallback>{initials || <User2 className="w-4 h-4" />}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {(userName || userEmail) && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                {userName && (
                  <p className="text-sm font-medium leading-none">{userName}</p>
                )}
                {userEmail && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {userId ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/account/courses')}>
                Enrolled courses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/account/profile')}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/sign-out')}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/auth')}>
              Sign in
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/auth')}>
              Register
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(notEmpty)
    .join('')

  return initials
}
