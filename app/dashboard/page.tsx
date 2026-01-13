"use client"

import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { SectionCards } from "@/components/section-cards"
import { changeCampaignStatistics, getCampaigns, getCampaignStatistics } from "@/features/campaigns/campaigns.slice";
import { useAppDispatch } from "@/hooks/redux";
import { parseCampaigns, parseCampaignStatistics } from "@/model/Campaign.model";
import { useEffect } from "react";

export default function Page() {
  const dispatch = useAppDispatch();

  const handleGetStatistics = async () => {
    await dispatch(getCampaigns())
      .unwrap()
      .then(async (res) => {
        const payload = res as any;
        const responseData = payload?.data?.data?.data || payload?.data?.data || payload?.data;
        const campaigns = parseCampaigns(responseData?.campaigns || []);
        if (campaigns.length > 0) {
          const campaign = campaigns[0];
          await dispatch(getCampaignStatistics(campaign._id))
            .unwrap()
            .then(async (res) => {
              const payload = res as any;
              const responseData = payload?.data?.data?.data || payload?.data?.data || payload?.data;
              const statistics = parseCampaignStatistics(responseData);
              dispatch(changeCampaignStatistics(statistics));
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    handleGetStatistics()
    return () => { }
  }, []);

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      {/* <div className="px-4 lg:px-6 flex lg:flex-row flex-col gap-4">
        <Card className="@container/card gap-4! py-4! flex-4/6">
          <BarChartComponent />
        </Card>
      </div> */}
      <div className="px-4 lg:px-6 flex lg:flex-row flex-col gap-4 h-full">
        <RecentActivity />
      </div>
    </div>
  )
}
