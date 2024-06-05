import { ITeamRepository } from "../../../repositories/ITeamRepository";
import { IGetTeamByIdRequestDTO } from "./GetTeamByIdDTO";

export class GetTeamByIdUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeGetById(data: IGetTeamByIdRequestDTO) {
        const team = await this.teamRepository.findById(data);

        return team;
    }
}