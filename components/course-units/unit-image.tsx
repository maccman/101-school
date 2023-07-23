/* eslint-disable @next/next/no-img-element */

interface Props {
  image: {
    source: string
    description: string | null
  }
}

export function UnitImage({ image }: Props) {
  return (
    <div className="py-5 rounded-md bg-gray-50">
      <img src={image.source} alt={image.description || ''} className="max-w-sm w-full" />

      {image.description && <p className="text-sm text-gray-500">{image.description}</p>}
    </div>
  )
}
