import Card from "../../_components/Card"
import { Separator } from "~/components/ui/separator"

type SpecificationProps = {
  name: string
  model: string
  type: string
  id: string
  producer: string
  dateOfProduction: string
  placeOfProduction: string
  dateOfInstallation: string
  vehicle: string
}

export default function Specifications({
  name,
  model,
  type,
  id,
  producer,
  dateOfProduction,
  placeOfProduction,
  dateOfInstallation,
  vehicle,
}: SpecificationProps) {
  const info = [
    { key: "Identyfikator", value: id },
    { key: "Producent", value: producer },
    { key: "Data produckji", value: dateOfProduction },
    { key: "Kraj produkcji", value: placeOfProduction },
    { key: "Data instalacji", value: dateOfInstallation },
    { key: "Pojazd", value: vehicle },
  ]
  return (
    <Card className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-muted-foreground text-sm">{model}</span>
        </div>
        <span className="h-min rounded-md bg-[#CFDCE1] p-1.5 text-sm">
          {type}
        </span>
      </div>
      <Separator />
      <div>
        {info.map(({ key, value }) => (
          <div className="flex justify-between" key={key}>
            <span className="text-muted-foreground">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
