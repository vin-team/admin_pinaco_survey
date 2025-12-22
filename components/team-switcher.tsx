"use client"

import * as React from "react"
import Image from "next/image"
import { useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    plan: string
  }[]
}) {
  const { open } = useSidebar()
  const [activeTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <div className="flex gap-3 items-center">
      <div className={cn("bg-transparent text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg", open ? "size-12" : "size-8")}>
        <Image src="/assets/icon-app.png" alt="icon-app" width={48} height={48} className={cn("object-contain", open ? "size-12" : "size-8")} />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{activeTeam.name}</span>
        <span className="truncate text-xs">{activeTeam.plan}</span>
      </div>
    </div>
  )
}
