"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

// Dữ liệu mô phỏng theo tiến độ khảo sát trong tuần (T2 đến CN)
const chartData = [
  { day: "T2", surveys: 8 },
  { day: "T3", surveys: 12 },
  { day: "T4", surveys: 10 },
  { day: "T5", surveys: 14 },
  { day: "T6", surveys: 6 },
  { day: "T7", surveys: 7 },
  { day: "CN", surveys: 10 },
]

const chartConfig = {
  surveys: {
    label: "Số lượng khảo sát",
    color: "#0f62ac", // Đã cập nhật màu xanh dương theo yêu cầu
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("currentWeek")

  React.useEffect(() => {
    // Logic check mobile nếu cần
  }, [isMobile])

  const filteredData = chartData

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Tiến độ khảo sát trong tuần</CardTitle>
        <CardDescription>
          Hiệu suất hoàn thành khảo sát theo ngày
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="*:data-[slot=toggle-group-item]:!px-4 flex"
          >
            <ToggleGroupItem value="currentWeek">Tuần hiện tại</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData} margin={{ left: -10 }}>
            <defs>
              <linearGradient id="fillSurveys" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-surveys)"
                  stopOpacity={0.8} 
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-surveys)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              domain={[0, 16]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Ngày: ${value}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="surveys"
              type="natural"
              fill="url(#fillSurveys)"
              stroke="var(--color-surveys)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}