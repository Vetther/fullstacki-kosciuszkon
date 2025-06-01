import Card from "../../_components/Card"
import Image from "next/image"

type BatteryProps = {
  capacity: string
  currentCapacity: string
  predictedLife: string
}

export default function Battery({
  capacity,
  currentCapacity,
  predictedLife,
}: BatteryProps) {
  const info = [
    { key: "Pojemność nominalna", value: capacity },
    { key: "Aktualna pojemność (szacowana)", value: currentCapacity },
    { key: "Przewidywany czas życia (szacowany)", value: predictedLife },
  ]

  return (
    <Card className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg">Żywotność baterii</h3>
          <span className="text-sm">
            <span className="text-muted-foreground">Szacowany stan:</span>{" "}
            <span className="text-red-600">13%</span>
          </span>
        </div>
        <div className="relative w-24">
          <Image
            src="/images/battery.png"
            alt="Battery Health"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <ul className="text-sm">
        {info.map(({ key, value }) => (
          <li key={key} className="flex justify-between">
            <span className="text-muted-foreground">{key}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
