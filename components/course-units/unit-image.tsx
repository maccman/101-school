'use client'

import { useState } from 'react'

import { titlize } from '@/plugins/titlize'
import { cn } from '@/plugins/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  image: {
    source: string
    description: string | null
  }
}

export function UnitAsset({ image, className }: Props) {
  const [error, setError] = useState(false)
  const description = image.description ? titlize(image.description) : ''
  const isVideo = /\.(mp4|mov|ogv)$/.test(image.source)

  if (error) {
    return null
  }

  return (
    <div
      className={cn(
        'rounded-md overflow-hidden flex flex-col items-center justify-center sm:max-w-[200px] lg:max-w-[450px] border cursor-pointer',
        className,
      )}
      onClick={() => window.open(image.source, '_blank', 'noopener noreferrer')}
    >
      {isVideo ? (
        <video
          src={image.source}
          className="h-auto w-auto object-cover transition-all aspect-video m-0"
          controls
          muted
        />
      ) : (
        <img
          src={image.source}
          alt={image.description || ''}
          className="h-auto w-auto object-cover transition-all aspect-video m-0"
          loading="lazy"
          onError={() => setError(true)}
        />
      )}

      {image.description && (
        <p className="text-sm text-gray-500 m-1 px-2">{description}</p>
      )}
    </div>
  )
}
