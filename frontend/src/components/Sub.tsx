import { cn } from "~/lib/utils"

export default function Sub({
  children,
  className,
}: Children & { className?: string }) {
  return <sub className={cn("align-sub text-xs", className)}>{children}</sub>
}
