'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { jsonFetch } from '@/lib/json-fetch'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const formSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof formSchema>

interface CourseSubscribeProps {
  courseId: string
  defaultEmail?: string
}

export function CourseSubscribe({ courseId, defaultEmail }: CourseSubscribeProps) {
  const [done, setDone] = useState(false)

  const defaultValues: Partial<FormValues> = {
    email: defaultEmail ?? '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(data: FormValues) {
    if (done) {
      return
    }

    toast({
      title: 'Great success',
      description: 'You have successfully subscribed to the course',
    })

    setDone(true)

    const { error } = await fetchCourseSubscribe({ courseId, email: data.email })

    if (error) {
      alert(`Error subscribing to course: ${error.message}`)
      setDone(false)
    }
  }

  return (
    <div className="px-5 flex-none relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      disabled={done}
                      placeholder="you@email.com"
                      type="email"
                      required
                      {...field}
                    />
                    <Button disabled={done} type="submit" variant="default">
                      Subscribe
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Receive a weekly email containing a new unit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {done && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90">
          <Badge className="text-sm">
            You&apos;re now on the list. Check your inbox.
          </Badge>
        </div>
      )}
    </div>
  )
}

function fetchCourseSubscribe({ courseId, email }: { courseId: string; email: string }) {
  return jsonFetch<{ success: true }>(`/api/courses/${courseId}/subscribe`, {
    method: 'POST',
    data: { email },
  })
}
