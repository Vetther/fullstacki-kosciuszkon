import Card from "../../_components/Card"
import PieDonutChart from "~/components/PieDonutChart"
import { api } from "~/trpc/server"

type RecyclingProps = {
  productId: string
}

export default async function Recycling({ productId }: RecyclingProps) {
  const materials = await api.recycledMaterials.getByProduct(productId)

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
  }

  const colors = materials.reduce<Record<string, string>>((acc, curr) => {
    acc[curr.name] = getRandomColor()
    return acc
  }, {})

  const config = Object.entries(colors).reduce(
    (acc, [name, color]) => {
      acc[name.toLowerCase()] = {
        label: name,
        color,
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  )

  const chartData = materials.map(material => ({
    material: material.name.toLowerCase(),
    amount: material.quantityPercentage,
    fill: colors[material.name] ?? getRandomColor(),
  }))

  return (
    <Card className="flex flex-1 flex-col">
      <h3 className="text-lg">Recycling</h3>
      <ul>
        {materials.map(material => (
          <li key={material.name} className="flex justify-between">
            <span
              className="text-muted-foreground pl-4"
              style={{ color: colors[material.name] }}
            >
              {material.name}
            </span>
            <span>{material.quantityPercentage}%</span>
          </li>
        ))}
      </ul>
      <div className="grid flex-1 place-items-center">
        <PieDonutChart
          config={config}
          data={chartData}
          dataKey="amount"
          nameKey="material"
        />
      </div>
    </Card>
  )
}
