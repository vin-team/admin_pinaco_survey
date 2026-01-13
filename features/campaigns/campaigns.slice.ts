import { RequestState } from "@/store/state";
import { createSlice } from "@reduxjs/toolkit";
import { Campaign, CampaignStatistics, parseCampaigns, parseCampaignStatistics } from "@/model/Campaign.model";
import { commonCreateAsyncThunk } from "@/store/thunk";
import { campaignsService } from "./campaigns.service";

interface CampaignsState {
  campaigns: Campaign[];
  campaign: Campaign | null;
  campaignStatistics: CampaignStatistics | null;
  requestState: RequestState;
}

const initialState: CampaignsState = {
  campaigns: [],
  campaign: null,
  campaignStatistics: null,
  requestState: { status: 'idle', type: '' },
};

export const getCampaigns = commonCreateAsyncThunk({ type: 'getCampaigns', action: campaignsService.getCampaigns });
export const getCampaignStatistics = commonCreateAsyncThunk({ type: 'getCampaignStatistics', action: campaignsService.getCampaignStatistics });

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    changeCampaign: (state, action) => {
      state.campaign = action.payload;
    },
    changeCampaignStatistics: (state, action) => {
      state.campaignStatistics = action.payload;
    },
    clearCampaignsState: (state) => {
      state.campaign = null;
      state.requestState = { status: 'idle', type: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.fulfilled, (state, action) => {
        const payload = action.payload as any;
        const responseData = payload?.data?.data?.data || payload?.data?.data || payload?.data;
        state.campaigns = parseCampaigns(responseData?.campaigns || []);
        state.requestState = { status: 'completed', type: 'getCampaigns' };
      })
      .addCase(getCampaigns.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getCampaigns' };
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'getCampaigns', error: payload?.message };
      })
      .addCase(getCampaignStatistics.fulfilled, (state, action) => {
        const payload = action.payload as any;
        const responseData = payload?.data?.data?.data || payload?.data?.data || payload?.data;
        state.campaignStatistics = parseCampaignStatistics(responseData);
        state.requestState = { status: 'completed', type: 'getCampaignStatistics' };
      })
      .addCase(getCampaignStatistics.pending, (state) => {
        state.requestState = { status: 'loading', type: 'getCampaignStatistics' };
      })
      .addCase(getCampaignStatistics.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'getCampaignStatistics', error: payload?.message };
      })
  },
});

export const { changeCampaign, changeCampaignStatistics, clearCampaignsState } = campaignsSlice.actions;
export const campaignsReducer = campaignsSlice.reducer;