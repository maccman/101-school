import { useEffect, useRef } from 'react'

import { Textarea, TextareaProps } from './ui/textarea'

export function ScrollingTextarea({ value, ...props }: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [value])

  return <Textarea ref={ref} value={value} {...props} />
}
