import { cookieUtils } from "@/utils/cookie.util";
import { BaseHttpService } from "./BaseHttpService";
import { storage } from "@/lib/storage.util";

export class ServerService extends BaseHttpService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || '', 30000);
  }

  protected setupInterceptors(): void {
    this.instance.interceptors.request.use(
      async (config) => {
        const token = await this.getAccessToken();
        console.log('token', token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // console.log('ServerService Error response:', error.response);
        const payload = {
          status: error.response?.status || 500,
          statusText: error.response?.statusText || 'Internal Server Error',
          code: error.response?.data?.code,
          message: error.response?.data?.message,
        };
        return Promise.reject(payload);
      }
    );
  }

  private async getAccessToken(): Promise<string | null> {
    if (typeof window === 'undefined') {
      try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        return cookieStore.get('accessToken')?.value || null;
      } catch (_) {
        this.clearAuthState();
      }
    }
    // Client-side fallback
    return cookieUtils.get('accessToken');
  }

  private async clearAuthState(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        try {
          const { cookies } = await import('next/headers');
          const cookieStore = await cookies();
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
        } catch (_) { }
      } else {
        cookieUtils.remove('accessToken');
        cookieUtils.remove('refreshToken');
      }
    } finally {
      storage.clear();
    }
  }

  async delete(url: string, data: any, _headers?: Record<string, string>) {
    return this.instance.delete(url, { data: data });
  }
}

export const serverService = new ServerService();
