"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Save, MapPin, Users, Clock, UserCircle, CheckCircle2 } from "lucide-react"

export function EmployeeDetailDialog() {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* 
         CẬP NHẬT Ở ĐÂY:
         - Thay bg-slate-50/50 thành bg-white
         - Thêm text-black
      */}
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0 bg-white text-black overflow-hidden">
        
        {/* Header: Fixed at top */}
        <div className="flex flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 z-10">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-slate-900">Chi tiết nhân viên</h2>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>Đội ngũ</span> <span>/</span> <span className="font-medium text-blue-600">NV-2024-001</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm gap-2 px-6">
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </Button>
        </div>

        {/* Body: Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-6xl mx-auto flex flex-col gap-8">
            
            {/* SECTION 1: INFO CARD */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500">Thông tin cá nhân</h3>
              
              {/* Card vẫn giữ bg-white, border và shadow để tách biệt nhẹ */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                 <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-500">Họ và tên</Label>
                    <Input defaultValue="Nguyễn Văn A" className="font-medium border-slate-200 focus-visible:ring-blue-500" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-500">Chức vụ</Label>
                    <Input defaultValue="Nhân viên kinh doanh" className="border-slate-200" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-500">Số điện thoại</Label>
                    <Input defaultValue="0909 123 456" className="border-slate-200" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-500">Email</Label>
                    <Input defaultValue="nguyenvana@company.com" className="border-slate-200" />
                 </div>
                 <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label className="text-xs font-semibold text-slate-500">Ghi chú</Label>
                    <textarea 
                        defaultValue="Nhân viên phụ trách khu vực Quận 1, Quận 3"
                        className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                 </div>
              </div>
            </div>

            {/* SECTION 2: TASKS */}
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between">
                 <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500">Nhiệm vụ khảo sát</h3>
                 <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                    Tiến độ: 23/50
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pb-10">
                <TaskItem 
                  title="Cửa hàng ABC"
                  address="12 Nguyễn Huệ, Q1, HCM"
                  group="Nhóm 1"
                  area="Khu vực trung tâm"
                  status="PENDING"
                  manager="Trần Thị B"
                  startTime=""
                  endTime=""
                />
                 <TaskItem 
                  title="Đại lý XYZ"
                  address="45 Lê Lợi, Q1, HCM"
                  group="Nhóm 2"
                  area="Khu vực trung tâm"
                  status="PROCESSING"
                  manager="Lê Văn C"
                  startTime="08:00"
                  endTime=""
                />
                 <TaskItem 
                  title="Siêu thị Mini Mart"
                  address="100 Võ Văn Kiệt, Q1, HCM"
                  group="Nhóm 3"
                  area="Khu vực bờ sông"
                  status="PENDING"
                  manager="Nguyễn Văn D"
                  startTime=""
                  endTime=""
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TaskItem({ title, address, group, area, status, manager, startTime, endTime }: any) {
  const isProcessing = status === "PROCESSING";
  const statusText = isProcessing ? "Đang khảo sát" : "Chưa khảo sát";
  const statusColor = isProcessing 
    ? "bg-amber-50 text-amber-700 border-amber-200" 
    : "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col md:flex-row items-start gap-4">
      
      {/* Cột Thông tin chính */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Tên và Trạng thái */}
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-base font-bold text-slate-900">{title}</span>
            <span className={`text-[11px] px-3 py-1 rounded-full border font-medium ${statusColor}`}>
                {statusText}
            </span>
        </div>
        
        {/* Địa chỉ */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
             <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> 
             <span className="truncate">{address}</span>
        </div>

        {/* --- KHU VỰC TAGS (Nhóm & Quản lý) --- */}
        <div className="flex items-center gap-3 flex-wrap mt-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-1.5 rounded-md border border-slate-100 w-fit">
                <Users className="w-3 h-3" /> 
                {group}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-1.5 rounded-md border border-slate-100 w-fit">
                <UserCircle className="w-3 h-3" /> 
                QL: {manager}
            </div>
        </div>
      </div>

      {/* Cột Thời gian (Time Block) */}
      <div className="w-full md:w-auto min-w-[220px] bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex flex-col gap-2 mt-0">
         <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 min-w-[70px]">
                <Clock className="w-3.5 h-3.5" /> Bắt đầu
            </span>
            <Input 
                type="time" 
                defaultValue={startTime}
                className="h-7 w-28 text-xs bg-white border-slate-200 focus-visible:ring-0 focus:border-blue-400 px-2" 
            />
         </div>
         <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 min-w-[70px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Kết thúc
            </span>
            <Input 
                type="time" 
                defaultValue={endTime}
                className="h-7 w-28 text-xs bg-white border-slate-200 focus-visible:ring-0 focus:border-blue-400 px-2" 
            />
         </div>
      </div>
    </div>
  )
}