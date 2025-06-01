"use client"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"
import { Pie, PieChart, ResponsiveContainer } from "recharts"

type PieDonutChartType<
  TData extends string,
  TName extends string,
  TItem extends Record<TData | TName, string | number> = Record<
    TData | TName,
    string | number
  >,
> = {
  config: ChartConfig
  dataKey: TData
  nameKey: TName
  data: (TItem & { fill: string })[]
}

export default function PieDonutChart<
  TData extends string,
  TName extends string,
>({ config, data, dataKey, nameKey }: PieDonutChartType<TData, TName>) {
  return (
    <ChartContainer config={config} className="aspect-square w-full">
      <ResponsiveContainer>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={25}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
