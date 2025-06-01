import Card from "../../_components/Card"
import { TiTick } from "react-icons/ti"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/server"

type StatusProps = {
  productId: string
}

const stages = [
  { status: "PREPARING", description: "W przygotowaniu" },
  { status: "READY_FOR_PICKUP", description: "Oczekuje na odbiór" },
  { status: "IN_TRANSIT", description: "W drodze" },
  { status: "DELIVERED", description: "Dostarczono do magazynu" },
  { status: "RETURNED", description: "Dostarczono do klienta" },
]

export default async function Status({ productId }: StatusProps) {
  const { type } = await api.shipment.getByProduct(productId)
  const currentStageIndex = stages.findIndex(stage => stage.status === type)

  return (
    <Card className="space-y-4">
      <h3 className="text-xl">Stan produktu</h3>
      <ul className="space-y-2">
        {stages.map((stage, i) => (
          <li key={i} className="flex items-center justify-between">
            <span
              className={
                i === currentStageIndex ? "text-black" : "text-tick-text"
              }
            >
              {stage.description}
            </span>
            {i <= currentStageIndex && (
              <span className="p-1">
                <TiTick
                  className={cn(
                    "rounded-full",
                    i === currentStageIndex
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
