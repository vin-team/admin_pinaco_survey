import { serverService } from "@/features/http/ServerService";
import { missingRequiredFieldsResponse, responseFailed, responseSuccess } from "../../utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  try {
    const files = body.getAll('files');
    const description = body.get('description');
    if (!files) return missingRequiredFieldsResponse('files');
    const formData = new FormData();
    files.forEach((file: any) => formData.append('files', file as File));
    if (description) formData.append('description', description as string);
    const response = await serverService.upload('/assets/upload-multiple', formData);
    return responseSuccess(response.data);
  } catch (error) {
    const payload = error as any;
    return responseFailed(payload, 'Upload multiple files failed');
  }
}