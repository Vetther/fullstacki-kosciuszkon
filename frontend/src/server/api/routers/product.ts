import { createTRPCRouter, publicProcedure } from "../trpc"
import axios from "axios"
import { z } from "zod"

type Product = {
  id: string
  imageUrl: string
  name: string
  modelType: string
  productCategory: string
  baseInfo: {
    manufacturer: string
    productionCountry: string
    productionDate: string
    installationDate: string
    vehicleInfo: string
  }
  nominalCapacity: string
  nominalVoltage: string
  mass: string
  dimensions: string
  carbonFootprintValue: number
}

export const productRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }): Promise<Product> => {
      const data = await axios.get<Product>(
        `${process.env.BACKEND_URL}/products/${input}`,
      )

      return data.data
    }),
})
