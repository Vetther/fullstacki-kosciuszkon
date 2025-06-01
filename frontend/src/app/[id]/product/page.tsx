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
      {product.imageUrl && (
        <ProductImage img={product.imageUrl} alt={product.name} />
      )}
      <Specifications
        name={product.name}
        model={product.modelType}
        category={product.productCategory}
        id={product.id}
        manufacturer={product.baseInfo.manufacturer}
        dateOfProduction={product.baseInfo.productionDate}
        placeOfProduction={product.baseInfo.productionCountry}
        dateOfInstallation={product.baseInfo.installationDate}
        vehicle={product.baseInfo.vehicleInfo}
      />
      <Information
        capacity={product.nominalCapacity}
        voltage={product.nominalVoltage}
        mass={product.mass}
        dimensions={product.dimensions}
      />
      <div className="flex gap-4">
        <Recycling productId={id} />
        <div className="flex flex-1 flex-col space-y-4">
          <CarbonFootprint carbonFootprint={product.carbonFootprintValue} />
          <HarmfulSubstance productId={id} />
        </div>
      </div>
    </div>
  )
}
