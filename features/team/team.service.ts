import { clientService } from "../http/ClientService";
import { parseCommonHttpResult } from "../http/parseCommonResult";

class TeamService {
  async getTeamList() {
    const response = await clientService.get('/users');
    return parseCommonHttpResult(response);
  }
}

export const teamService = new TeamService();