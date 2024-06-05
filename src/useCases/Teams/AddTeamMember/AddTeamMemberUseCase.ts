import { ITeamRepository } from "../../../repositories/ITeamRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { NotFoundException } from "../../../utils/exceptions";
import { IAddTeamMemberRequestDTO } from "./AddTeamMemberDTO";

export class AddTeamMemberUseCase {

    constructor(
        private teamRepository: ITeamRepository,
        private userRepository: IUserRepository
    ) { }

    async executeAddTeamMember(data: IAddTeamMemberRequestDTO) {

        const teamExists = await this.teamRepository.findById(data);
        if (!teamExists) throw new NotFoundException('Não foi encontrado um time com o id especificado');

        const userExists = await this.userRepository.getUserById(data.user_id);
        if (!userExists) throw new NotFoundException('Não foi encontrado um usuário com o id especificado');

        const addedMember = await this.teamRepository.addTeamMember(data);

        return addedMember;
    }
}