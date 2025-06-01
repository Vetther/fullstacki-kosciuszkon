import { createTRPCRouter, publicProcedure } from "../trpc"
import axios from "axios"
import { z } from "zod"

type Shipment = {
  id: string
  countryFrom: string
  countryFromCode: string
  countryTo: string
  countryToString: string
  type: string
  stages: { name: string; description: string }[]
  productId: string
}

export const shipmentRouter = createTRPCRouter({
  getByProduct: publicProcedure.input(z.string()).query(async ({ input }) => {
    const data = await axios.get<Shipment>(
      `${process.env.BACKEND_URL}/api/products/${input}/shipment`,
    )

    return data.data
  }),
})
