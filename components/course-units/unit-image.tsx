'use client'

import { cn } from '@/lib/utils'

import { titlize } from '../../lib/titlize'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  image: {
    source: string
    description: string | null
  }
}

export function UnitImage({ image, className }: Props) {
  const description = image.description ? titlize(image.description) : ''

  return (
    <div
      className={cn(
        'rounded-md overflow-hidden flex flex-col items-center justify-center sm:max-w-[200px] lg:max-w-[450px] border cursor-pointer',
        className,
      )}
      onClick={() => window.open(image.source, '_blank', 'noopener noreferrer')}
    >
      <img
        src={image.source}
        alt={image.description || ''}
        className="h-auto w-auto object-cover transition-all aspect-video m-0"
        loading="lazy"
      />

      {image.description && (
        <p className="text-sm text-gray-500 m-1 px-2">{description}</p>
      )}
    </div>
  )
}
