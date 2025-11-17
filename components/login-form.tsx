'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React from "react"
import { useAppDispatch } from "@/hooks/redux"
import { setIsLogged } from "@/features/app/app.slice"
import { loginSchema, type LoginFormData } from "@/features/auth/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(setIsLogged(true))
    window.location.href = '/dashboard'
  }

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  

  return (
    // Đặt chiều rộng tối đa cho Card Container trên Desktop
    <div className={cn("flex flex-col gap-6 max-w-sm md:max-w-lg mx-auto", className)} {...props}>
      <Card 
        className="
          overflow-hidden 
          p-0 
          h-full 
          bg-white 
          border 
          shadow-xl
          
          /* THAY ĐỔI: Chuyển về nền trắng solid và bỏ blur/transparency */
          md:bg-white
          md:border-gray-200 /* Thêm viền nhẹ cho desktop nếu cần */
        "
      >
        <CardContent 
          className="
            grid 
            p-0 
            h-full 
            text-foreground 
            
            /* KHÔI PHỤC: Bỏ md:text-white và md:drop-shadow để dùng màu chữ mặc định (đen) */
            md:drop-shadow-none /* Bỏ hiệu ứng bóng đổ chữ */
            md:text-foreground /* Khôi phục màu chữ mặc định (thường là đen) */
            
            md:grid-cols-1 
            md:place-content-center
          "
        >
          
          <form 
            className="
              p-6 
              md:p-10 
              flex 
              flex-col 
              justify-center 
              items-center 
              w-full 
              h-full
              md:max-w-full
            "
          >
            <FieldGroup className="w-full max-w-md">
              <div className="flex flex-col items-center gap-2 text-center">
                
                <div className="flex flex-col items-center justify-center"> 
                    
                    {/* HÌNH ẢNH 1: CHỈ HIỂN THỊ TRÊN DESKTOP */}
                    <Image
                        src="/assets/logo_vi.png"
                        alt="Pinaco Logo Chính"
                        className="object-contain hidden h-[80px] md:block md:h-[100px]" 
                        width={1024}
                        height={80}
                        unoptimized
                    />

                    {/* HÌNH ẢNH 2: CHỈ HIỂN THỊ TRÊN MOBILE */}
                    <Image
                        src="/assets/logo_vi.png" 
                        alt="Pinaco Mobile Logo"
                        className="object-contain h-[60px] w-auto md:hidden" 
                        width={1024}
                        height={80}
                        unoptimized
                    />
                </div>
                
                <h1 className="text-xl sm:text-2xl font-bold">Chào mừng đến với Pinaco</h1>
                <p className="text-sm sm:text-base text-gray-500 
                  /* KHÔI PHỤC: Đảm bảo text-gray-500 cũng áp dụng trên desktop */
                  md:text-gray-500 
                  text-balance">
                  Đăng nhập để tiếp tục
                </p>
              </div>
              <Field>
                <FieldLabel className="text-sm sm:text-base"> Số điện thoại</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  {...register("phone")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel className="text-sm sm:text-base">Mã OTP</FieldLabel>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    /* KHÔI PHỤC: Đặt lại màu chữ link thành màu primary trên desktop */
                    className="ml-auto text-primary sm:text-sm h-auto p-0 md:text-primary"
                  >Gửi mã OTP </Button>
                </div>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Nhập mã OTP"
                    {...register("otpnumber")} // <--- ĐÃ SỬA LỖI TẠI ĐÂY
                  />
                </div>
              </Field>
              <Field>
                <Button type="submit"
                  onClick={handleSubmit(handleLogin)}
                  /* Cập nhật hiệu ứng hover cho nền trắng */
                  className="bg-primary/80
                hover:bg-primary
                hover:shadow-lg
                hover:text-white
                active:bg-primary/90"
                >
                  Đăng nhập/Đăng ký</Button>
              </Field>
            </FieldGroup>
          </form>
          
          {/* Giữ nguyên phần version (chỉ hiển thị trên mobile) */}
          <div className="md:hidden text-xs text-gray-400 text-center mt-4 w-full self-end flex flex-row items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="Pinaco Logo"
              width={524}
              height={524}
              className="object-contain w-12 h-12"
              unoptimized
            />
            <div className="text-xs text-gray-400 text-center">- Version 1.0</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}