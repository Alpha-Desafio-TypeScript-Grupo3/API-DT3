import { Team } from "../../entities/Team";
import { ITeamRepository } from "../../repositories/ITeamRepository";
import { IGetTeamRequestDTO, IGetTeamResponseDTO } from "./GetTeamDTO";

export class GetTeamUseCase {


    constructor(private teamRepository: ITeamRepository) { }

    async executeGetAll() {
        const teams = await this.teamRepository.getAll();

        return teams;
    }

    async executeGetById(team_id: string) {
        const team = await this.teamRepository.findById(team_id);

        return team;
    }
}