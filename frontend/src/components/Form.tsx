import { Form as FormProvider } from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type DefaultValues,
  type UseFormReturn,
  useForm,
} from "react-hook-form"
import { type z } from "zod"
import { cn } from "~/lib/utils"

type FormProps<T extends z.SomeZodObject> = {
  children: (form: UseFormReturn<z.infer<T>>) => React.ReactNode
  onSubmit: (values: z.infer<T>) => void
  schema: T
} & Omit<React.ComponentProps<"form">, "children" | "action" | "onSubmit">

function createDefaultValues<T extends z.SomeZodObject>(schema: T) {
  return Object.keys(schema.shape).reduce(
    (acc, curr) => ({ ...acc, [curr]: "" }),
    {} as DefaultValues<z.infer<T>>,
  )
}

export default function Form<T extends z.SomeZodObject>({
  onSubmit,
  children,
  className,
  schema,
  ...props
}: FormProps<T>) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: createDefaultValues(schema),
  })

  return (
    <FormProvider {...form}>
      <form
        {...props}
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(values => onSubmit(values))}
      >
        {children(form)}
      </form>
    </FormProvider>
  )
}
