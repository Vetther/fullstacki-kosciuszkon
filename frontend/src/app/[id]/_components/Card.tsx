import { cn } from "~/lib/utils"

export default function Card({
  children,
  className,
}: Children & { className?: string }) {
  return (
    <div className={cn("flex-1 rounded-md bg-white p-4 shadow-md", className)}>
      {children}
    </div>
  )
}
