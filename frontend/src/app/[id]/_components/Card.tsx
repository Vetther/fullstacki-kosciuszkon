import { cn } from "~/lib/utils"

export default function Card({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("flex-1 rounded-md bg-white p-4", className)}>
      {children}
    </div>
  )
}
