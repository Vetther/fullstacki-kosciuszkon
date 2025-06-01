import Card from "../../_components/Card"
import Image from "next/image"

type ProductImageProps = {
  img: string
  alt: string
}

export default function ProductImage({ img, alt }: ProductImageProps) {
  return (
    <Card className="relative aspect-[4/3]">
      <Image src={img} alt={alt} fill className="object-contain" />
    </Card>
  )
}
