/* eslint-disable @next/next/no-img-element */

import { cn } from '@/lib/utils'

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
    >
      <img
        src={image.source}
        alt={image.description || ''}
        className="h-auto w-auto object-cover transition-all aspect-video"
      />

      {image.description && (
        <p className="text-sm text-gray-500 px-3 py-2">{image.description}</p>
      )}
    </div>
  )
}
