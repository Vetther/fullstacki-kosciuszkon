import { mockProduct } from "../mock"
import CarbonFootprint from "./_components/CarbonFootprint"
import HarmfulSubstance from "./_components/HarmfulSubstance"
import ProductImage from "./_components/Image"
import Information from "./_components/Information"
import Recycling from "./_components/Recycling"
import Specifications from "./_components/Specifications"
import { api } from "~/trpc/server"

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await api.product.getById(id)

  return (
    <div className="space-y-4">
      <ProductImage img={mockProduct.img} alt={mockProduct.imgAlt} />
      <Specifications
        name={mockProduct.name}
        model={mockProduct.name}
        type={mockProduct.type}
        id={mockProduct.id}
        producer={mockProduct.producer}
        dateOfProduction={mockProduct.dateOfProduction}
        placeOfProduction={mockProduct.placeOfProduction}
        dateOfInstallation={mockProduct.dateOfInstallation}
        vehicle={mockProduct.vehicle}
      />
      <Information
        capacity={mockProduct.capacity}
        voltage={mockProduct.voltage}
        weight={mockProduct.weight}
        size={mockProduct.size}
      />
      <div className="flex gap-4">
        <Recycling materials={mockProduct.materials} />
        <div className="flex flex-1 flex-col space-y-4">
          <CarbonFootprint carbonFootprint={mockProduct.carbonFootprint} />
          <HarmfulSubstance harmfulSubstances={mockProduct.harmfulSubstances} />
        </div>
      </div>
    </div>
  )
}
