'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
  })

  useEffect(() => {
    if (trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      })
    }
  }, [inView, entry, trackVisibility])

  return <div ref={ref} className="h-px w-full" />
}
