import Card from "../../_components/Card"
import Image from "next/image"

export default function AnalysisImage() {
  return (
    <Card className="relative aspect-[4/3]">
      <Image
        src="/images/map.png"
        alt="World Map"
        fill
        className="object-contain"
      />
    </Card>
  )
}
