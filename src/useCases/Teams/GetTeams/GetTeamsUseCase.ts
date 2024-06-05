import { ITeamRepository } from "../../../repositories/ITeamRepository";


export class GetTeamsUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeGetAll() {

        const teams = await this.teamRepository.getAll();

        return teams;
    }
}