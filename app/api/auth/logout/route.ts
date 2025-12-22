import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverService } from '@/features/http/ServerService';

export async function POST() {
  try {
    const refreshToken = (await cookies()).get('refresh_token')?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: 'Session Expired' }, { status: 401 });
    }
    await serverService.post('/auth/logout', {
      refreshToken: refreshToken
    });
    (await cookies()).delete('access_token');
    (await cookies()).delete('refresh_token');
    (await cookies()).delete('email');
    (await cookies()).delete('phone');
    return NextResponse.json({ status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Logout failed' }, { status: 400 });
  }
}