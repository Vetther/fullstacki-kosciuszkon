import Card from "../../_components/Card"
import { api } from "~/trpc/server"

type LocationProps = {
  productId: string
}

export default async function Location({ productId }: LocationProps) {
  const shipment = await api.shipment.getByProduct(productId)

  return (
    <Card className="space-y-4">
      <div className="flex justify-between">
        <h3>Kraj pochodzenia</h3>
        <span>{shipment.countryFrom}</span>
      </div>
      <ul>
        {shipment.stages.map(stage => (
          <li
            key={stage.name}
            className="text-muted-foreground flex items-center justify-between text-sm"
          >
            <span>{stage.name}</span>
            <span className="relative flex flex-col items-center">
              <span className="before:block before:h-4 before:w-px before:bg-green-400/30" />
              <span className="h-2 w-2 rounded-full bg-green-600/30" />
              <span className="after:block after:h-4 after:w-px after:bg-green-400/30" />
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <h3>Lokalizacja końcowa</h3>
        <span>{shipment.countryTo}</span>
      </div>
    </Card>
  )
}
