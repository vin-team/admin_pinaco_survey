"use client"

import * as React from "react"
import { 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Định nghĩa kiểu dữ liệu cho một hàng (Dummy data)
type SurveyItem = {
  id: string
  name: string
  attr1: string
  attr2: string
  attr3: string
  profile: string
  image: string
  status: string
}

// Dữ liệu mẫu giống trong hình
const data: SurveyItem[] = [
  {
    id: "1",
    name: "",
    attr1: "",
    attr2: "",
    attr3: "Số 2 đường 1B.......",
    profile: "",
    image: "5 hình ảnh",
    status: "Đã khảo sát",
  },
  {
    id: "2",
    name: "",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "Nan",
    status: "Chưa khảo sát",
  },
  {
    id: "3",
    name: "",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "",
    status: "Yêu cầu hỗ trợ",
  },
  {
    id: "4",
    name: "",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "",
    status: "Quá hạn khảo sát",
  },
  // Tạo thêm các dòng trống để giống hình
  ...Array(6).fill({
    id: "empty",
    name: "",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "",
    status: "",
  }),
]

export default function SurveyTable() {
  return (
    <div className="w-full border rounded-md bg-white shadow-sm flex flex-col">
      {/* --- PHẦN TABLE --- */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-gray-200/80 sticky top-0 z-10">
            <TableRow className="hover:bg-gray-200/80 border-b-gray-300">
              {/* Cột icon Action */}
              <TableHead className="w-[60px] text-center"></TableHead>
              
              {/* Các cột tiêu đề */}
              <TableHead className="font-bold text-black text-xs whitespace-nowrap">Tên điểm bán</TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap">Đặc tính 1</TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap">Đặc tính 2</TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap">Đặc tính 3</TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap">Profile</TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap">Hình ảnh</TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap text-right">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={`${item.id}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 h-12">
                {/* Nút xem chi tiết (Icon Mắt) */}
                <TableCell className="p-2 text-center">
                  <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-200">
                    <Eye className="w-4 h-4 text-black" />
                  </div>
                </TableCell>

                <TableCell className="text-xs font-medium">{item.name}</TableCell>
                <TableCell className="text-xs">{item.attr1}</TableCell>
                <TableCell className="text-xs">{item.attr2}</TableCell>
                <TableCell className="text-xs text-gray-600">{item.attr3}</TableCell>
                <TableCell className="text-xs">{item.profile}</TableCell>
                <TableCell className="text-xs text-gray-600">{item.image}</TableCell>
                
                {/* Trạng thái căn phải */}
                <TableCell className="text-xs text-right">
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- PHẦN FOOTER (PAGINATION) --- */}
      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between text-xs font-medium text-gray-700 mt-auto">
        
        {/* Bên trái: Số dòng mỗi trang */}
        <div className="flex items-center gap-2">
          <span>số dòng mỗi trang : 50</span>
        </div>

        {/* Bên phải: Controls điều hướng trang */}
        <div className="flex items-center gap-1 bg-white rounded px-2 py-1 shadow-sm">
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100">
            <ChevronsLeft className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </Button>
          
          <span className="px-2 font-bold text-black">1</span>
          
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100">
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100">
            <ChevronsRight className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

      </div>
    </div>
  )
}