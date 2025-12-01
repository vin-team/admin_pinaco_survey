import React from "react";
// Đã xóa Store, User khỏi dòng import này
import { MapPin, AlertTriangle, FileQuestion } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// Đã xóa import Separator vì không sử dụng

// --- Mock Component Map (Tái sử dụng để hiển thị đẹp) ---
const MockMapDisplay = ({ label, subLabel }: { label: string; subLabel: string }) => (
  <div className="relative w-full h-32 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden border border-gray-300">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
    <div className="z-10 flex flex-col items-center">
      <MapPin className="w-8 h-8 text-gray-500 fill-gray-300 drop-shadow-sm" />
      <div className="bg-white/90 px-2 py-1 rounded text-[10px] shadow-sm mt-1 text-center">
        <p className="font-bold">{label}</p>
        <p className="text-gray-500">{subLabel}</p>
      </div>
    </div>
  </div>
);

export default function SupportRequestModal({ item }: { item: any }) {
  // Mock Data dựa trên hình ảnh yêu cầu
  const requestReason = "Khác : cập nhật lại khoảng cách tọa độ (cách khoảng cách mới 1km)";

  return (
    <DialogContent className="max-w-5xl h-[90vh] flex flex-col bg-gray-50 p-0 gap-0 overflow-y-auto focus:outline-none">
      
      {/* 1. HEADER */}
      <DialogHeader className="px-6 py-4 bg-white border-b shrink-0">
        <div className="flex flex-col gap-1 text-left">
          <DialogTitle className="text-sm font-normal text-gray-500">
            Danh sách khảo sát {">>"} <span className="font-bold text-black">{item.id || "Mã điểm bán"}</span>
          </DialogTitle>
          {/* Tên cửa hàng (Mock) */}
          <h2 className="text-lg font-bold text-gray-800">{item.name || "Cửa hàng A"}</h2>
        </div>
      </DialogHeader>

      {/* 2. BODY (SCROLLABLE) */}
      <ScrollArea className="flex-1 w-full">
        <div className="p-6 pb-10 space-y-6">
          
          {/* --- Grid: Thông tin cửa hàng & Người khảo sát --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột Trái: Thông tin cửa hàng */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-gray-700">Thông tin cửa hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <MockMapDisplay label="Vị trí đăng ký" subLabel="Hệ thống" />
              </CardContent>
            </Card>

            {/* Cột Phải: Thông tin người khảo sát */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-gray-700">Thông tin người khảo sát</CardTitle>
              </CardHeader>
              <CardContent>
                <MockMapDisplay label="Vị trí thực tế" subLabel="User Check-in" />
              </CardContent>
            </Card>
          </div>

          {/* --- Section: Câu hỏi khảo sát (Gray Box lớn trong hình) --- */}
          <Card className="shadow-sm border-gray-200 bg-gray-100/50 min-h-[250px] flex flex-col">
             <CardHeader className="pb-2 border-b bg-white">
                <CardTitle className="text-sm font-bold text-gray-700">Câu hỏi khảo sát</CardTitle>
             </CardHeader>
             <CardContent className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                <FileQuestion className="w-12 h-12 mb-2 opacity-20" />
                <p>Nội dung khảo sát hiển thị tại đây</p>
                <p className="text-xs italic">(Dữ liệu chỉ xem, không thể chỉnh sửa trong trạng thái này)</p>
             </CardContent>
          </Card>

          {/* --- Section: Trạng thái & Lý do (Phần text dưới cùng trong hình) --- */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
               <span className="font-bold text-sm text-gray-900">Trạng thái:</span>
               <span className="text-sm font-medium text-orange-600 flex items-center gap-1">
                 <AlertTriangle className="w-4 h-4" /> Yêu cầu hỗ trợ
               </span>
            </div>
            
            <div className="text-sm text-gray-800">
              <span className="font-bold">Lý do/Ghi chú:</span> {requestReason}
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* 3. FOOTER BUTTONS (Fixed at bottom) */}
      <div className="p-6 bg-white border-t flex gap-4 shrink-0">
        <Button 
            className="bg-gray-300 hover:bg-gray-400 text-black min-w-[120px] rounded-none shadow-none"
            onClick={() => alert("Đã chấp nhận yêu cầu!")}
        >
            chấp nhận
        </Button>
        <Button 
            className="bg-gray-300 hover:bg-gray-400 text-black min-w-[120px] rounded-none shadow-none"
            onClick={() => alert("Đã từ chối yêu cầu!")}
        >
            từ chối
        </Button>
      </div>

    </DialogContent>
  );
}