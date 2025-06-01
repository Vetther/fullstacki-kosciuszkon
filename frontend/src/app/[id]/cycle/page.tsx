import { mockProduct } from "../mock"
import Battery from "./_components/Battery"

export default function Cycle() {
  return (
    <div>
      <Battery
        capacity={mockProduct.capacity}
        currentCapacity={mockProduct.currentCapacity}
        predictedLife={mockProduct.predictedLife}
      />
    </div>
  )
}
