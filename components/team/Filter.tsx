"use client";

import React, { useEffect, useMemo, useState } from "react";
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

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Giả sử đường dẫn import slice này đúng với dự án của bạn
import { fetchUsers } from "@/features/users/user.slice"; 

export default function TeamFilterBar() {
  const dispatch = useAppDispatch();

  // SỬA 1: Trỏ đúng vào state.users và lấy 'list'
  const { list: users = [], isLoading } = useAppSelector((state: any) => state.users || {});

  const [filters, setFilters] = useState({
    employeeId: "",
    name: "",
    role: "",
    address: "",
  });

  // SỬA 2: Truyền đúng tham số payload để lấy được dữ liệu
  // Lưu ý: Để dropdown có đủ dữ liệu lọc, ta nên lấy pageSize lớn ở đây hoặc cần 1 API riêng lấy meta data.
  // Tạm thời để pageSize 100 để lấy dữ liệu mẫu.
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, pageSize: 100, keyword: "" }));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers({ page: 1, pageSize: 100, keyword: "" }));
  };

  // --- XỬ LÝ DỮ LIỆU CHO CÁC Ô SELECT ---

  // SỬA 3: Map dữ liệu Role (xử lý cả trường hợp 'position' và map tên tiếng Việt)
  const roleOptions = useMemo((): { value: string; label: string }[] => {
    if (!users || users.length === 0) return [];
    
    const uniqueRoles = new Set<string>();
    
    users.forEach((u: any) => {
      // Lấy role hoặc position
      const r = u.role || u.position;
      if (r) uniqueRoles.add(r.toLowerCase());
    });

    // Hàm map tên hiển thị giống bên Table
    const getDisplayRole = (r: string) => {
      switch (r) {
        case 'admin': return 'Admin';
        case 'manager': return 'Chuyên viên khảo sát';
        case 'sales': return 'Nhân viên kinh doanh';
        default: return r.charAt(0).toUpperCase() + r.slice(1);
      }
    };

    return Array.from(uniqueRoles).map(r => ({
      value: r,
      label: getDisplayRole(r)
    }));
  }, [users]);

  // SỬA 4: Map dữ liệu Khu vực (xử lý cả trường hợp 'address' và 'region')
  const regionOptions = useMemo((): string[] => {
    if (!users || users.length === 0) return [];
    
    const uniqueRegions = new Set<string>();

    users.forEach((u: any) => {
      // Ưu tiên lấy region, nếu không có thì xử lý address
      let regionName = u.region;

      if (!regionName && u.address) {
        const parts = u.address.split(',');
        regionName = parts[parts.length - 1].trim();
      }

      if (regionName) {
        uniqueRegions.add(regionName);
      }
    });

    return Array.from(uniqueRegions);
  }, [users]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => {
    console.log("Filtering with:", filters);
    dispatch(fetchUsers({ page: 1, pageSize: 50, keyword: filters.name, ... filters }));
  };

  const handleClearFilter = () => {
    setFilters({ employeeId: "", name: "", role: "", address: "" });
    // Reset lại list user ban đầu
    handleRefresh();
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
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 4. Khu vực */}
          <Select
            value={filters.address}
            onValueChange={(val) => handleFilterChange("address", val)}
          >
            <SelectTrigger className="bg-gray-200 border-transparent focus:ring-offset-0 text-gray-500 h-8 text-xs w-full px-3">
              <SelectValue placeholder="Khu vực" />
            </SelectTrigger>
            <SelectContent>
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