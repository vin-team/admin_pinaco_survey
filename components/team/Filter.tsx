import React from "react";
import { Search, Trash2, Upload, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dữ liệu giả định
const positions = [
  { value: "admin", label: "Admin" },
  { value: "surveyor", label: "Chuyên viên khảo sát" },
  { value: "sales", label: "Nhân viên kinh doanh" },
];

const regions = [
  { value: "hanoi", label: "Hà Nội" },
  { value: "hochiminh", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
];

export default function TeamFilterBar() {
  return (
    <div className="w-full px-4 pb-4 pt-0 bg-white">
      
      {/* UPDATE 1: Thêm 'ml-6' để di chuyển label qua phải */}
      <h3 className="text-sm font-medium text-gray-700 mb-2 ml-3">Đội ngũ</h3>

      <div className="flex flex-col xl:flex-row gap-4 items-end">
        
        {/* Vùng 4 ô Input/Select */}
        {/* UPDATE 2: Thêm 'px-6' để padding 2 bên trái phải cho vùng input */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 flex-1 w-full px-2">
          {/* 1. Mã nhân viên */}
          <Input
            type="text"
            placeholder="Mã nhân viên"
            className="bg-gray-200 border-transparent focus-visible:ring-offset-0 placeholder:text-gray-500 h-8 text-xs w-full"
          />

          {/* 2. Tên nhân viên */}
          <Input
            type="text"
            placeholder="Họ và tên"
            className="bg-gray-200 border-transparent focus-visible:ring-offset-0 placeholder:text-gray-500 h-8 text-xs w-full"
          />

          {/* 3. Chức vụ */}
          <Select>
            <SelectTrigger className="bg-gray-200 border-transparent focus:ring-offset-0 text-gray-500 h-8 text-xs w-full px-3">
              <SelectValue placeholder="Chức vụ" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
                <SelectItem key={pos.value} value={pos.value} className="text-xs">
                  {pos.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 4. Khu vực */}
          <Select>
            <SelectTrigger className="bg-gray-200 border-transparent focus:ring-offset-0 text-gray-500 h-8 text-xs w-full px-3">
              <SelectValue placeholder="Khu vực" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((area) => (
                <SelectItem key={area.value} value={area.value} className="text-xs">
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vùng các nút bấm */}
        {/* UPDATE 3: Thêm 'mr-6' để đẩy các nút qua trái (cách lề phải ra) */}
        <div className="flex flex-col gap-1 shrink-0 min-w-[160px] mr-6">
          {/* Hàng 1: Import / Export */}
          <div className="flex gap-1 justify-end">
            <Button 
              variant="secondary" 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium w-20 shadow-sm h-8 text-xs"
            >
              Import
            </Button>
            <Button 
              variant="secondary" 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium w-20 shadow-sm h-8 text-xs"
            >
              Export
            </Button>
          </div>

          {/* Hàng 2: Lọc / Xóa */}
          <div className="flex gap-1 justify-end">
            <Button 
              variant="secondary" 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-20 rounded-full shadow-sm h-8 text-xs"
            >
              Lọc
            </Button>
            <Button 
              variant="secondary" 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-20 rounded-full shadow-sm h-8 text-xs"
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}