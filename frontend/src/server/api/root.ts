import { harmfulSubstancesRouter } from "./routers/harmful-substances"
import { productRouter } from "./routers/product"
import { recycledMaterialsRouter } from "./routers/recycled-materials"
import { shipmentRouter } from "./routers/shipment"
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"

export const appRouter = createTRPCRouter({
  product: productRouter,
  recycledMaterials: recycledMaterialsRouter,
  harmfulSubstances: harmfulSubstancesRouter,
  shipment: shipmentRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
