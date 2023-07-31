'use client'

import { triggerEvent } from '@/lib/use-event-listener'

import { Button, ButtonProps } from '../ui/button'

interface SearchButtonProps extends ButtonProps {}

export function SearchButton({ ...props }: SearchButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => triggerEvent('command.dialog.open')}
      {...props}
    >
      Search
    </Button>
  )
}
