import { createTRPCRouter, publicProcedure } from "../trpc"
import axios from "axios"
import { z } from "zod"

type Material = {
  id: string
  name: string
  quantityPercentage: number
  productId: string
}

export const recycledMaterialsRouter = createTRPCRouter({
  getByProduct: publicProcedure.input(z.string()).query(async ({ input }) => {
    const data = await axios.get<Material[]>(
      `${process.env.BACKEND_URL}/products/${input}/recycled-materials`,
    )

    return data.data
  }),
})
