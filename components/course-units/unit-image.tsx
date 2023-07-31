'use client'

import { cn } from '@/lib/utils'

import { previewImage } from '../image-dialog'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  image: {
    source: string
    description: string | null
  }
}

export function UnitImage({ image, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-md overflow-hidden sm:max-w-[200px] lg:max-w-[450px] border',
        className,
      )}
      onClick={() =>
        previewImage({
          source: image.source,
          alt: image.description ?? undefined,
        })
      }
    >
      <img
        src={image.source}
        alt={image.description || ''}
        className="h-auto w-auto object-cover transition-all aspect-video m-0"
        loading="lazy"
      />

      {image.description && (
        <p className="text-sm text-gray-500 m-1 px-4">{titlize(image.description)}</p>
      )}
    </div>
  )
}

function titlize(str: string) {
  // Make sure first letter is capitalized
  str = str.charAt(0).toUpperCase() + str.slice(1)

  // Add a period if it's missing
  if (!str.endsWith('.')) {
    str += '.'
  }

  return str
}
