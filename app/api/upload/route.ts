import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { missingRequiredFieldsResponse, responseFailed, responseSuccess } from '../utils';
import { serverService } from '@/features/http/ServerService';

export async function POST(request: NextRequest) {
    const accessToken = (await cookies()).get('access_token')?.value;
    const body = await request.formData();
    const files = body.getAll('files');
    const description = body.get('description');
    if (!files) return missingRequiredFieldsResponse('files');
    try {
        if (!accessToken) throw new Error('No access token');
        const formData = new FormData();
        files.forEach(file => formData.append('files', file as Blob));
        if (description) {
            formData.append('description', description as string);
        }
        const response = await serverService.post('/files', formData);
        return responseSuccess(response);
    } catch (error) {
        const payload = error as any;
        return responseFailed(payload, 'Upload files failed');
    }
}

export async function GET(request: NextRequest) {
    const accessToken = (await cookies()).get('access_token')?.value;
    const queryParams = request.nextUrl.searchParams;
    const id = queryParams.get('id');
    if (!id) return missingRequiredFieldsResponse('id');
    try {
        if (!accessToken) throw new Error('No access token');
        const response = await serverService.get(`/files/${id}`);
        return responseSuccess(response);
    } catch (error) {
        const payload = error as any;
        return responseFailed(payload, 'Get files failed');
    }
}


