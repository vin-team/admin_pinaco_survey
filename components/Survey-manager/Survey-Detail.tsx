import React, { useState, useEffect } from "react";
import { Eye, MapPin, Store, User, CheckCircle2, AlertCircle } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// --- MOCK DATA (Dữ liệu giả lập để hiển thị) ---
const MOCK_STORE_DATA = {
  id: "CH12345",
  name: "Tạp hóa Minh Anh",
  address: "Số 2 đường 1B, Phường An Lạc, Quận Bình Tân, TP.HCM",
  owner: "Nguyễn Văn A",
  phone: "0909 123 456",
  status: "Đã khảo sát",
};

// --- Dữ liệu giả lập đã được TĂNG CƯỜNG để đảm bảo cuộn ---
const MOCK_SURVEY_QUESTIONS = [
  {
    id: 1,
    question: "Cửa hàng có trưng bày sản phẩm mới không?",
    answer: "Có",
    note: "Đã trưng bày tại kệ chính",
    type: "boolean",
  },
  {
    id: 2,
    question: "Chụp ảnh trưng bày (Toàn cảnh)",
    answer: "image_url_placeholder",
    note: "Hình ảnh rõ nét",
    type: "image",
  },
  {
    id: 3,
    question: "Số lượng tồn kho hiện tại?",
    answer: "50 thùng",
    note: "",
    type: "text",
  },
  {
    id: 4,
    question: "Đánh giá thái độ chủ cửa hàng",
    answer: "Tích cực",
    note: "Chủ cửa hàng vui vẻ hợp tác",
    type: "text",
  },
  { id: 5, question: "Kiểm tra tem giá?", answer: "Đầy đủ", type: "text" },
  { id: 6, question: "Vật phẩm quảng cáo (POSM)?", answer: "Có treo banner", type: "text" },
  { id: 7, question: "Tình trạng tủ lạnh?", answer: "Hoạt động tốt", type: "text" },
  { id: 8, question: "Sản phẩm hết hạn?", answer: "Không có", type: "text" },
  { id: 9, question: "Ghi chú thêm", answer: "Cần bổ sung hàng tuần sau", type: "text" },
  // Thêm các câu hỏi bổ sung để buộc nội dung phải cuộn
  { id: 10, question: "Tình trạng vệ sinh chung của cửa hàng?", answer: "Sạch sẽ", note: "Đã nhắc nhở sắp xếp gọn gàng hơn", type: "text" },
  { id: 11, question: "Kiểm tra trưng bày khu vực đồ uống lạnh?", answer: "Đạt chuẩn", note: "", type: "text" },
  { id: 12, question: "Số lượng POSM theo yêu cầu?", answer: "3 loại", note: "Thiếu banner chính", type: "text" },
  { id: 13, question: "Ý kiến đề xuất từ chủ cửa hàng?", answer: "Yêu cầu tăng chiết khấu", note: "", type: "text" },
  { id: 14, question: "Thời gian khảo sát hoàn tất?", answer: "15 phút", note: "", type: "text" },
  { id: 15, question: "Đánh giá khả năng hợp tác lâu dài?", answer: "Khả quan", note: "Cần theo dõi thêm", type: "text" },
  { id: 16, question: "Bổ sung thông tin cá nhân?", answer: "Đã cập nhật", note: "", type: "text" },
  { id: 17, question: "Tổng kết các điểm cần cải thiện?", answer: "Trưng bày", note: "Cần cải thiện sắp xếp hàng hóa tại quầy", type: "text" },
];

// --- COMPONENT CON: HIỂN THỊ BẢN ĐỒ GIẢ LẬP (MOCK MAP) ---
const MockMapDisplay = ({ label, subLabel }: { label: string; subLabel: string }) => (
  <div className="relative w-full h-32 bg-gray-200 rounded-md flex items-center justify-center  border border-gray-300">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
    <div className="z-10 flex flex-col items-center animate-bounce">
      <div className="relative">
        <MapPin className="w-10 h-10 text-orange-600 fill-orange-100 drop-shadow-lg" />
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-700">
          N
        </span>
      </div>
      <div className="bg-white/90 px-2 py-1 rounded text-[10px] shadow-sm mt-1 text-center">
        <p className="font-bold">{label}</p>
        <p className="text-gray-500">{subLabel}</p>
      </div>
    </div>
  </div>
);

