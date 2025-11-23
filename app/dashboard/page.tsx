import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { ChartBarLabel } from "@/components/chart-bar-label"
import { ChartPieSimple } from "@/components/chart-pie-simple"
import { NavigationTabs } from "@/components/nav-tab"
import SurveyManager from "@/components/survey-manager/survey-manager" // Import Survey Manager tại đây
import SurveyQuestion from "@/components/survey-question/detailcard" // Import Survey Question tại đây

// 1. Tách giao diện "Tổng quan" ra thành một component riêng
// Để khi chuyển tab khác, component này sẽ được unmount (biến mất)
const OverviewContent = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />

      {/* Container Biểu đồ (60/40) */}
      <div className="grid grid-cols-5 gap-4 px-4 lg:px-6">
        <div className="col-span-5 md:col-span-3">
          <ChartAreaInteractive />
        </div>
        <div className="col-span-5 md:col-span-2">
          <ChartBarLabel />
        </div>
      </div>

      <ChartPieSimple />
    </div>
  )
}

export default function Page() {
  // 2. Định nghĩa cấu hình Tabs tại đây
  const tabData = [
    {
      value: "tong_quan",
      label: "Tổng quan",
      component: <OverviewContent /> // Gọi giao diện tổng quan đã tách ở trên
    },
    {
      value: "ql_ks",
      label: "Quản lý khảo sát",
      component: <SurveyManager /> // Gọi giao diện quản lý khảo sát
    },
    {
      value: "ch_ks",
      label: "Câu hỏi khảo sát",
      component: <SurveyQuestion />
    },
    {
      value: "ql_dn",
      label: "Quản lý đội ngũ",
      component: null // Để trắng
    },
  ]

  return (
    <div className="w-full pt-4">
      {/* Chỉ cần gọi NavigationTabs và truyền cấu hình vào */}
      {/* NavigationTabs giờ đây sẽ quản lý việc hiển thị/ẩn các component con */}
      <NavigationTabs items={tabData} />
    </div>
  )
}