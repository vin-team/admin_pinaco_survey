import { serverService } from '@/features/http/ServerService';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { responseFailed, responseSuccess } from '../../utils';

export async function POST() {
  const token = (await cookies()).get('refresh_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
  }

  try {
    const response = await serverService.post('/auth/refresh', {
      refreshToken: token,
    });
    const accessToken = response?.data?.data?.accessToken;
    const refreshToken = response?.data?.data?.refreshToken;
    if (accessToken) {
      (await cookies()).set('access_token', accessToken, {
        path: '/',
        httpOnly: true,
      });
    }
    if (refreshToken) {
      (await cookies()).set('refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
      });
    }
    return responseSuccess(response);
  } catch (err: any) {
    const payload = err as any;
    (await cookies()).delete('access_token');
    (await cookies()).delete('refresh_token');
    (await cookies()).delete('email');
    return responseFailed(payload, 'Session Expired');
  }
}
