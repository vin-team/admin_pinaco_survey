"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { vi } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SurveyFilter() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  // --- CẤU HÌNH KÍCH THƯỚC CHUẨN ---
  const fixedSizeClass = "w-[160px] h-[44px] bg-gray-200 border-transparent font-bold text-black/80 shadow-none text-sm"

  return (
    // THAY ĐỔI: Thêm "-mt-4" (hoặc -mt-6) để kéo toàn bộ khung lên trên, đè lên khoảng trắng của cha
    <div className="w-full px-4 pb-4 pt-0 -mt-4 bg-white">
      
      {/* Tiêu đề */}
      <h3 className="text-sm font-medium text-gray-700 mb-2">Danh sách khảo sát</h3>

      {/* Container chính: Flex row */}
      <div className="flex flex-col xl:flex-row gap-4 items-end">
        
        {/* --- PHẦN 1: CÁC INPUT LỌC --- */}
        <div className="flex flex-wrap items-end gap-[23px] flex-1">
          
          {/* 1. Mã điểm bán */}
          <div>
            <Input 
              type="text" 
              placeholder="Mã điểm bán..." 
              className={`${fixedSizeClass} placeholder:text-black/60`}
            />
          </div>

          {/* 2. Khu vực */}
          <div>
            <Select>
              <SelectTrigger className={fixedSizeClass}>
                <SelectValue placeholder="Khu vực" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hn">Hà Nội</SelectItem>
                <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 3. Vùng miền */}
          <div>
            <Select>
              <SelectTrigger className={fixedSizeClass}>
                <SelectValue placeholder="Vùng miền" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bac">Miền Bắc</SelectItem>
                <SelectItem value="trung">Miền Trung</SelectItem>
                <SelectItem value="nam">Miền Nam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 4. Hạn khảo sát */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    fixedSizeClass,
                    "justify-start text-left px-3 font-bold",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "dd/MM/y")}...
                        </>
                      ) : (
                        format(date.from, "dd/MM/y")
                      )
                    ) : (
                      <span>Hạn khảo sát</span>
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={vi}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 5. Trạng thái */}
          <div>
            <Select>
              <SelectTrigger className={fixedSizeClass}>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moi">Mới</SelectItem>
                <SelectItem value="dang-khao-sat">Đang khảo sát</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        </div>

        {/* --- PHẦN 2: CÁC NÚT CHỨC NĂNG --- */}
        <div className="flex flex-col gap-2 min-w-[180px] shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-gray-300 hover:bg-gray-400 text-black font-bold h-9 text-xs shadow-none">
              Import
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400 text-black font-bold h-9 text-xs shadow-none">
              Export
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button className="rounded-full bg-gray-200 hover:bg-gray-300 text-black font-medium h-8 text-xs shadow-none">
              Lọc
            </Button>
            <Button className="rounded-full bg-gray-200 hover:bg-gray-300 text-black font-medium h-8 text-xs shadow-none">
              Xóa
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}