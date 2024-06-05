import { ITeamRepository } from "../../../repositories/ITeamRepository";
import { NotFoundException } from "../../../utils/exceptions";
import { IGetTeamMembersRequestDTO } from "./GetTeamMembersDTO";


export class GetTeamMembersUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeGetTeamMembers(data: IGetTeamMembersRequestDTO) {
        const teamExists = await this.teamRepository.findById(data);

        if (!teamExists) {
            throw new NotFoundException('Não foi encontrado um time com o id especificado');
        }


        const members = await this.teamRepository.getTeamMembers(data);

        return members;
    }
}