import { clientService } from "../http/ClientService";
import { parseCommonHttpResult } from "../http/parseCommonResult";

class AuthService {
  async login(data: { email: string, password: string }) {
    const response = await clientService.post('/auth/login', data);
    return parseCommonHttpResult(response);
  }

  async logout() {
    const response = await clientService.post('/auth/logout');
    return parseCommonHttpResult(response);
  }

  async sendOtp(data: { phone: string, action: string }) {
    const response = await clientService.post('/auth/send-otp', data);
    return parseCommonHttpResult(response);
  }

  async verifyOtp(data: { phone: string, otp: string }) {
    const response = await clientService.post('/auth/verify-otp', data);
    return parseCommonHttpResult(response);
  }

  async resendOtp(data: { phone: string }) {
    const response = await clientService.post('/auth/resend-otp', data);
    return parseCommonHttpResult(response);
  }
}

export const authService = new AuthService();