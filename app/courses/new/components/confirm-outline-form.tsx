import { UseFormReturn } from 'react-hook-form'

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
import { Textarea } from '@/components/ui/textarea'

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
  const { isDirty, isValid } = form.formState

  const disabledOrInvalid = disabled || !isValid || !isDirty

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
                  <Textarea {...field} />
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
