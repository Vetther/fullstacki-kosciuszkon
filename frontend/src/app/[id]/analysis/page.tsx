import Card from "../_components/Card"
import Image from "next/image"
import { TiTick } from "react-icons/ti"
import { cn } from "~/lib/utils"

const stages = [
  "W przygotowaniu",
  "Oczekuje na odbiór",
  "W drodze",
  "Dostarczono do magazynu",
  "Dostarczono do klienta",
]

export default function Analysis() {
  const currentStage = 2

  return (
    <div className="space-y-4">
      <Card className="relative aspect-[4/3]">
        <Image
          src="/images/map.png"
          alt="World Map"
          fill
          className="object-contain"
        />
      </Card>
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
    </div>
  )
}
