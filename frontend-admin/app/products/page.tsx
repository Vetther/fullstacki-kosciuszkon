import { Suspense } from "react"
import DashboardLayout from "../components/DashboardLayout"
import ProductsList from "../components/ProductsList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
            <p className="text-slate-600 mt-2">Manage your product portfolio and compliance status</p>
          </div>
          <Link href="/products/new">
            <Button className="bg-slate-900 hover:bg-slate-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <Suspense fallback={<div className="animate-pulse bg-slate-200 h-96 rounded-lg" />}>
          <ProductsList />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
