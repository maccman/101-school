'use client'

import { useState } from 'react'

import { useEventListener } from '@/lib/use-event-listener'
import { useKeyboardShortcut } from '@/lib/use-keyboard-shortcut'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

interface DialogImage {
  source: string
  alt?: string
}

export function previewImage(image: DialogImage) {
  window.dispatchEvent(
    new CustomEvent('image.dialog.open', {
      detail: image,
    }),
  )
}

export function ImageDialog() {
  const [image, setImage] = useState<DialogImage | null>(null)

  useKeyboardShortcut('Escape', () => setImage(null))

  useEventListener('image.dialog.open', (event) =>
    setImage({
      source: event.detail.source,
      alt: event.detail.alt,
    }),
  )

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && setImage(null)}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {image?.alt || 'Preview image'}
          </DialogTitle>
          <DialogDescription className="p-2 flex items-center justify-center">
            {image && (
              <img
                src={image.source}
                alt={image.alt || 'Preview image'}
                className="h-auto w-auto object-cover transition-all aspect-video"
              />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
