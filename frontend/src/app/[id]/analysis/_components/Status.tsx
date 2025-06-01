import Card from "../../_components/Card"
import { TiTick } from "react-icons/ti"
import { cn } from "~/lib/utils"

type StatusProps = {
  currentStage: number
  stages: string[]
}

export default function Status({ currentStage, stages }: StatusProps) {
  return (
    <Card className="space-y-4">
      <h3 className="text-xl">Stan produktu</h3>
      <ul className="space-y-2">
        {stages.map((stage, i) => (
          <li key={i} className="flex items-center justify-between">
            <span className="text-muted-foreground">{stage}</span>
            {i <= currentStage && (
              <span className="p-1">
                <TiTick
                  className={cn(
                    "rounded-full",
                    i === currentStage
                      ? "bg-tick text-white"
                      : "text-tick-text bg-[#E3E3E3]",
                  )}
                />
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
