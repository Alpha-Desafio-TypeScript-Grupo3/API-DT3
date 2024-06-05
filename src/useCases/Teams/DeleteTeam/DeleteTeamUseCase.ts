import { Team } from "../../../entities/Team";
import { ITeamRepository } from "../../../repositories/ITeamRepository";
import { BadRequestException, NotFoundException } from "../../../utils/exceptions";
import { IDeleteRequestDTO } from "./DeleteTeamDTO";


export class DeleteTeamUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeDeleteTeam(data: IDeleteRequestDTO) {

        const teamExists = await this.teamRepository.findById(data);
        if (!teamExists) throw new NotFoundException('Não foi encontrado um time com o id especificado');

        const hasMembers = await this.teamRepository.getTeamMembers(data);
        if (hasMembers.length > 0) throw new BadRequestException('Não é possível deletar um time que possui membros');

        const deletedTeam = await this.teamRepository.deleteTeam(data);

        return deletedTeam;
    }
}