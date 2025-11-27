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

// Dữ liệu giả định
const employees = [
  { id: 1, code: "NV001", position: "Admin", name: "Nguyễn Văn A", region: "Hà Nội", count: "10" },
  { id: 2, code: "NV002", position: "Admin", name: "Trần Thị B", region: "HCM", count: "5" },
  { id: 3, code: "NV003", position: "Chuyên viên khảo sát", name: "Lê Văn C", region: "Đà Nẵng", count: "12" },
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
    // THAY ĐỔI Ở ĐÂY: Thêm 'mx-6' để tạo khoảng trắng (margin) bên ngoài bảng
    // Thêm 'my-4' để có khoảng trắng trên dưới luôn cho thoáng
    <div className="mx-6 my-4 border border-gray-300 shadow-sm bg-white font-sans rounded-sm overflow-hidden">
      <div className="flex-1 overflow-auto">
        <Table>
          {/* Header */}
          <TableHeader className="bg-gray-200/80 sticky top-0 z-10">
            <TableRow className="hover:bg-gray-200/80 border-b-gray-300 h-10">
              <TableHead className="w-[60px] text-center p-0"></TableHead>
              {/* Giữ padding bên trong px-4 cho cân đối nội dung */}
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Mã nhân viên
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Chức vụ
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Họ và tên
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Khu vực
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Số lượng khảo sát
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((employee, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 h-10 transition-colors"
              >
                {/* Cột hành động */}
                <TableCell className="p-0 text-center">
                  <div className="flex justify-center items-center h-full">
                    <EmployeeDetailDialog />
                  </div>
                </TableCell>

                {/* Nội dung */}
                <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                  {employee.code}
                </TableCell>
                <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                  {employee.position}
                </TableCell>
                <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                  {employee.name}
                </TableCell>
                <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                  {employee.region}
                </TableCell>
                <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                  {employee.count}
                </TableCell>
              </TableRow>
            ))}

            {/* Dòng trống */}
            {Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={`empty-${i}`} className="h-10 border-b border-gray-300">
                <TableCell colSpan={6}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between text-[12px] font-medium text-black border-t border-gray-300">
        <div className="flex items-center">
          <span>số dòng mỗi trang : 50</span>
        </div>

        <div className="flex items-center gap-1 bg-white rounded px-1 py-0.5 shadow-sm">
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100 text-gray-400" disabled>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100 text-gray-400" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="px-3 font-bold text-black">1</span>

          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100 text-gray-600">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100 text-gray-600">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}