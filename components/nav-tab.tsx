"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReactNode } from "react"

// Định nghĩa kiểu dữ liệu cho mỗi Tab
interface TabItem {
  value: string
  label: string
  component: ReactNode | null // Component con, hoặc null nếu chưa có
}

interface NavigationTabsProps {
  items: TabItem[]
}

export function NavigationTabs({ items }: NavigationTabsProps) {
  const router = useRouter()
  const params = useSearchParams()

  // Lấy tab hiện tại từ URL, mặc định là tab đầu tiên trong danh sách
  const currentTab = params.get("tab") || items[0]?.value

  const handleTabChange = (value: string) => {
    // Cập nhật URL khi đổi tab
    router.replace(`?tab=${value}`)
  }

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full flex flex-col">
      {/* Phần Menu Tabs - Được căn phải */}
      <div className="flex justify-end px-4 lg:px-6 pb-2">
        <TabsList className="h-9">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="px-3 py-1 text-sm sm:text-base h-8"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Phần Nội dung của Tab - Hiển thị full bên dưới */}
      <div className="flex-1">
        {items.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value}
            className="mt-0" // Reset margin để content sát với header hơn nếu cần
          >
            {item.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}