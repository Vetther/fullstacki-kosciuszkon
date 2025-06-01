import { Suspense } from "react"
import DashboardLayout from "./components/DashboardLayout"
import ProductsOverview from "./components/ProductsOverview"
import StatsCards from "./components/StatsCards"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Monitor your Digital Product Passport compliance</p>
        </div>

        <Suspense fallback={<div className="animate-pulse bg-slate-200 h-32 rounded-lg" />}>
          <StatsCards />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse bg-slate-200 h-96 rounded-lg" />}>
          <ProductsOverview />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
