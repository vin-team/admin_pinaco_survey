import { missingRequiredFieldsResponse, responseFailed, responseSuccess } from "../../utils";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { serverService } from "@/features/http/ServerService";

export async function POST(request: NextRequest) {
  const accessToken = (await cookies()).get('access_token')?.value;
  const { surveyId, campaignId, dueDate } = await request.json();
  try {
    if (!accessToken) throw new Error('No access token');
    if (!surveyId) return missingRequiredFieldsResponse('surveyId')
    if (!dueDate) return missingRequiredFieldsResponse('dueDate')

    const payload = {
      surveyId: surveyId.toString(),
      campaignId: campaignId?.toString(),
      onlyUnassigned: true,
      dueDate: dueDate
    }
    const response = await serverService.post(`/tasks/assign-from-mappings`, payload);
    return responseSuccess(response);
  } catch (error: any) {
    const payload = error as any;
    return responseFailed(payload, 'Assign tasks failed');
  }
}

