import DashboardLayout from "../../components/DashboardLayout"
import AddProductForm from "../../components/AddProductForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewProductPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Add new Product</h1>
          <p className="text-slate-600 mt-2">Create a new Digital Product Passport entry</p>
        </div>

        <AddProductForm />
      </div>
    </DashboardLayout>
  )
}
