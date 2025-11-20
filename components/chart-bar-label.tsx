"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
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

export const description = "A bar chart distribution by region"

// Dữ liệu giả lập theo hình ảnh (HCM cao nhất, giảm dần về HN)
const chartData = [
  { region: "HCM", visitors: 24 },
  { region: "Đông Nam Bộ", visitors: 18 },
  { region: "Miền Tây", visitors: 14 },
  { region: "Đà Nẵng", visitors: 12 },
  { region: "HN & lân cận", visitors: 8 },
]

const chartConfig = {
  visitors: {
    label: "Điểm viếng thăm",
    color: "#2563eb", // Màu xanh dương đậm giống trong hình
  },
} satisfies ChartConfig

export function ChartBarLabel() {
  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6">
        <CardTitle className="text-base font-bold text-slate-700">
          Phân bố điểm đã viếng thăm
        </CardTitle>
        {/* Badge "Theo khu vực" */}
        <div className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
          Theo khu vực
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-2">
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20, // Kéo trục Y sát lề trái
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            
            {/* Trục X hiển thị tên khu vực */}
            <XAxis
              dataKey="region"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => {
                // Rút gọn tên nếu quá dài trên mobile
                if (value === "HN & lân cận") return "HN & lân cận"
                return value
              }}
            />
            
            {/* Trục Y hiển thị số lượng (0, 6, 12, 18, 24) */}
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={5}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />

            <ChartTooltip
              cursor={{ fill: 'transparent' }}
              content={<ChartTooltipContent hideLabel />}
            />
            
            {/* Cột biểu đồ */}
            <Bar 
              dataKey="visitors" 
              fill="var(--color-visitors)" 
              radius={[4, 4, 0, 0]} 
              barSize={32} // Độ rộng cột vừa phải
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
      {/* Footer giữ khoảng trắng padding để bằng với chart bên cạnh */}
      <CardFooter className="flex-col items-start gap-2 text-sm pt-4">
        {/* Có thể thêm chú thích ở đây nếu cần, hiện tại để trống để giữ padding */}
        <div className="h-4"></div> 
      </CardFooter>
    </Card>
  )
}