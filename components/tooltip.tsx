import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface TooltipProps {
  children: React.ReactNode
  title: string
}

export function Tooltip({ children, title }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={50}>
      <TooltipBase>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  )
}
