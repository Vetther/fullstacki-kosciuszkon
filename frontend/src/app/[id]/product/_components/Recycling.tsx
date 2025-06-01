import Card from "../../_components/Card"
import PieDonutChart from "~/components/PieDonutChart"

type RecyclingProps = {
  materials: { name: string; amount: number }[]
}

export default function Recycling({ materials }: RecyclingProps) {
  return (
    <Card className="flex flex-1 flex-col">
      <h3 className="text-lg">Recycling</h3>
      <ul>
        {materials.map(material => (
          <li key={material.name} className="flex justify-between">
            <span className="text-muted-foreground before:pr-2 before:content-['•']">
              {material.name}
            </span>
            <span>{material.amount}%</span>
          </li>
        ))}
      </ul>
      <div className="grid flex-1 place-items-center">
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
      </div>
    </Card>
  )
}
