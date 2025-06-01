import Card from "../../_components/Card"
import { api } from "~/trpc/server"

type HarmfulSubstanceProps = {
  productId: string
}

export default async function HarmfulSubstance({
  productId,
}: HarmfulSubstanceProps) {
  const substances = await api.harmfulSubstances.getByProduct(productId)

  return (
    <Card className="flex flex-col justify-center gap-4">
      <h3 className="text-center">Zawartość substancji niebezpiecznych</h3>
      <div className="text-center text-2xl">
        <span className="text-red-700">
          {substances.length !== 0 ? "TAK" : "NIE"}
        </span>
        <br />
        <span className="text-red-700">
          {substances.length !== 0
            ? `(${substances.map(s => s.name).join(", ")})`
            : "Brak"}
        </span>
      </div>
    </Card>
  )
}
