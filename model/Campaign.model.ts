export interface Campaign {
  _id: string;
  campaignName: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const parseCampaign = (campaign: any): Campaign => {
  return {
    _id: campaign._id,
    campaignName: campaign.campaignName,
    description: campaign.description,
    status: campaign.status,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    createdBy: campaign.createdBy,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    __v: campaign.__v,
  };
};

export const parseCampaigns = (campaigns: any[]): Campaign[] => {
  if (!Array.isArray(campaigns)) return [];
  return campaigns.map(parseCampaign);
};