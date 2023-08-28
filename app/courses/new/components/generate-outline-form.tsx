import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { LanguageSelect } from './language-select'
import { GenerateOutlineFormValues } from './types'

interface GenerateOutlineFormProps {
  isPending: boolean
  isPrimary: boolean
  onCancel: () => void
  onGenerate: (values: GenerateOutlineFormValues) => void
  form: UseFormReturn<GenerateOutlineFormValues>
}

export function GenerateOutlineForm({
  isPending,
  isPrimary,
  onCancel,
  onGenerate,
  form,
}: GenerateOutlineFormProps) {
  const { isDirty, isValid } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course title</FormLabel>
              <FormControl>
                <Input placeholder="Cooking 101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your course..." {...field} />
              </FormControl>
              <FormDescription>
                Write a one to three sentence description of your course&apos;s contents.
              </FormDescription>
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
                  <SelectItem value="13">13 weeks</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course language</FormLabel>
              <LanguageSelect
                onValueChange={field.onChange}
                defaultValue={field.value + ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <footer>
          <p className="text-muted-foreground prose prose-sm dark:prose-invert">
            By submitting this form, you agree to our{' '}
            <Link prefetch={false} href="/terms">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link prefetch={false} href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex justify-end mt-5">
            {isPending ? (
              <Button
                variant="secondary"
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  onCancel()
                }}
              >
                Cancel...
              </Button>
            ) : (
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                variant={isPrimary ? 'default' : 'secondary'}
              >
                {isPrimary ? 'Generate outline' : 'Re-generate outline'}
              </Button>
            )}
          </div>
        </footer>
      </form>
    </Form>
  )
}
