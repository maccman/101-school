import { useEffect, useRef } from 'react'

import { Textarea, TextareaProps } from './ui/textarea'

interface ScrollingTextareaProps extends TextareaProps {
  autoScroll?: boolean
}

export function ScrollingTextarea({
  value,
  autoScroll = true,
  ...props
}: ScrollingTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref?.current && autoScroll) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [autoScroll, value])

  return <Textarea ref={ref} value={value} {...props} />
}
