import { createTRPCRouter, publicProcedure } from "../trpc"
import axios from "axios"
import { z } from "zod"

type HarmfulSubstance = {
  name: string
  productId: string
}

export const harmfulSubstancesRouter = createTRPCRouter({
  getByProduct: publicProcedure.input(z.string()).query(async ({ input }) => {
    const data = await axios.get<HarmfulSubstance[]>(
      `${process.env.BACKEND_URL}/products/${input}/harmful-substances`,
    )

    return data.data ?? []
  }),
})
