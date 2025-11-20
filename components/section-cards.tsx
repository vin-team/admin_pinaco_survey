import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* 1. Tổng quan hiệu suất khảo sát (Total Surveys Performance) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng hiệu suất khảo sát</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            356
          </CardTitle>
          {/* Giả định: Không có dữ liệu so sánh/xu hướng cụ thể trong hình ảnh */}
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              N/A
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tổng số khảo sát được giao
          </div>
          <div className="text-muted-foreground">
            Bao gồm khảo sát đã hoàn thành và mới
          </div>
        </CardFooter>
      </Card>

      {/* 2. Khảo sát đã hoàn thành (Completed Surveys) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Khảo sát đã hoàn thành</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            300
          </CardTitle>
          {/* Giả định: Không có dữ liệu so sánh/xu hướng cụ thể trong hình ảnh */}
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              N/A
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Mục tiêu hoàn thành
          </div>
          <div className="text-muted-foreground">
            Cần theo dõi tỷ lệ hoàn thành
          </div>
        </CardFooter>
      </Card>

      {/* 3. Tỷ lệ hoàn thành khảo sát (Survey Completion Rate) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tỷ lệ hoàn thành khảo sát</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            84%
          </CardTitle>
          {/* Giả định: Không có dữ liệu so sánh/xu hướng cụ thể trong hình ảnh */}
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              N/A
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Hiệu suất làm việc <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Tỷ lệ giữa đã hoàn thành / tổng số khảo sát
          </div>
        </CardFooter>
      </Card>

      {/* 4. Số lượng khảo sát mới (New Surveys Quantity) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Số lượng khảo sát mới</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            23
          </CardTitle>
          {/* Giả định: Không có dữ liệu so sánh/xu hướng cụ thể trong hình ảnh */}
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              N/A
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Số lượng khảo sát còn lại <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Cần được ưu tiên hoàn thành
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}