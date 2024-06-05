import { Team } from "../../entities/Team";
import { ITeamRepository } from "../../repositories/ITeamRepository";
import { ConflictException, NotFoundException } from "../../utils/exceptions";
import { IUpdateTeamRequestDTO } from "./UpdateTeamDTO";


export class UpdateTeamUseCase {

    constructor(private teamRepository: ITeamRepository) { }

    async executeUpdateTeam(data: IUpdateTeamRequestDTO) {

        const teamExists = await this.teamRepository.findById(data);
        if (!teamExists) throw new NotFoundException('Não foi encontrado um time com o id especificado');

        if (data.name) {
            const nameInUse = await this.teamRepository.findByName(data.name);
            if (nameInUse) throw new ConflictException('Este nome já está em uso');
        }

        if (data.leader) {
            const leaderHasTeam = await this.teamRepository.findByName(data.leader);
            if (leaderHasTeam) throw new ConflictException('Este líder já está em um time');
        }

        const updatedTeam = await this.teamRepository.updateTeam(data, teamExists);

        return updatedTeam;
    }
}