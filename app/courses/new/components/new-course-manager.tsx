'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { assert } from '@/lib/assert'
import { useAbortController } from '@/lib/use-abort-controller'
import { useLoading } from '@/lib/use-loading'
import { useReadTextStream } from '@/lib/use-read-text-stream'

const formSchema = z.object({
  description: z.string().min(10).max(5000),
  weekCount: z.number().int().min(1).max(13),
})

export function NewCourseManager() {
  const { loading, withLoading } = useLoading()
  const [stream, setStream] = useState<ReadableStream | null>(null)
  const { createSignal, abort } = useAbortController()
  const { text, cancel } = useReadTextStream(stream)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      weekCount: 13,
    },
  })

  async function handleGenerate(values: { description: string; weekCount: number }) {
    await withLoading(async () => {
      const stream = await fetchCourseOutline(values, createSignal())
      setStream(stream)
    })
  }

  async function handleCancel() {
    cancel?.()
    abort()
    setStream(null)
  }

  console.log(text)

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your course..." {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weekCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course length</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value + ''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">4 weeks</SelectItem>
                    <SelectItem value="8">8 weeks</SelectItem>
                    <SelectItem value="13">13 weeks (recommended)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>You can manage email addresses in</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {!!stream || loading ? (
            <Button variant="secondary" onClick={handleCancel}>
              Cancel...
            </Button>
          ) : (
            <Button type="submit">Generate outline</Button>
          )}
        </form>
      </Form>

      <div>
        <pre>{text}</pre>
      </div>
    </div>
  )
}

async function fetchCourseOutline(
  values: { description: string; weekCount: number },
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
