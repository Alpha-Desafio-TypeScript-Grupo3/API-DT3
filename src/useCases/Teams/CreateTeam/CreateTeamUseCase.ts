import { Team } from "../../../entities/Team";
import { User } from "../../../entities/User";
import { ITeamRepository } from "../../../repositories/ITeamRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ConflictException, InternalServerException } from "../../../utils/exceptions";
import { ICreateTeamRequestDTO } from "./CreateTeamDTO";

export class CreateTeamUseCase {

    //Abreviação da declaração de atributo + inicialização no constructor
    constructor(
        private teamRepository: ITeamRepository,
        private userRepository: IUserRepository
    ) { }

    async execute(data: ICreateTeamRequestDTO) {
        const teamAlreadyExists = await this.teamRepository.findByName(data.name);

        if (teamAlreadyExists) throw new ConflictException('Este nome já está em uso');

        const team = new Team(data);

        const createdTeam = await this.teamRepository.createTeam(team);

        const updateLeader: Partial<User> = { squad: createdTeam.id };

        // Atualiza os dados do líder para conter o id do time no atributo squad
        if (createdTeam) {
            await this.userRepository.updateUserById(data.leader, updateLeader);
        } else {
            throw new InternalServerException();
        }
        return createdTeam;
    }
}