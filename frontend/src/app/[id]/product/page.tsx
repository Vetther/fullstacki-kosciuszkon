import Card from "../_components/Card"
import Image from "next/image"
import PieDonutChart from "~/components/PieDonutChart"
import Sub from "~/components/Sub"
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
  materials: [
    { name: "Lit", amount: 2 },
    { name: "Kobalt", amount: 3 },
    { name: "Nikiel", amount: 1 },
  ],
  carbonFootprint: 40,
  harmfulSubstances: ["Ni"],
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
      <div className="flex gap-4">
        <Card className="flex-1">
          <h3 className="text-lg">Recycling</h3>
          <ul>
            {mockProduct.materials.map(material => (
              <li key={material.name} className="flex justify-between">
                <span className="text-muted-foreground">{material.name}</span>
                <span>{material.amount}%</span>
              </li>
            ))}
          </ul>
          <PieDonutChart
            config={{
              lit: {
                label: "Lit",
                color: "#A8D1D3",
              },
              kobalt: {
                label: "Kobalt",
                color: "#CEA8D3",
              },
              nikiel: {
                label: "Nikiel",
                color: "#D3A8A9",
              },
            }}
            data={[
              { substance: "lit", amount: 2, fill: "#A8D1D3" },
              { substance: "kobalt", amount: 3, fill: "#CEA8D3" },
              { substance: "nikiel", amount: 1, fill: "#D3A8A9" },
            ]}
            dataKey="amount"
            nameKey="substance"
          />
        </Card>
        <div className="flex flex-1 flex-col space-y-4">
          <Card className="flex flex-col justify-center gap-4">
            <h3 className="text-center">
              Ślad węglowy (CO<Sub>2</Sub>)
            </h3>
            <span className="w-full text-center text-2xl">
              {mockProduct.carbonFootprint} CO<Sub>2</Sub>e
            </span>
          </Card>
          <Card className="flex flex-col justify-center gap-4">
            <h3 className="text-center">
              Zawartość substancji niebezpiecznych
            </h3>
            <div className="text-center text-2xl">
              <span className="text-red-700">
                {mockProduct.harmfulSubstances.length !== 0 ? "TAK" : "NIE"}
              </span>
              <br />
              <span className="text-red-700">
                {mockProduct.harmfulSubstances.length !== 0
                  ? `(${mockProduct.harmfulSubstances.join(", ")})`
                  : "Brak"}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
