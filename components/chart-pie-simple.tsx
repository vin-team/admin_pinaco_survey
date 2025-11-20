"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart for market share"

// Dữ liệu giả định thị phần các hãng ắc quy
const chartData = [
  { brand: "gs", share: 40, fill: "var(--color-gs)" },
  { brand: "dongnai", share: 30, fill: "var(--color-dongnai)" },
  { brand: "enimac", share: 15, fill: "var(--color-enimac)" },
  { brand: "globe", share: 10, fill: "var(--color-globe)" },
  { brand: "other", share: 5, fill: "var(--color-other)" },
]

// Cấu hình màu sắc theo tông xanh dương #0f62ac
const chartConfig = {
  share: {
    label: "Thị phần (%)",
  },
  gs: {
    label: "GS Battery",
    color: "#0f62ac", // Màu gốc theo yêu cầu (Đậm nhất)
  },
  dongnai: {
    label: "Đồng Nai (Pinaco)",
    color: "#3f81bd", // Nhạt hơn cấp 1
  },
  enimac: {
    label: "Enimac",
    color: "#6ea0ce", // Nhạt hơn cấp 2
  },
  globe: {
    label: "Globe",
    color: "#9ec0df", // Nhạt hơn cấp 3
  },
  other: {
    label: "Khác",
    color: "#cedff0", // Nhạt nhất
  },
} satisfies ChartConfig

export function ChartPieSimple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cơ cấu thương hiệu Ắc quy</CardTitle>
        <CardDescription>(Thị phần)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="share"
              nameKey="brand"
              innerRadius={60} // Tạo lỗ tròn ở giữa (dạng Donut)
              strokeWidth={2}
              stroke="#fff" // Viền trắng để tách các khối rõ hơn khi cùng tông màu
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          GS đang dẫn đầu với 40% thị phần <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Số liệu tổng hợp tháng này
        </div>
      </CardFooter>
    </Card>
  )
}