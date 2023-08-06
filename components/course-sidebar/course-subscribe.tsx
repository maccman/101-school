'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { jsonFetch } from '@/lib/json-fetch'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const formSchema = z.object({
  email: z.string().email(),
  daysInterval: z.coerce.number().min(1).max(7),
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
    daysInterval: 7,
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
      description:
        `You are now subscribed to this course. ` +
        `You'll receive an email every ${
          data.daysInterval === 1 ? 'day' : `${data.daysInterval} days`
        } ` +
        `with a new unit.`,
    })

    setDone(true)

    const { error } = await fetchCourseSubscribe(courseId, data)

    if (error) {
      alert(`Error subscribing to course: ${error.message}`)
      setDone(false)
    }
  }

  return (
    <div className="px-5 flex-none relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="daysInterval"
            render={({ field }) => (
              <FormItem>
                <div className="flex text-sm  text-muted-foreground gap-2 items-center">
                  <span>Receive a</span>

                  <Select onValueChange={field.onChange} defaultValue={field.value + ''}>
                    <FormControl>
                      <SelectTrigger className="border-none w-auto p-0  h-auto">
                        <SelectValue placeholder="Select a frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">daily</SelectItem>
                      <SelectItem value="2">bi-daily</SelectItem>
                      <SelectItem value="7">weekly</SelectItem>
                    </SelectContent>
                  </Select>

                  <span>email containing the next unit.</span>
                </div>
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

function fetchCourseSubscribe(courseId: string, data: FormValues) {
  return jsonFetch<{ success: true }>(`/api/courses/${courseId}/subscribe`, {
    method: 'POST',
    data,
  })
}
