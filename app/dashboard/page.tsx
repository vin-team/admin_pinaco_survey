import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { ChartBarLabel } from "@/components/chart-bar-label"
import { ChartPieSimple } from "@/components/chart-pie-simple"
import { NavigationTabs } from "@/components/nav-tab" 


export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      
      {/* KHU VỰC CỦA TABS - Đặt Tabs ở vị trí mong muốn */}
      <div className="flex justify-end px-4 lg:px-6 mt-[-10px] md:mt-0"> 
          {/* Căn chỉnh tabs sang phải. 
             Sử dụng `mt-[-10px]` để kéo tabs lên gần sát header,
             giảm khoảng cách giữa tabs và SectionCards (chỉnh cho mobile/desktop) */}
          <NavigationTabs /> 
      </div>
      
      <SectionCards />
      
      {/* Container Biểu đồ (60/40) */}
      <div className="grid grid-cols-5 gap-4 px-4 lg:px-6"> 
        {/* Biểu đồ 1: ChartAreaInteractive (60%) */}
        <div className="col-span-5 md:col-span-3"> 
          <ChartAreaInteractive />
        </div>
        
        {/* Biểu đồ 2: ChartBarLabel (40%) */}
        <div className="col-span-5 md:col-span-2"> 
          <ChartBarLabel />
        </div>
      </div>
      
      <ChartPieSimple />
    </div>
  )
}