import { clientService } from "../http/ClientService";
import { parseCommonHttpResult } from "../http/parseCommonResult";

class UserService {
  async getUserList() {
    const response = await clientService.get('/users');
    return parseCommonHttpResult(response);
  }
}

export const userService = new UserService();