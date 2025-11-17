'use client'
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    // BỎ HÌNH NỀN: Xóa các class md:bg-[url(...)], md:bg-cover, md:bg-no-repeat, md:bg-center
    <div 
      className="
        bg-white 
        flex 
        min-h-svh 
        flex-col 
        items-center 
        justify-center 
        p-6 
        md:p-10
      "
    >
      {/* THAY ĐỔI NHỎ: Thẻ div này cũng cần căn giữa để form nằm giữa màn hình. }} */}
      <div className="w-full max-w-sm md:max-w-lg">
        <LoginForm />
      </div>
    </div>
  )
}