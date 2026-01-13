import { clientService } from "../http/ClientService";
import { parseCommonHttpResult } from "../http/parseCommonResult";

interface GetCampaignsParams {
  page?: number;
  limit?: number;
  status?: string;
}

class CampaignsService {
  async getCampaigns(params?: GetCampaignsParams) {
    const queryParams: Record<string, string> = {};

    if (params?.page) queryParams.page = params.page.toString();
    if (params?.limit) queryParams.limit = params.limit.toString();
    if (params?.status) queryParams.status = params.status;

    const response = await clientService.get('/campaigns', queryParams);
    return parseCommonHttpResult(response);
  }
}

export const campaignsService = new CampaignsService();