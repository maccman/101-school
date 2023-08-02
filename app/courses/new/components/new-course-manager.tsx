'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { assert } from '@/lib/assert'
import { useAbortController } from '@/lib/use-abort-controller'
import { useLoading } from '@/lib/use-loading'
import { useReadTextStream } from '@/lib/use-read-text-stream'

import { ConfirmOutlineForm } from './confirm-outline-form'
import { GenerateOutlineForm } from './generate-outline-form'
import {
  ConfirmOutlineFormValues,
  GenerateOutlineFormValues,
  confirmOutlineFormSchema,
  generateOutlineFormSchema,
} from './types'

export function NewCourseManager() {
  const { loading, withLoading } = useLoading()
  const [stream, setStream] = useState<ReadableStream | null>(null)
  const { createSignal, abort: abortRequest } = useAbortController()
  const {
    text: generatedContent,
    cancel: cancelStream,
    canceled: streamCancelled,
    done: streamDone,
  } = useReadTextStream(stream)

  const generateOutlineForm = useForm<GenerateOutlineFormValues>({
    resolver: zodResolver(generateOutlineFormSchema),
    defaultValues: {
      description: '',
      weekCount: 13,
    },
  })

  const confirmOutlineForm = useForm<ConfirmOutlineFormValues>({
    resolver: zodResolver(confirmOutlineFormSchema),
    defaultValues: {
      content: '',
    },
  })

  async function handleGenerate(values: GenerateOutlineFormValues) {
    await withLoading(async () => {
      const stream = await fetchCourseOutlineStream(values, createSignal())
      setStream(stream)
    })
  }

  async function handleCancel() {
    cancelStream?.()
    abortRequest()
  }

  function handleSubmit() {
    const { title, description } = generateOutlineForm.getValues()
    const { content } = confirmOutlineForm.getValues()

    console.log({ title, description, content })
  }

  useEffect(() => {
    if (streamCancelled || streamDone) {
      setStream(null)
    }
  }, [streamCancelled, streamDone])

  useEffect(() => {
    if (generatedContent) {
      confirmOutlineForm.setValue('content', generatedContent)
    }
  }, [confirmOutlineForm, generatedContent])

  const isPending = !!stream || loading
  console.log({ isPending, stream, loading, streamCancelled, streamDone })

  const displayConfirmForm = !!confirmOutlineForm.getValues().content

  return (
    <div className="space-y-5">
      <GenerateOutlineForm
        isPending={isPending}
        onCancel={handleCancel}
        onGenerate={handleGenerate}
        form={generateOutlineForm}
      />

      {displayConfirmForm && (
        <ConfirmOutlineForm
          form={confirmOutlineForm}
          disabled={isPending}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

async function fetchCourseOutlineStream(
  values: GenerateOutlineFormValues,
  signal?: AbortSignal,
) {
  const response = await fetch('/api/courses/outline', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    alert('Sorry, something went wrong. Please try again.')
    throw new Error('Failed to create course')
  }

  assert(response.body)

  const stream = response.body.pipeThrough(new TextDecoderStream())

  return stream
}
