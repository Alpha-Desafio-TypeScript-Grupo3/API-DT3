import { Team } from "../../entities/Team";
import { ITeamRepository } from "../../repositories/ITeamRepository";
import { ConflictException } from "../../utils/exceptions";
import { ICreateTeamRequestDTO } from "./CreateTeamDTO";

export class CreateTeamUseCase {

    //Abreviação da declaração de atributo + inicialização no constructor
    constructor(private teamRepository: ITeamRepository) { }

    async execute(data: ICreateTeamRequestDTO) {
        const teamAlreadyExists = await this.teamRepository.findByName(data.name);

        console.log("usecase:", teamAlreadyExists)

        if (teamAlreadyExists) {
            throw new ConflictException('Este nome já está em uso');

        }

        const team = new Team(data);

        console.log("usecase:", team)

        await this.teamRepository.create(team);
    }
}