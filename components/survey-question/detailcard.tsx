"use client";

import { useState } from "react"; // 1. Import useState
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SurveyDetailCard() {
  // 2. Khởi tạo state để lưu giá trị đang chọn. Mặc định là 'option-1' (Rất hài lòng)
  const [selectedValue, setSelectedValue] = useState("option-1");

  return (
    <div className="w-full max-w-[96%] mx-auto space-y-2">
      {/* Tiêu đề */}
      <h2 className="text-sm font-semibold text-gray-700 ml-1">Bộ câu hỏi chính</h2>

      {/* Card chính */}
      <Card className="border-2 border-blue-500 bg-slate-50/50 shadow-sm">
        
        {/* Header */}
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pt-3 pb-2 px-6">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-black">Bộ câu hỏi 1</h3>
            <div className="text-[11px] text-gray-500 flex gap-3">
              <span>Sửa gần nhất: 12h59p</span>
              <span>•</span>
              <span>Bởi: Nguyễn Văn A</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 -mt-1 -mr-2">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        
        <Separator className="mb-4 bg-gray-300" />

        {/* Content */}
        <CardContent className="pb-4 px-6">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded">
                Câu hỏi trắc nghiệm
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Bắt buộc</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-sm font-semibold text-gray-800 leading-snug">
                  Câu 1: Bạn cảm thấy hài lòng như thế nào về dịch vụ chăm sóc khách hàng của chúng tôi?
                </Label>
                <Input value="Hidden value" readOnly className="hidden" />
              </div>

              {/* 3. Truyền state vào RadioGroup để điều khiển việc chọn */}
              <RadioGroup 
                value={selectedValue} 
                onValueChange={setSelectedValue} 
                className="mt-3 space-y-2"
              >
                {/* Option 1: Rất hài lòng */}
                <div 
                  className={`flex items-center space-x-3 rounded border py-2 px-3 cursor-pointer transition-all duration-200
                    ${selectedValue === "option-1" 
                      ? "border-blue-500 bg-blue-50" // Style khi ĐƯỢC chọn
                      : "border-gray-100 hover:bg-gray-50" // Style khi KHÔNG chọn
                    }`}
                  onClick={() => setSelectedValue("option-1")} // Click vào khung cũng chọn luôn
                >
                  <RadioGroupItem value="option-1" id="option-1" className="h-4 w-4 text-blue-600 border-blue-600" />
                  <Label htmlFor="option-1" className="font-normal cursor-pointer w-full text-sm">
                    Rất hài lòng
                  </Label>
                </div>

                {/* Option 2: Hài lòng */}
                <div 
                  className={`flex items-center space-x-3 rounded border py-2 px-3 cursor-pointer transition-all duration-200
                    ${selectedValue === "option-2" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-100 hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedValue("option-2")}
                >
                  <RadioGroupItem value="option-2" id="option-2" className="h-4 w-4 text-blue-600 border-blue-600" />
                  <Label htmlFor="option-2" className="font-normal cursor-pointer w-full text-sm">
                    Hài lòng
                  </Label>
                </div>

                {/* Option 3: Bình thường */}
                <div 
                  className={`flex items-center space-x-3 rounded border py-2 px-3 cursor-pointer transition-all duration-200
                    ${selectedValue === "option-3" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-100 hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedValue("option-3")}
                >
                  <RadioGroupItem value="option-3" id="option-3" className="h-4 w-4 text-blue-600 border-blue-600" />
                  <Label htmlFor="option-3" className="font-normal cursor-pointer w-full text-sm">
                    Bình thường
                  </Label>
                </div>

                {/* Option 4: Không hài lòng */}
                <div 
                  className={`flex items-center space-x-3 rounded border py-2 px-3 cursor-pointer transition-all duration-200
                    ${selectedValue === "option-4" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-100 hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedValue("option-4")}
                >
                  <RadioGroupItem value="option-4" id="option-4" className="h-4 w-4 text-blue-600 border-blue-600" />
                  <Label htmlFor="option-4" className="font-normal cursor-pointer w-full text-sm">
                    Không hài lòng
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}