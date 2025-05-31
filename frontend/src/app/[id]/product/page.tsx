import Card from "../_components/Card"
import Image from "next/image"
import { Separator } from "~/components/ui/separator"

const mockProduct = {
  img: "/images/mock.png",
  imgAlt: "battery",
  name: "Bateria EV",
  model: "CCP811 (NMC 811 Chemistry)",
  type: "Bateria",
  id: { key: "Identyfikator", value: "EVB-AETG-2023-07-..." },
  producer: { key: "Producent", value: "CustomCells SE" },
  dateOfProduction: { key: "Data produkcji", value: "2023-07-15" },
  placeOfProduction: { key: "Kraj produkcji", value: "Francja" },
  dateOfInstallation: { key: "Data instalacji", value: "2023-08-01" },
  vehicle: { key: "Pojazd", value: "Audi e-tron GT (2023)" },
  capacity: { key: "Pojemność nominalna", value: "50 Ah" },
  voltage: { key: "Napięcie nominalne", value: "20 V" },
  weight: { key: "Masa baterii", value: "51 g" },
  size: { key: "Wymiary baterii", value: "1.5m x 1m x 1.5m" },
}

export default function Product() {
  return (
    <div className="space-y-4 p-4">
      <Card className="relative aspect-[4/3]">
        <Image
          src={mockProduct.img}
          alt={mockProduct.imgAlt}
          fill
          className="object-contain"
        />
      </Card>
      <Card className="space-y-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{mockProduct.name}</h3>
            <span className="text-muted-foreground text-sm">
              {mockProduct.model}
            </span>
          </div>
          <span className="h-min rounded-md bg-[#CFDCE1] p-1.5 text-sm">
            {mockProduct.type}
          </span>
        </div>
        <Separator />
        <div>
          {[
            mockProduct.id,
            mockProduct.producer,
            mockProduct.dateOfProduction,
            mockProduct.dateOfInstallation,
            mockProduct.vehicle,
          ].map(({ key, value }) => (
            <div className="flex justify-between" key={key}>
              <span className="text-muted-foreground">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-lg">Informacje ogólne</h3>
        <div>
          {[
            mockProduct.capacity,
            mockProduct.voltage,
            mockProduct.weight,
            mockProduct.size,
          ].map(({ key, value }) => (
            <div className="flex justify-between" key={key}>
              <span className="text-muted-foreground">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
