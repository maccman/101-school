'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { jsonFetch } from '@/lib/json-fetch'
import { useLoading } from '@/lib/use-loading'

const formSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

interface EditUnitFormProps {
  unitId: string
  unitTitle: string
  unitContent: string
}

export function EditUnitForm({
  unitId,
  unitTitle: defaultUnitTitle,
  unitContent: defaultUnitContent,
}: EditUnitFormProps) {
  const { loading, withLoading } = useLoading()

  const defaultValues: Partial<FormValues> = {
    title: defaultUnitTitle ?? '',
    content: defaultUnitContent ?? '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(data: FormValues) {
    await withLoading(async () => {
      const { error } = await fetchSetCourseUnit(unitId, data)

      if (error) {
        alert(error.message)
      } else {
        toast({
          title: 'Great success',
          description: 'The unit has been updated.',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={20}
                  placeholder="Your course's markdown content"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please use Markdown.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          Update unit
        </Button>
      </form>
    </Form>
  )
}

function fetchSetCourseUnit(unitId: string, values: FormValues) {
  return jsonFetch(`/api/units/${unitId}`, {
    data: values,
    method: 'PUT',
  })
}
