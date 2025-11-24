import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
// Import component popup từ file teamdetail.tsx
import { EmployeeDetailDialog } from "./teamdetail";

// Dữ liệu giả định (Mock data)
const employees = [
  { id: 1, code: "", position: "Admin", name: "", region: "", count: "" },
  { id: 2, code: "", position: "Admin", name: "", region: "", count: "" },
  { id: 3, code: "", position: "chuyên viên khảo sát", name: "chuyên viên khảo sát", region: "", count: "" },
  { id: 4, code: "", position: "", name: "", region: "", count: "" },
  { id: 5, code: "", position: "", name: "", region: "", count: "" },
  { id: 6, code: "", position: "", name: "", region: "", count: "" },
  { id: 7, code: "", position: "", name: "", region: "", count: "" },
  { id: 8, code: "", position: "", name: "", region: "", count: "" },
  { id: 9, code: "", position: "", name: "", region: "", count: "" },
  { id: 10, code: "", position: "", name: "", region: "", count: "" },
];

export default function EmployeeTable() {
  return (
    <div className="w-full border border-gray-200 shadow-sm">
      {/* Table Container */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200 hover:bg-gray-200 border-b-gray-300">
            {/* Cột Icon mắt */}
            <TableHead className="w-[60px] text-center font-bold text-black"></TableHead>
            
            <TableHead className="font-bold text-black text-xs md:text-sm">
              Mã nhân viên
            </TableHead>
            <TableHead className="font-bold text-black text-xs md:text-sm">
              Chức vụ
            </TableHead>
            <TableHead className="font-bold text-black text-xs md:text-sm">
              Họ và tên
            </TableHead>
            <TableHead className="font-bold text-black text-xs md:text-sm">
              Khu vực
            </TableHead>
            <TableHead className="font-bold text-black text-xs md:text-sm">
              Số lượng khảo sát
            </TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index} className="border-b-gray-200">
              {/* Cột hành động: Gọi Popup EmployeeDetailDialog */}
              <TableCell className="py-3">
                <div className="flex justify-center">
                  {/* Component này đã chứa sẵn nút bấm hình con mắt (Eye) */}
                  <EmployeeDetailDialog />
                </div>
              </TableCell>

              {/* Các cột dữ liệu */}
              <TableCell className="py-3 text-gray-700">
                {employee.code}
              </TableCell>
              <TableCell className="py-3 text-gray-700">
                {employee.position}
              </TableCell>
              <TableCell className="py-3 text-gray-700">
                {employee.name}
              </TableCell>
              <TableCell className="py-3 text-gray-700">
                {employee.region}
              </TableCell>
              <TableCell className="py-3 text-gray-700">
                {employee.count}
              </TableCell>
            </TableRow>
          ))}
          
          {/* Tạo thêm các dòng trống */}
          {Array.from({ length: 3 }).map((_, i) => (
             <TableRow key={`empty-${i}`} className="h-[57px] border-b-gray-200">
                <TableCell colSpan={6}></TableCell>
             </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between bg-gray-200 px-4 py-2 text-xs md:text-sm text-gray-700 border-t border-gray-300">
        <div className="font-medium">
          số dòng mỗi trang : 50
        </div>

        <div className="flex items-center gap-1 bg-white rounded px-1 py-0.5">
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100" disabled>
            <ChevronsLeft className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100" disabled>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </Button>
          
          <span className="px-2 font-semibold text-gray-700">1</span>
          
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100">
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
           <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100">
            <ChevronsRight className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
}