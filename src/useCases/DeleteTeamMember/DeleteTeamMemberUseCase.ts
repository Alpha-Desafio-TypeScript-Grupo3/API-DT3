import { ITeamRepository } from "../../repositories/ITeamRepository";
import { BadRequestException, NotFoundException } from "../../utils/exceptions";
import { IDeleteTeamMemberRequestDTO } from "./DeleteTeamMemberDTO";


export class DeleteTeamMemberUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeDeleteTeamMember(data: IDeleteTeamMemberRequestDTO) {

        const teamExists = await this.teamRepository.findById(data);
        if (!teamExists) throw new NotFoundException('Não foi encontrado um time com o id especificado');

        const userExists = await this.userRepository.findById(data.user_id);
        if (!userExists) throw new NotFoundException('Não foi encontrado um usuário com o id especificado');

        if (userExists.team !== data.team_id) throw new BadRequestException('Este usuário não pertence ao time especificado');

        if (teamExists.leader === data.user_id) throw new BadRequestException('Não é possível remover o líder da equipe');

        const removedMember = await this.teamRepository.deleteTeamMember(data);

        return removedMember;
    }
}