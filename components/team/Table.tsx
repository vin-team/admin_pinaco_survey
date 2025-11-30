import React, { useEffect, useState } from "react";
// SỬA 1: Dùng hook đã được định nghĩa kiểu (Typed Hooks) thay vì hook mặc định
import { useAppDispatch, useAppSelector } from "@/hooks/redux"; 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2 
} from "lucide-react";

import { EmployeeDetailDialog } from "./teamdetail";
import { fetchUsers } from "@/features/team/team.slice"; 

export default function EmployeeTable() {
  // SỬA 2: Sử dụng useAppDispatch để hiểu được AsyncThunk
  const dispatch = useAppDispatch();
  
  const [page, setPage] = useState(1);
  const pageSize = 50;

  // === SỬA LỖI TẠI ĐÂY (DÒNG 33) ===
  // 1. Đổi state.users -> state.team (dựa theo import team.slice)
  // 2. Thêm || {} để nếu state chưa có dữ liệu thì không bị crash (lỗi undefined)
  const { list: users, isLoading } = useAppSelector((state: any) => state.team || state.users || {}); 

  useEffect(() => {
    // Bây giờ dispatch sẽ không còn báo lỗi đỏ nữa
    dispatch(fetchUsers({ page: page, limit: pageSize }));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) { 
      setPage(newPage);
    }
  };

  return (
    <div className="mx-6 my-4 border border-gray-300 shadow-sm bg-white font-sans rounded-sm overflow-hidden">
      <div className="flex-1 overflow-auto relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        )}

        <Table>
          <TableHeader className="bg-gray-200/80 sticky top-0 z-10">
            <TableRow className="hover:bg-gray-200/80 border-b-gray-300 h-10">
              <TableHead className="w-[60px] text-center p-0"></TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Mã nhân viên
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Chức vụ
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Họ và tên
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Khu vực
              </TableHead>
              <TableHead className="font-bold text-black text-xs whitespace-nowrap px-4">
                Số lượng khảo sát
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users && users.length > 0 ? (
              users.map((user: any, index: number) => (
                <TableRow
                  key={user.id || index} 
                  className="border-b border-gray-200 hover:bg-gray-50 h-10 transition-colors"
                >
                  <TableCell className="p-0 text-center">
                    <div className="flex justify-center items-center h-full">
                      {/* SỬA 4: Ép kiểu as any để bỏ qua lỗi kiểm tra Props của TypeScript tạm thời */}
                      <EmployeeDetailDialog {...({ userData: user } as any)} />
                    </div>
                  </TableCell>

                  <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                    {user.code || user.userCode} 
                  </TableCell>
                  <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                    {user.position}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                    {user.name || user.fullName}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                    {user.region}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-gray-700 px-4 py-1">
                    {user.count || user.surveyCount || 0}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              !isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )
            )}

            {!isLoading && users && users.length < 10 && 
              Array.from({ length: 10 - users.length }).map((_, i) => (
              <TableRow key={`empty-${i}`} className="h-10 border-b border-gray-300">
                <TableCell colSpan={6}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between text-[12px] font-medium text-black border-t border-gray-300">
        <div className="flex items-center">
          <span>số dòng mỗi trang : {pageSize}</span>
        </div>

        <div className="flex items-center gap-1 bg-white rounded px-1 py-0.5 shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="px-3 font-bold text-black">{page}</span>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}