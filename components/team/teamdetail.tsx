"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Eye, Save, MapPin, Users, PenLine, Clock } from "lucide-react"

export function EmployeeDetailDialog() {
  return (
    <Dialog>
      {/* Nút Trigger: Icon con mắt */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Nội dung Popup */}
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0 bg-white">
        
        {/* Header mô phỏng thanh điều hướng và nút Lưu */}
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b">
            <div className="text-sm font-medium text-gray-500">
              Đội ngũ <span className="mx-1">&gt;&gt;</span> <span className="text-black font-bold">NV-2024-001</span>
            </div>
            <Button className="bg-gray-200 hover:bg-gray-300 text-black border border-gray-300 shadow-sm gap-2">
              <Save className="w-4 h-4" />
              Lưu thông tin
            </Button>
        </div>

        <ScrollArea className="flex-1 px-6 py-6 bg-gray-50/50">
          <div className="flex flex-col gap-8">
            
            {/* PHẦN 1: THÔNG TIN NHÂN VIÊN */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-gray-900">Thông tin nhân viên</h3>
              {/* Khu vực xám trong ảnh - giả lập form thông tin */}
              <div className="bg-gray-200/60 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="space-y-2">
                    <Label className="text-gray-600">Họ và tên</Label>
                    <Input defaultValue="Nguyễn Văn A" className="bg-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-gray-600">Chức vụ</Label>
                    <Input defaultValue="Nhân viên kinh doanh" className="bg-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-gray-600">Số điện thoại</Label>
                    <Input defaultValue="0909 123 456" className="bg-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-gray-600">Email</Label>
                    <Input defaultValue="nguyenvana@company.com" className="bg-white" />
                 </div>
                 <div className="col-span-full space-y-2">
                    <Label className="text-gray-600">Ghi chú</Label>
                    <Input defaultValue="Nhân viên phụ trách khu vực Quận 1, Quận 3" className="bg-white" />
                 </div>
              </div>
            </div>

            {/* PHẦN 2: NHIỆM VỤ KHẢO SÁT */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                 <h3 className="text-base font-semibold text-gray-900">Nhiệm vụ khảo sát</h3>
                 <span className="text-sm font-medium text-gray-600">23/50 đã hoàn thành</span>
              </div>

              {/* Danh sách nhiệm vụ (Task List) */}
              <div className="flex flex-col gap-3">
                
                {/* Item 1 (Giống trong ảnh mẫu) */}
                <TaskItem 
                  title="Cửa hàng ABC"
                  address="12 Nguyễn Huệ, Q1, HCM"
                  group="Nhóm 1"
                  area="Khu vực trung tâm"
                  status="Chưa khảo sát"
                  manager="Trần Thị B"
                  startTime=""
                  endTime=""
                />

                {/* Item 2 (Ví dụ thêm) */}
                 <TaskItem 
                  title="Đại lý XYZ"
                  address="45 Lê Lợi, Q1, HCM"
                  group="Nhóm 2"
                  area="Khu vực trung tâm"
                  status="Đang khảo sát"
                  manager="Lê Văn C"
                  startTime="08:00"
                  endTime=""
                />

              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

// Component con để render từng dòng nhiệm vụ cho gọn code
function TaskItem({ title, address, group, area, status, manager, startTime, endTime }: any) {
  return (
    <div className="bg-gray-200/50 hover:bg-gray-200/80 transition-colors p-4 rounded-md grid grid-cols-1 lg:grid-cols-12 gap-4 items-center border border-gray-200">
      
      {/* Cột 1: Thông tin địa điểm (Chiếm 5 phần) */}
      <div className="lg:col-span-5 flex flex-col gap-1">
        <span className="font-bold text-gray-900">{title}</span>
        <div className="flex items-center gap-2 text-xs text-gray-600">
           <MapPin className="w-3 h-3" /> 
           {address}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
           <Users className="w-3 h-3" /> 
           Nhóm đối tượng: {group}
        </div>
        <span className="text-xs text-gray-600">Tên chủ khu vực: {area}</span>
      </div>

      {/* Cột 2: Trạng thái & Quản lý (Chiếm 4 phần) */}
      <div className="lg:col-span-4 flex flex-col gap-1 border-l border-gray-300 pl-0 lg:pl-4">
        <div className="text-sm text-gray-700">
            Trạng thái: <span className="font-medium">{status}</span>
        </div>
        <div className="text-sm text-gray-600">
            Người quản lý khu vực: {manager}
        </div>
      </div>

      {/* Cột 3: Thời gian & Action (Chiếm 3 phần) */}
      <div className="lg:col-span-3 flex flex-col gap-2 border-l border-gray-300 pl-0 lg:pl-4">
         <div className="grid grid-cols-[max-content_1fr] items-center gap-2">
            <span className="text-xs text-gray-500 whitespace-nowrap">TG bắt đầu</span>
            <div className="relative">
                <Input 
                    type="time" 
                    defaultValue={startTime}
                    className="h-8 bg-white text-xs" 
                />
            </div>
         </div>
         <div className="grid grid-cols-[max-content_1fr] items-center gap-2">
            <span className="text-xs text-gray-500 whitespace-nowrap">TG kết thúc</span>
            <div className="relative flex flex-row gap-2 w-full">
                <Input 
                    type="time" 
                    defaultValue={endTime}
                    className="h-8 bg-white text-xs w-full" 
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 hover:bg-gray-300">
                    <PenLine className="w-4 h-4 text-gray-500" />
                </Button>
            </div>
         </div>
      </div>
    </div>
  )
}