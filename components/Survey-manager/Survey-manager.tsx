"use client";

import SurveyFilter from "./filter";
import Table from "./Table";

export default function SurveyManager() {
  // Sửa lỗi: Component phải return JSX.
  // Thêm một div bao bọc để sắp xếp FilterBar (trên) và Table (dưới)
  return (
    <div className="p-6 space-y-6">
      {/* 1. Thanh Lọc / Control Panel (SurveyFilter) */}
      <SurveyFilter />

      {/* 2. Bảng dữ liệu và Phân trang (Table) */}
      <Table />
    </div>
  );
}