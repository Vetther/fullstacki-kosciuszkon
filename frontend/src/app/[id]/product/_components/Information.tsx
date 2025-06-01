import Card from "../../_components/Card"

type InformationProps = {
  capacity: string
  voltage: string
  mass: string
  dimensions: string
}

export default function Information({
  capacity,
  voltage,
  mass,
  dimensions,
}: InformationProps) {
  const info = [
    { key: "Pojemność nominalna", value: capacity },
    { key: "Napięcie nominalne", value: voltage },
    { key: "Masa baterii", value: mass },
    { key: "Wymiary baterii", value: dimensions },
  ]

  return (
    <Card className="space-y-4">
      <h3 className="text-lg">Informacje ogólne</h3>
      <div className="space-y-2">
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
