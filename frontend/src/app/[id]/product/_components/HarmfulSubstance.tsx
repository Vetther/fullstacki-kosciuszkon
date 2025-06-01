import Card from "../../_components/Card"

type HarmfulSubstanceProps = {
  harmfulSubstances: string[]
}

export default function HarmfulSubstance({
  harmfulSubstances,
}: HarmfulSubstanceProps) {
  return (
    <Card className="flex flex-col justify-center gap-4">
      <h3 className="text-center">Zawartość substancji niebezpiecznych</h3>
      <div className="text-center text-2xl">
        <span className="text-red-700">
          {harmfulSubstances.length !== 0 ? "TAK" : "NIE"}
        </span>
        <br />
        <span className="text-red-700">
          {harmfulSubstances.length !== 0
            ? `(${harmfulSubstances.join(", ")})`
            : "Brak"}
        </span>
      </div>
    </Card>
  )
}
