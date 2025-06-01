import Card from "../../_components/Card"

type InformationProps = {
  capacity: string
  voltage: string
  weight: string
  size: string
}

export default function Information({
  capacity,
  voltage,
  weight,
  size,
}: InformationProps) {
  const info = [
    { key: "Pojemność nominalna", value: capacity },
    { key: "Napięcie nominalne", value: voltage },
    { key: "Masa baterii", value: weight },
    { key: "Wymiary baterii", value: size },
  ]

  return (
    <Card>
      <h3 className="text-lg">Informacje ogólne</h3>
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
