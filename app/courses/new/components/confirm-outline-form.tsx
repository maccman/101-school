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
import { Separator } from '@/components/ui/separator'

import { ConfirmOutlineFormValues } from './types'

interface ConfirmOutlineFormProps {
  disabled: boolean
  onSubmit: (values: ConfirmOutlineFormValues) => void
  form: UseFormReturn<ConfirmOutlineFormValues>
}

export function ConfirmOutlineForm({
  form,
  disabled,
  onSubmit,
}: ConfirmOutlineFormProps) {
  const { isValid } = form.formState

  const disabledOrInvalid = !isValid || disabled

  function handleSubmit(values: ConfirmOutlineFormValues) {
    if (disabledOrInvalid) {
      return
    }

    onSubmit(values)
  }

  return (
    <div>
      <Separator className="mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generated content</FormLabel>
                <FormControl>
                  <ScrollingTextarea {...field} className="min-h-[400px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <footer className="flex justify-end">
            <Button disabled={disabledOrInvalid} type="submit">
              Confirm outline
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  )
}
