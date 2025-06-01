import { productRouter } from "./routers/product"
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"

export const appRouter = createTRPCRouter({
  product: productRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