// --- COMPONENT CHÍNH ---
export default function SurveyDetailButton({ data = MOCK_STORE_DATA }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);
  const [gpsError, setGpsError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Lỗi lấy GPS:", error);
            setGpsError("Không thể lấy vị trí (Cần cấp quyền)");
          }
        );
      } else {
        setGpsError("Trình duyệt không hỗ trợ GPS");
      }
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-2 border-black hover:bg-gray-100"
          title="Xem chi tiết khảo sát"
        >
          <Eye className="h-5 w-5 text-black" />
        </Button>
      </DialogTrigger>

      {/*         Cấu trúc đảm bảo cuộn:
        1. h-[90vh] + flex flex-col: Thiết lập kích thước khung và hướng layout.
        2. overflow-hidden: Ngăn thanh cuộn trình duyệt ngoài.
      */}
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col bg-gray-50 p-0 gap-0 overflow-y-auto"> 
        
        {/* Header cố định */}
        <DialogHeader className="px-6 py-4 bg-white border-b shrink-0">
          <div className="flex flex-col gap-1 text-left">
            <DialogTitle className="text-sm font-normal text-gray-500">
              Danh sách khảo sát {">>"} <span className="font-bold text-black">{data.id}</span>
            </DialogTitle>
            <h2 className="text-lg font-bold text-gray-800">{data.name}</h2>
          </div>
        </DialogHeader>

        {/*            Body cuộn được:
           - flex-1: Chiếm toàn bộ chiều cao còn lại.
           - h-full: Quan trọng để ScrollArea biết kích thước vùng chứa.
        */}
        <ScrollArea className="flex-1 h-full w-full">
          <div className="p-6 pb-10"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* 1. Ô Thông tin cửa hàng */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase text-gray-700 flex items-center gap-2">
                    <Store className="w-4 h-4" /> Thông tin cửa hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <MockMapDisplay label="Vị trí Cửa Hàng" subLabel={data.address.slice(0, 20) + "..."} />
                  <div className="text-sm space-y-1 mt-2">
                    <p><span className="font-semibold">Địa chỉ:</span> {data.address}</p>
                    <p><span className="font-semibold">Chủ cửa hàng:</span> {data.owner}</p>
                    <p><span className="font-semibold">SĐT:</span> {data.phone}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">Trạng thái:</span>
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                        {data.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Thông tin người khảo sát (GPS) */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" /> Thông tin người khảo sát
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <MockMapDisplay 
                    label="Vị trí của bạn" 
                    subLabel={userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.long.toFixed(4)}` : "Đang lấy..."} 
                  />
                  
                  <div className="text-sm space-y-1 mt-2">
                    <div className="flex items-center gap-2">
                       <span className="font-semibold">GPS Hiện tại:</span>
                       {userLocation ? (
                         <span className="text-blue-600 font-mono flex items-center gap-1">
                           <CheckCircle2 className="w-3 h-3" /> 
                           {userLocation.lat.toFixed(6)}, {userLocation.long.toFixed(6)}
                         </span>
                       ) : gpsError ? (
                         <span className="text-red-500 flex items-center gap-1">
                           <AlertCircle className="w-3 h-3" /> {gpsError}
                         </span>
                       ) : (
                         <span className="text-gray-400 italic">Đang định vị...</span>
                       )}
                    </div>
                    <p><span className="font-semibold">Nhân viên:</span> Nguyễn Văn A (User Login)</p>
                    <p><span className="font-semibold">Thời gian check-in:</span> {new Date().toLocaleString('vi-VN')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3. Câu hỏi khảo sát */}
            <Card className="shadow-sm border-gray-200 min-h-[300px]">
               <CardHeader className="border-b bg-gray-50/50 py-3">
                  <CardTitle className="text-sm font-bold uppercase text-gray-700">
                    Câu hỏi khảo sát
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {MOCK_SURVEY_QUESTIONS.map((q, index) => (
                    <div key={q.id}>
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/3">
                            <span className="text-xs font-bold text-gray-500 uppercase">Câu hỏi {index + 1}</span>
                            <p className="font-medium text-gray-900 mt-1">{q.question}</p>
                          </div>
                          <div className="md:w-1/3">
                            <span className="text-xs font-bold text-gray-500 uppercase">Trả lời</span>
                            {q.type === 'image' ? (
                               <div className="mt-1 h-20 w-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 border border-dashed border-gray-400">
                                 [Hình ảnh]
                               </div>
                            ) : (
                               <p className="text-gray-800 mt-1 p-2 bg-gray-100 rounded border border-gray-200">
                                 {q.answer}
                               </p>
                            )}
                          </div>
                          <div className="md:w-1/3">
                             <span className="text-xs font-bold text-gray-500 uppercase">Ghi chú / Output</span>
                             {q.note ? (
                               <p className="text-sm text-gray-600 mt-1 italic border-l-2 border-orange-400 pl-2">
                                 {q.note}
                               </p>
                             ) : (
                               <p className="text-sm text-gray-400 mt-1 italic">Không có ghi chú</p>
                             )}
                          </div>
                        </div>
                      </div>
                      {index < MOCK_SURVEY_QUESTIONS.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}