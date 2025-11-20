"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dữ liệu cho các tab
const tabItems = [
    { value: "tong_quan", label: "Tổng quan", content: "Nội dung Tổng quan" },
    { value: "ql_ks", label: "Quản lý khảo sát", content: "Nội dung Quản lý khảo sát" },
    { value: "ch_ks", label: "Câu hỏi khảo sát", content: "Nội dung Câu hỏi khảo sát" },
    { value: "ql_dn", label: "Quản lý đội ngũ", content: "Nội dung Quản lý đội ngũ" },
]

export function NavigationTabs() {
  return (
    // Đặt giá trị mặc định là 'tong_quan'
    <Tabs defaultValue="tong_quan" className="w-full">
      <div className="flex justify-end pr-4 lg:pr-6">
        <TabsList className="h-9"> 
          {tabItems.map((item) => (
            <TabsTrigger 
              key={item.value} 
              value={item.value}
              // Tối ưu kích thước chữ trên mobile
              className="px-3 py-1 text-sm sm:text-base h-8" 
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {/* Phần TabsContent này thường được đặt ở nơi nội dung cần thay đổi.
        Tuy nhiên, trong dashboard của bạn, các tab này có thể chỉ là điều hướng.
        Tôi vẫn đặt phần nội dung ở đây để bạn tham khảo cách sử dụng đầy đủ.
        Bạn có thể di chuyển hoặc bỏ qua phần này tùy thuộc vào cách bạn quản lý nội dung.
      */}
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value} className="mt-4">
          {/* Thay thế bằng component hoặc nội dung thực tế của bạn */}
          {item.content}
        </TabsContent>
      ))}
      
    </Tabs>
  )
}