import { productRouter } from "./routers/product"
import { recycledMaterialsRouter } from "./routers/recycled-materials"
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"

export const appRouter = createTRPCRouter({
  product: productRouter,
  recycledMaterials: recycledMaterialsRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
