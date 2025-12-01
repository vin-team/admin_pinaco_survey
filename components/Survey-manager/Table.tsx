"use client"

import React, { useState, useEffect } from "react"
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MapPin,
  Store,
  User,
  CheckCircle2,
} from "lucide-react"

// Shadcn UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // Đã xóa DialogDescription
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import SupportRequestModal from "./supportrequest"
import ExpiredSurveyModal from "./expired"

// --- TYPE DEFINITIONS ---
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

// --- DATA MẪU ---
const data: SurveyItem[] = [
  {
    id: "1",
    name: "Tạp hóa Minh Anh",
    attr1: "Kênh GT",
    attr2: "HCM",
    attr3: "Số 2 đường 1B, P. An Lạc...",
    profile: "Profile A",
    image: "5 hình ảnh",
    status: "Đã khảo sát",
  },
  {
    id: "2",
    name: "Siêu thị Mini B",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "Nan",
    status: "Chưa khảo sát",
  },
  {
    id: "3",
    name: "Cửa hàng C",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "",
    status: "Yêu cầu hỗ trợ",
  },
  {
    id: "4",
    name: "Đại lý D",
    attr1: "",
    attr2: "",
    attr3: "",
    profile: "",
    image: "",
    status: "Quá hạn khảo sát",
  },
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

// --- COMPONENT HỖ TRỢ: MOCK MAP ---
const MockMapDisplay = ({ label, subLabel }: { label: string; subLabel: string }) => (
  <div className="relative w-full h-32 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden border border-gray-300">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
    <div className="z-10 flex flex-col items-center animate-bounce">
      <div className="relative">
        <MapPin className="w-10 h-10 text-orange-600 fill-orange-100 drop-shadow-lg" />
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-700">N</span>
      </div>
      <div className="bg-white/90 px-2 py-1 rounded text-[10px] shadow-sm mt-1 text-center">
        <p className="font-bold">{label}</p>
        <p className="text-gray-500">{subLabel}</p>
      </div>
    </div>
  </div>
);

// --- COMPONENT POPUP 1: DÀNH CHO "ĐÃ KHẢO SÁT" (FULL TÍNH NĂNG) ---
const SurveyedModal = ({ item }: { item: SurveyItem }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);

  // Mock lấy GPS khi mở modal
  useEffect(() => {
    // Giả lập lấy toạ độ sau 1 giây
    const timer = setTimeout(() => {
      setUserLocation({ lat: 10.762622, long: 106.660172 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DialogContent className="max-w-5xl h-[90vh] flex flex-col bg-gray-50 p-0 gap-0 overflow-y-auto">
      {/* Header */}
      <DialogHeader className="px-6 py-4 bg-white border-b">
        <div className="flex flex-col gap-1 text-left">
          <DialogTitle className="text-sm font-normal text-gray-500">
            Danh sách khảo sát {">>"} <span className="font-bold text-black">{item.id}</span>
          </DialogTitle>
          <h2 className="text-lg font-bold text-gray-800">{item.name || "Cửa hàng chưa đặt tên"}</h2>
        </div>
      </DialogHeader>

      {/* Body */}
      <ScrollArea className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 1. Thông tin cửa hàng */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase flex gap-2"><Store className="w-4 h-4" /> Thông tin cửa hàng</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <MockMapDisplay label="Vị trí Cửa Hàng" subLabel={item.attr3 || "Chưa cập nhật địa chỉ"} />
              <div className="text-sm space-y-1 mt-2">
                <p><span className="font-semibold">Địa chỉ:</span> {item.attr3 || "N/A"}</p>
                <p><span className="font-semibold">Trạng thái:</span> <Badge className="bg-green-600">{item.status}</Badge></p>
              </div>
            </CardContent>
          </Card>

          {/* 2. Thông tin GPS */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase flex gap-2"><User className="w-4 h-4" /> GPS Người khảo sát</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <MockMapDisplay label="Vị trí của bạn" subLabel={userLocation ? "10.7626, 106.6601" : "Đang định vị..."} />
              <div className="text-sm space-y-1 mt-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">GPS:</span>
                  {userLocation ? <span className="text-blue-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 10.762622, 106.660172</span> : "Loading..."}
                </div>
                <p><span className="font-semibold">Thời gian:</span> {new Date().toLocaleString('vi-VN')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Câu hỏi khảo sát */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b bg-gray-50/50 py-3"><CardTitle className="text-sm font-bold uppercase">Kết quả khảo sát</CardTitle></CardHeader>
          <CardContent className="p-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border-b last:border-0">
                <div className="flex gap-4">
                  <div className="w-1/3"><p className="text-sm font-bold text-gray-500">CÂU HỎI {i}</p><p>Nội dung câu hỏi demo {i}?</p></div>
                  <div className="w-1/3"><p className="text-sm font-bold text-gray-500">TRẢ LỜI</p><p className="bg-gray-100 p-2 rounded border">Câu trả lời mẫu</p></div>
                  <div className="w-1/3"><p className="text-sm font-bold text-gray-500">GHI CHÚ</p><p className="italic text-gray-400">Không có ghi chú</p></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </ScrollArea>
    </DialogContent>
  )
}

// Đã xóa Component OtherStatusModal vì không được sử dụng trong renderModalContent

// --- MAIN TABLE COMPONENT ---
export default function SurveyTable() {

  // Hàm render popup dựa trên trạng thái
  const renderModalContent = (item: SurveyItem) => {
    switch (item.status) {
      case "Đã khảo sát":
        return <SurveyedModal item={item} />;
      case "Chưa khảo sát":
        // Hiện tại bạn đang dùng SupportRequestModal cho case này, nên NotSurveyedModal thừa
        return <SupportRequestModal item={item} />;
      case "Yêu cầu hỗ trợ":
       return <SupportRequestModal item={item} />;
      case "Quá hạn khảo sát":
          return <ExpiredSurveyModal item={item} />;
      default:
        return null; // Trường hợp dòng trống hoặc không xác định
    }
  };

  return (
    <div className="w-full border rounded-md bg-white shadow-sm flex flex-col min-h-[600px]">
      {/* --- PHẦN TABLE --- */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-gray-200/80 sticky top-0 z-10">
            <TableRow className="hover:bg-gray-200/80 border-b-gray-300">
              <TableHead className="w-[60px] text-center"></TableHead>
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

                {/* CỘT ACTION: NÚT MẮT + POPUP */}
                <TableCell className="p-2 text-center">
                  {item.status ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-200 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4 text-black" />
                        </div>
                      </DialogTrigger>
                      {/* Gọi hàm render nội dung popup tương ứng */}
                      {renderModalContent(item)}
                    </Dialog>
                  ) : (
                    // Hiển thị icon mờ cho dòng trống
                    <div className="w-8 h-6 flex items-center justify-center mx-auto opacity-20">
                      <Eye className="w-4 h-4" />
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-xs font-medium">{item.name}</TableCell>
                <TableCell className="text-xs">{item.attr1}</TableCell>
                <TableCell className="text-xs">{item.attr2}</TableCell>
                <TableCell className="text-xs text-gray-600">{item.attr3}</TableCell>
                <TableCell className="text-xs">{item.profile}</TableCell>
                <TableCell className="text-xs text-gray-600">{item.image}</TableCell>

                {/* Trạng thái */}
                <TableCell className="text-xs text-right">
                  {item.status && (
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold
                      ${item.status === 'Đã khảo sát' ? 'bg-green-100 text-green-700' : ''}
                      ${item.status === 'Chưa khảo sát' ? 'bg-gray-100 text-gray-600' : ''}
                      ${item.status === 'Yêu cầu hỗ trợ' ? 'bg-orange-100 text-orange-700' : ''}
                      ${item.status === 'Quá hạn khảo sát' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {item.status}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- FOOTER (PAGINATION) - GIỮ NGUYÊN --- */}
      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between text-xs font-medium text-gray-700 mt-auto">
        <div className="flex items-center gap-2">
          <span>số dòng mỗi trang : 50</span>
        </div>
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