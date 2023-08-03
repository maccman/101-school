'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { assert } from '@/lib/assert'
import { jsonFetch } from '@/lib/json-fetch'
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
import { stripTripleBackticks } from './utils'

export function NewCourseManager() {
  const router = useRouter()
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

  async function handleSubmit() {
    const { title, description } = generateOutlineForm.getValues()
    const { content } = confirmOutlineForm.getValues()

    await withLoading(async () => {
      const { error, response } = await createCourse({
        title,
        description,
        content,
      })

      if (error) {
        alert('Sorry, something went wrong. Please try again.')
        return
      }

      router.push(`/courses/${response.id}`)
    })
  }

  useEffect(() => {
    // Reset the stream when it's done or cancelled
    if (streamCancelled || streamDone) {
      setStream(null)
    }
  }, [streamCancelled, streamDone])

  useEffect(() => {
    if (generatedContent) {
      // Sync the generated content to the confirm form
      const normalizedGeneratedContent = stripTripleBackticks(generatedContent)
      confirmOutlineForm.setValue('content', normalizedGeneratedContent, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
  }, [confirmOutlineForm, generatedContent])

  const isPending = !!stream || loading

  // Only display the confirm form if there's content
  const displayConfirmForm = !!confirmOutlineForm.getValues().content

  return (
    <div className="space-y-5">
      <GenerateOutlineForm
        isPending={isPending}
        isPrimary={!displayConfirmForm}
        onCancel={handleCancel}
        onGenerate={handleGenerate}
        form={generateOutlineForm}
      />

      {displayConfirmForm && (
        <ConfirmOutlineForm
          form={confirmOutlineForm}
          isPending={isPending}
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

function createCourse(values: { title: string; description: string; content: string }) {
  return jsonFetch<{ id: string }>('/api/courses', {
    method: 'POST',
    data: values,
  })
}
