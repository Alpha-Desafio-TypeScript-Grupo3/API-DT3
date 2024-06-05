import { Team } from "../../../entities/Team";
import { User } from "../../../entities/User";
import { ITeamRepository } from "../../../repositories/ITeamRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { BadRequestException, InternalServerException, NotFoundException } from "../../../utils/exceptions";
import { IDeleteRequestDTO } from "./DeleteTeamDTO";


export class DeleteTeamUseCase {

    constructor(
        private teamRepository: ITeamRepository,
        private userRepository: IUserRepository
    ) { }

    async executeDeleteTeam(data: IDeleteRequestDTO) {

        const teamExists = await this.teamRepository.findById(data);
        console.log("teamex", teamExists)

        if (!teamExists || isEmpty(teamExists)) {
            console.log("entrou aqui")
            throw new NotFoundException('Não foi encontrado um time com o id especificado');
        }

        const hasMembers = await this.teamRepository.getTeamMembers(data);
        if (hasMembers.length > 1) throw new BadRequestException('Não é possível deletar um time que possui membros');

        const deletedTeam = await this.teamRepository.deleteTeam(data);
        console.log("deleteeam", deletedTeam);


        // Alterado pra ON DELETE SET NULL
        /* const updateLeader: Partial<User> = { squad: null };

        // Atualiza os dados do líder para exlcuir o id do time no atributo squad
        if (deletedTeam) {
            await this.userRepository.updateUserById(deletedTeam.leader, updateLeader);
        } else {
            throw new InternalServerException();
        } */

        return deletedTeam;
    }
}

function isEmpty(obj: any) {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}