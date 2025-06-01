import Card from "../_components/Card"
import { mockProduct } from "../mock"
import CarbonFootprint from "./_components/CarbonFootprint"
import ProductImage from "./_components/Image"
import Information from "./_components/Information"
import Recycling from "./_components/Recycling"
import Specifications from "./_components/Specifications"

export default function Product() {
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
