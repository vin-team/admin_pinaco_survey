"use client";

import React, { useEffect, useMemo, useState } from "react";
// Đã xóa 'use' khỏi dòng import trên
import { RefreshCcw } from "lucide-react"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- REDUX IMPORTS ---
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { fetchUsers } from "@/features/team/team.slice"; 
// ---------------------

export default function TeamFilterBar() {
  const dispatch = useAppDispatch();
  
  // SỬA LỖI 1: Truy cập đúng slice 'team' thay vì 'users'.
  // Cấu trúc slice của bạn là { team: any, requestState: ... }
  // Dùng (state: any) để tránh lỗi TypeScript nếu bạn chưa khai báo 'team' trong RootState
 const { team: users = [], requestState } = useAppSelector((state: any) => state.team || {});
  
  // Tính toán isLoading dựa trên requestState
  const isLoading = requestState?.status === 'loading';

  const [filters, setFilters] = useState({
    employeeId: "",
    name: "",      
    role: "",      
    region: "",    
  });

  useEffect(() => {
    // SỬA LỖI 2: Thêm undefined vào hàm dispatch vì thunk yêu cầu tham số đầu vào
    dispatch(fetchUsers(undefined));
  }, [dispatch]);

  const handleRefresh = () => {
    // SỬA LỖI 2: Thêm undefined tương tự
    dispatch(fetchUsers(undefined));
  };

  // --- XỬ LÝ DỮ LIỆU CHO CÁC Ô SELECT ---

  // SỬA LỖI 3: Ép kiểu trả về là string[] để hàm map bên dưới không bị lỗi
  const roleOptions = useMemo((): string[] => {
    if (!users) return [];
    const roles = users.map((u: any) => u.role).filter(Boolean);
    return Array.from(new Set(roles)) as string[]; 
  }, [users]);

  // SỬA LỖI 3: Ép kiểu trả về là string[]
  const regionOptions = useMemo((): string[] => {
    if (!users) return [];
    const regions = users.map((u: any) => {
      if (!u.address) return null;
      const parts = u.address.split(',');
      return parts[parts.length - 1].trim();
    }).filter(Boolean); 
    
    return Array.from(new Set(regions)) as string[];
  }, [users]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => {
    console.log("Filtering with:", filters);
  };

  const handleClearFilter = () => {
    setFilters({ employeeId: "", name: "", role: "", region: "" });
  };

  return (
    <div className="w-full px-4 pb-4 pt-0 bg-white">
      
      {/* Header + Nút Refresh */}
      <div className="flex items-center justify-between mb-2 ml-3">
        <h3 className="text-sm font-medium text-gray-700">Đội ngũ</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh} 
          className="h-6 w-6 p-0 hover:bg-gray-100 mr-2"
          title="Tải lại dữ liệu"
        >
          <RefreshCcw className={`h-4 w-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="flex w-full items-center gap-2 px-2">
        
        <div className="grid grid-cols-4 gap-2 flex-1">
          {/* 1. Mã nhân viên */}
          <Input
            type="text"
            placeholder="Mã nhân viên"
            value={filters.employeeId}
            onChange={(e) => handleFilterChange("employeeId", e.target.value)}
            className="bg-gray-200 border-transparent focus-visible:ring-offset-0 placeholder:text-gray-500 h-8 text-xs w-full"
          />

          {/* 2. Tên nhân viên */}
          <Input
            type="text"
            placeholder="Họ và tên"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            className="bg-gray-200 border-transparent focus-visible:ring-offset-0 placeholder:text-gray-500 h-8 text-xs w-full"
          />

          {/* 3. Chức vụ */}
          <Select 
            value={filters.role} 
            onValueChange={(val) => handleFilterChange("role", val)}
          >
            <SelectTrigger className="bg-gray-200 border-transparent focus:ring-offset-0 text-gray-500 h-8 text-xs w-full px-3">
              <SelectValue placeholder="Chức vụ" />
            </SelectTrigger>
            <SelectContent>
              {/* Giờ đây role đã được hiểu là string nhờ sửa lỗi 3 */}
              {roleOptions.map((role, index) => (
                <SelectItem key={index} value={role} className="text-xs">
                  {role} 
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 4. Khu vực */}
          <Select
            value={filters.region}
            onValueChange={(val) => handleFilterChange("region", val)}
          >
            <SelectTrigger className="bg-gray-200 border-transparent focus:ring-offset-0 text-gray-500 h-8 text-xs w-full px-3">
              <SelectValue placeholder="Khu vực" />
            </SelectTrigger>
            <SelectContent>
              {/* Giờ đây area đã được hiểu là string nhờ sửa lỗi 3 */}
              {regionOptions.map((area, index) => (
                <SelectItem key={index} value={area} className="text-xs">
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button 
            variant="secondary" 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium w-20 shadow-sm h-8 text-xs"
          >
            Import
          </Button>
          <Button 
            variant="secondary" 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium w-20 shadow-sm h-8 text-xs"
          >
            Export
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleApplyFilter}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-20 rounded-full shadow-sm h-8 text-xs"
          >
            Lọc
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleClearFilter}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-20 rounded-full shadow-sm h-8 text-xs"
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}