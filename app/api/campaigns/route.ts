import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { serverService } from "@/features/http/ServerService";
import { responseFailed, responseSuccess } from "../utils";

export async function GET(request: NextRequest) {
  const accessToken = (await cookies()).get('access_token')?.value;
  const params = request.nextUrl.searchParams;
  try {
    if (!accessToken) throw new Error('No access token');
    const urlParams = new URLSearchParams();

    // Pagination
    if (params.get('page')) {
      urlParams.set('page', params.get('page') ?? '');
    }
    if (params.get('limit')) {
      urlParams.set('limit', params.get('limit') ?? '');
    }

    // Filtering
    if (params.get('status')) {
      urlParams.set('status', params.get('status') ?? '');
    }

    const queryString = urlParams.toString();
    const url = queryString ? `/campaigns?${queryString}` : '/campaigns';
    const response = await serverService.get(url);
    return responseSuccess(response);
  } catch (error: any) {
    const payload = error as any;
    return responseFailed(payload, 'Get campaigns failed');
  }
}

