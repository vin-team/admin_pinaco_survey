import { serverService } from "@/features/http/ServerService";
import { responseFailed, responseSuccess } from "../utils";

export async function GET() {
    try {
        // Interceptor đã tự động xử lý Token
        const response = await serverService.get('/users');

        // SỬA: Thêm tham số thứ 2 là chuỗi thông báo thành công
        return responseSuccess(response);
    } catch (error) {
        const payload = error as any;
        return responseFailed(payload, 'Failed to fetch team users');
    }
}