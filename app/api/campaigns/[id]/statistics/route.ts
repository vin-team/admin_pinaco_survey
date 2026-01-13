import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { serverService } from "@/features/http/ServerService";
import { responseFailed, responseSuccess } from "../../../utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const accessToken = (await cookies()).get('access_token')?.value;
  const id = (await params).id;
  try {
    if (!accessToken) throw new Error('No access token');
    if (!id) throw new Error('Campaign ID is required');

    const response = await serverService.get(`/campaigns/${id}/statistics`);
    return responseSuccess(response);
  } catch (error: any) {
    const payload = error as any;
    return responseFailed(payload, 'Get campaign statistics failed');
  }
}

