import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "../ui/button";
import { CalendarPlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { ScheduleSheet } from "./ScheduleSheet";
import { clearTaskState } from "@/features/task/task.slice";
import { clearSurveyState } from "@/features/survey/survey.slice";
import { clearCampaignsState } from "@/features/campaigns/campaigns.slice";

export function Header() {
  const dispatch = useAppDispatch();
  const { showSuccess, showFailed, showLoading } = useDialog();
  const taskState = useAppSelector((state) => state.task.requestState);
  const [openScheduleSheet, setOpenScheduleSheet] = useState<boolean>(false);

  const clearState = () => {
    dispatch(clearTaskState());
    dispatch(clearSurveyState());
    dispatch(clearCampaignsState());
    setOpenScheduleSheet(false);
  }

  useEffect(() => {
    if (!taskState.type) return;
    if (taskState.type === 'createMultipleTasks') {
      switch (taskState.status) {
        case 'completed':
          showSuccess({
            title: 'Thành công',
            description: 'Lịch trình khảo sát đã được tạo thành công',
            onCancel: clearState,
            onConfirm: clearState
          });
          break;
        case 'failed':
          showFailed({
            title: 'Thất bại',
            description: 'Lịch trình khảo sát đã được tạo thất bại',
            onCancel: clearState,
            onConfirm: clearState
          });
          break;
        case 'loading':
          showLoading({ title: 'Đang xử lý', description: 'Vui lòng chờ trong giây lát' });
          break;
      }
    }
  }, [taskState]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Quản lý lịch trình khảo sát</h1>
        <p className="text-base text-muted-foreground">Xem, lọc và quản lý danh sách các lịch trình khảo sát tại điểm bán</p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Button variant="outline" onClick={() => setOpenScheduleSheet(true)}>
          <CalendarPlus2 />
          Tạo lịch trình
        </Button>
      </div>
      <ScheduleSheet open={openScheduleSheet} onOpenChange={setOpenScheduleSheet} />
    </div>
  )
}