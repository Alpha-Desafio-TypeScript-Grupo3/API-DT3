import { Team } from "../entities/Team";
import { IAddTeamMemberRequestDTO, IAddTeamMemberResponseDTO } from "../useCases/AddTeamMember/AddTeamMemberDTO";
import { ICreateTeamRequestDTO, ICreateTeamResponseDTO } from "../useCases/CreateTeam/CreateTeamDTO";
import { IDeleteRequestDTO, IDeleteResponseDTO } from "../useCases/DeleteTeam/DeleteTeamDTO";
import { IDeleteTeamMemberRequestDTO, IDeleteTeamMemberResponseDTO } from "../useCases/DeleteTeamMember/DeleteTeamMemberDTO";
import { IGetTeamByIdRequestDTO, IGetTeamByIdResponseDTO } from "../useCases/GetTeamById/GetTeamByIdDTO";
import { IGetTeamMembersRequestDTO, IGetTeamMembersResponseDTO } from "../useCases/GetTeamMembers/GetTeamMembersDTO";
import { IGetTeamsResponseDTO } from "../useCases/GetTeams/GetTeamsDTO";
import { IUpdateTeamRequestDTO, IUpdateTeamResponseDTO } from "../useCases/UpdateTeam/UpdateTeamDTO";

export interface ITeamRepository {

    //GET
    getAll(): Promise<IGetTeamsResponseDTO[]>;

    getTeamMembers(data: IGetTeamMembersRequestDTO): Promise<IGetTeamMembersResponseDTO[]>;

    findById(data: IGetTeamByIdRequestDTO): Promise<IGetTeamByIdResponseDTO>;

    findByName(name: string): Promise<Team>;

    //POST
    createTeam(data: ICreateTeamRequestDTO): Promise<ICreateTeamResponseDTO>;

    addTeamMember(data: IAddTeamMemberRequestDTO): Promise<IAddTeamMemberResponseDTO>;

    //PATCH
    updateTeam(data: IUpdateTeamRequestDTO, existingTeam: Team): Promise<IUpdateTeamResponseDTO>;

    //DELETE
    deleteTeamMember(data: IDeleteTeamMemberRequestDTO): Promise<IDeleteTeamMemberResponseDTO>;
    deleteTeam(data: IDeleteRequestDTO): Promise<IDeleteResponseDTO>;
}