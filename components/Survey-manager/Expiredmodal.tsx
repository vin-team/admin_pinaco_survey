import React from "react";
import { Store, CalendarX, Ban, AlertCircle } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExpiredSurveyModal({ item }: { item: any }) {
  return (
    <DialogContent className="max-w-2xl h-auto bg-white p-0 gap-0 overflow-hidden flex flex-col focus:outline-none">
      
      {/* 1. HEADER */}
      <DialogHeader className="px-6 py-4 bg-gray-50 border-b shrink-0">
        <div className="flex flex-col gap-1 text-left">
          <DialogTitle className="text-sm font-normal text-gray-500">
            Danh sách khảo sát {">>"} <span className="font-bold text-black">{item.id || "N/A"}</span>
          </DialogTitle>
          <h2 className="text-lg font-bold text-gray-800">{item.name || "Thông tin cửa hàng"}</h2>
        </div>
      </DialogHeader>

      {/* 2. BODY */}
      <div className="p-6 space-y-6">
        
        {/* Khối Cảnh báo trung tâm */}
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-100 rounded-lg text-center gap-3">
            <div className="p-3 bg-red-100 rounded-full">
                <CalendarX className="w-10 h-10 text-red-600" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-red-700 uppercase">Đã quá hạn khảo sát</h3>
                <p className="text-red-600/80 text-sm mt-1">
                    Phiếu khảo sát này đã hết thời gian hiệu lực. Bạn không thể thực hiện check-in hay cập nhật dữ liệu.
                </p>
            </div>
        </div>

        {/* Thông tin cửa hàng (Read-only) */}
        <Card className="shadow-none border-gray-200 opacity-70 bg-gray-50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-gray-500 flex items-center gap-2">
                    <Store className="w-4 h-4" /> Thông tin điểm bán
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="block text-gray-400 text-xs uppercase">Địa chỉ</span>
                    <span className="font-medium text-gray-700">{item.attr3 || "Chưa cập nhật"}</span>
                </div>
                <div>
                    <span className="block text-gray-400 text-xs uppercase">Trạng thái</span>
                    <Badge variant="destructive" className="mt-1 bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                        Quá hạn
                    </Badge>
                </div>
            </CardContent>
        </Card>

      </div>

      {/* 3. FOOTER */}
      <DialogFooter className="px-6 py-4 bg-gray-50 border-t sm:justify-between flex items-center">
         <div className="flex items-center gap-2 text-xs text-gray-500">
            <Ban className="w-3 h-3" />
            <span>Hệ thống đã khoá quyền chỉnh sửa</span>
         </div>
         <DialogClose asChild>
            <Button variant="outline" className="border-gray-300">Đóng</Button>
         </DialogClose>
      </DialogFooter>

    </DialogContent>
  );
}