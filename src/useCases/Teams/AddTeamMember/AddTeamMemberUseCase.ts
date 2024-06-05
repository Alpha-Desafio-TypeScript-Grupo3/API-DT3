import { ITeamRepository } from "../../repositories/ITeamRepository";
import { NotFoundException } from "../../utils/exceptions";
import { IAddTeamMemberRequestDTO } from "./AddTeamMemberDTO";

export class AddTeamMemberUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeAddTeamMember(data: IAddTeamMemberRequestDTO) {

        const teamExists = await this.teamRepository.findById(data);
        if (!teamExists) throw new NotFoundException('Não foi encontrado um time com o id especificado');

        const userExists = await this.userRepository.findById(data.user_id);
        if (!userExists) throw new NotFoundException('Não foi encontrado um usuário com o id especificado');

        const addedMember = await this.teamRepository.addTeamMember(data);

        return addedMember;
    }
}