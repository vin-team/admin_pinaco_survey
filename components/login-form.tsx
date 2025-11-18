"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {Eye, EyeOff} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import {login} from "@/features/auth/auth.slice"
import {useAppDispatch, useAppSelector} from "@/hooks/redux"
import {Spinner} from "@/components/ui/spinner"
import {zodResolver} from "@hookform/resolvers/zod"
import {loginSchema, type LoginFormData} from "@/features/auth/auth.schema"
import {authService} from "@/features/auth/auth.service"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth.requestState)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data: LoginFormData) => {
    await dispatch(login(data))
      .unwrap()
      .then((res: any) => {
        const data = res?.data?.data
        const profile = data?.profile
        if (profile) {
          authService.storageUser(profile)
        }
        const typeAccess = data?.typeAcess;
        if(typeAccess) {
          authService.storageTypeAccess(typeAccess)
        }
      })
      .catch((err: any) => {
        setError("root.username", {message: err?.message??'Đăng nhập thất bại'})
      })
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 h-full">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
          <form className="p-6 md:p-8 lg:p-10 flex flex-col">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src="/assets/logo_vi.png"
                  alt="Pinaco"
                  className="object-contain h-[80px] md:h-[100px]"
                  width={1024}
                  height={80}
                />
                <h1 className="text-2xl font-bold">Chào mừng đến với Pinaco</h1>
                <p className="text-muted-foreground text-balance">
                  Trang dành cho quản trị viên
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="username" className="text-sm sm:text-base">Tên người dùng</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên người dùng"
                  {...register("username")}
                  className={cn(errors.username && "border-destructive", "text-sm sm:text-base h-10 sm:h-11") }
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-sm sm:text-base">Mật khẩu</FieldLabel>
                <a href="#" className="ml-auto text-xs sm:text-sm underline-offset-2 hover:underline" hidden>
                  Bạn Quên mật khẩu
                </a>
                </div>
                <div className="relative">
                </div>
                <Input id="password" type="password"  placeholder="Nhập mật khẩu" required />
              </Field>
              <Field>
                <Button type="submit">Đăng nhập</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/icon.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
