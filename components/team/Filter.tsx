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
      
      {/* Tiêu đề giữ nguyên vị trí */}
      <h3 className="text-sm font-medium text-gray-700 mb-2 ml-3">Đội ngũ</h3>

      {/* Container chính: Flex row để mọi thứ nằm ngang */}
      <div className="flex w-full items-center gap-2 px-2">
        
        {/* Vùng 4 ô Input/Select: Dùng Grid 4 cột để chia đều không gian còn lại */}
        <div className="grid grid-cols-4 gap-2 flex-1">
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

        {/* Vùng các nút bấm: Flex row đơn giản, không ngắt dòng */}
        <div className="flex gap-2 shrink-0">
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
  );
}