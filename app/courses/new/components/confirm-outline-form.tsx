import { UseFormReturn } from 'react-hook-form'

import { ScrollingTextarea } from '@/components/scrolling-textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { ConfirmOutlineFormValues } from './types'

interface ConfirmOutlineFormProps {
  isPending: boolean
  onSubmit: (values: ConfirmOutlineFormValues) => void
  form: UseFormReturn<ConfirmOutlineFormValues>
}

export function ConfirmOutlineForm({
  form,
  isPending,
  onSubmit,
}: ConfirmOutlineFormProps) {
  const { isValid } = form.formState

  const isPendingOrInvalid = !isValid || isPending

  function handleSubmit(values: ConfirmOutlineFormValues) {
    if (isPendingOrInvalid) {
      return
    }

    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generated content</FormLabel>
              <FormControl>
                <ScrollingTextarea
                  {...field}
                  autoScroll={isPending}
                  className="min-h-[400px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <footer className="flex justify-end">
          <Button disabled={isPendingOrInvalid} type="submit">
            Confirm outline
          </Button>
        </footer>
      </form>
    </Form>
  )
}
