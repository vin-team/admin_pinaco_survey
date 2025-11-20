import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { ChartBarLabel } from "@/components/chart-bar-label"
import { ChartPieSimple } from "@/components/chart-pie-simple"


export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      
      {/* Container mới sử dụng Flexbox hoặc Grid
        - Sử dụng Grid để dễ dàng xác định tỷ lệ cột (col-span-3/5 vs col-span-2/5)
        - Hoặc sử dụng Flexbox với w-[60%] và w-[40%]
      */}
      <div className="grid grid-cols-5 gap-4 px-4 lg:px-6"> 
        {/* Biểu đồ 1: ChartAreaInteractive (60%) => Chiếm 3/5 cột */}
        <div className="col-span-5 md:col-span-3"> 
          <ChartAreaInteractive />
        </div>
        
        {/* Biểu đồ 2: ChartAreaStep (40%) => Chiếm 2/5 cột */}
        <div className="col-span-5 md:col-span-2"> 
          <ChartBarLabel />
        </div>
      </div>
      <ChartPieSimple />
    </div>
  )
}