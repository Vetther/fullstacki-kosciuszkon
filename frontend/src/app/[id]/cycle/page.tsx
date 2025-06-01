import { mockProduct } from "../mock"
import Battery from "./_components/Battery"
import Image from "next/image"
import { Button } from "~/components/ui/button"

export default function Cycle() {
  return (
    <div className="space-y-4">
      <Battery
        capacity={mockProduct.capacity}
        currentCapacity={mockProduct.currentCapacity}
        predictedLife={mockProduct.predictedLife}
      />
      <Button className="bg-tick hover:bg-tick-hover py-6">
        Znajdź najbliższy punkt zbiórki
      </Button>
      <Button className="py-6">Zgłoś baterię do utylizacji</Button>
      <div className="relative aspect-square">
        <Image src="/images/PL.png" alt="PL" fill className="object-contain" />
      </div>
    </div>
  )
}
