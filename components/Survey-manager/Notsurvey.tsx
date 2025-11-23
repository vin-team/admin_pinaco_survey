import React from "react";
import { MapPin, Store, User, AlertCircle } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Reuse Component Map (Đảm bảo bạn đã có component này ở file gốc)
const MockMapDisplay = ({ label, subLabel, isGray = false }: { label: string; subLabel: string, isGray?: boolean }) => (
  <div className={`relative w-full h-48 rounded-md flex items-center justify-center overflow-hidden border border-gray-300 ${isGray ? 'bg-gray-300' : 'bg-gray-200'}`}>
    {/* Nếu là gray mode (chưa có data) thì không hiện grid nền */}
    {!isGray && (
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
    )}
    
    <div className="z-10 flex flex-col items-center">
      <div className="relative">
        {/* Icon Pin: Màu cam nếu có data, màu xám đậm nếu không */}
        <MapPin className={`w-12 h-12 drop-shadow-lg ${isGray ? 'text-gray-500 fill-gray-400' : 'text-orange-600 fill-orange-100'} `} />
        <span className={`absolute top-2 left-1/2 -translate-x-1/2 text-[12px] font-bold ${isGray ? 'text-gray-200' : 'text-orange-700'}`}>
          N
        </span>
      </div>
      
      {/* Label */}
      <div className="bg-white/90 px-3 py-1 rounded text-xs shadow-sm mt-2 text-center min-w-[120px]">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-gray-500">{subLabel}</p>
      </div>
    </div>
  </div>
);

// Component Chính
export default function NotSurveyedModal({ item }: { item: any }) {
  // Mock data chi tiết cho cửa hàng này (Trong thực tế bạn sẽ fetch API dựa vào item.id)
  const storeDetail = {
    name: item.name || "Tạp hóa Minh Anh (Demo)",
    address: item.attr3 || "Số 2 đường 1B, Phường An Lạc, Quận Bình Tân, TP.HCM",
    owner: "Chưa cập nhật",
    phone: "09xx xxx xxx",
  };

  return (
    <DialogContent className="max-w-5xl h-auto bg-gray-50 p-0 gap-0 overflow-hidden flex flex-col">
      
      {/* 1. HEADER */}
      <DialogHeader className="px-6 py-4 bg-white border-b shrink-0">
        <div className="flex flex-col gap-1 text-left">
          <DialogTitle className="text-sm font-normal text-gray-500">
            Danh sách khảo sát {">>"} <span className="font-bold text-black">{item.id}</span>
          </DialogTitle>
          <h2 className="text-lg font-bold text-gray-800">{storeDetail.name}</h2>
        </div>
      </DialogHeader>

      {/* 2. BODY CONTENT */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
        
        {/* Cột Trái: Thông tin cửa hàng (Vẫn hiển thị vì dữ liệu cửa hàng là cố định) */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase text-gray-700 flex items-center gap-2">
              <Store className="w-4 h-4" /> Thông tin cửa hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Map hiển thị vị trí cửa hàng */}
            <MockMapDisplay 
              label="Vị trí đăng ký" 
              subLabel="An Lạc, Bình Tân" 
            />
            
            <div className="text-sm space-y-2">
              <p><span className="font-semibold">Địa chỉ:</span> {storeDetail.address}</p>
              <p><span className="font-semibold">Chủ cửa hàng:</span> {storeDetail.owner}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Trạng thái hiện tại:</span>
                <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                  Chưa khảo sát
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cột Phải: Thông tin người khảo sát (Dữ liệu rỗng/Placeholder giống hình mẫu) */}
        <Card className="shadow-sm border-gray-200 bg-gray-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4" /> Thông tin người khảo sát
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Map màu xám (Gray mode) để thể hiện chưa có dữ liệu GPS */}
            <MockMapDisplay 
              label="Chưa có dữ liệu" 
              subLabel="User chưa check-in" 
              isGray={true} 
            />
            
            <div className="text-sm space-y-2 text-gray-500">
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Cảnh báo: Chưa có nhân viên ghé thăm</span>
              </div>
              <p><span className="font-semibold text-gray-400">GPS Check-in:</span> --/--</p>
              <p><span className="font-semibold text-gray-400">Nhân viên phụ trách:</span> Nguyễn Văn A</p>
              <p><span className="font-semibold text-gray-400">Thời gian:</span> --:--</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. FOOTER ACTION */}
      <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
         <div className="text-sm text-gray-500">
            Cập nhật lần cuối: <span className="font-medium text-black">Chưa có</span>
         </div>
         <Button 
            className="bg-black text-white hover:bg-gray-800 shadow-md"
            onClick={() => alert("Đã gửi yêu cầu push notification cho nhân viên!")}
          >
            Yêu cầu khảo sát ngay
         </Button>
      </div>

    </DialogContent>
  );
}