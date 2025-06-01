import Card from "../../_components/Card"
import Sub from "~/components/Sub"

type CarbonFootprintProps = {
  carbonFootprint: number
}

export default function CarbonFootprint({
  carbonFootprint,
}: CarbonFootprintProps) {
  return (
    <Card className="flex flex-col justify-center gap-4">
      <h3 className="text-center">
        Ślad węglowy (CO<Sub>2</Sub>)
      </h3>
      <span className="w-full text-center text-2xl">
        {carbonFootprint} CO<Sub>2</Sub>e
      </span>
    </Card>
  )
}
