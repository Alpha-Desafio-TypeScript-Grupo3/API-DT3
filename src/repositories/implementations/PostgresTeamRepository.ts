import { database } from "../../database/postgres";
import { Team } from "../../entities/Team";
import { IAddTeamMemberRequestDTO, IAddTeamMemberResponseDTO } from "../../useCases/Teams/AddTeamMember/AddTeamMemberDTO";
import { ICreateTeamRequestDTO, ICreateTeamResponseDTO } from "../../useCases/Teams/CreateTeam/CreateTeamDTO";
import { IDeleteRequestDTO, IDeleteResponseDTO } from "../../useCases/Teams/DeleteTeam/DeleteTeamDTO";
import { IDeleteTeamMemberRequestDTO, IDeleteTeamMemberResponseDTO } from "../../useCases/Teams/DeleteTeamMember/DeleteTeamMemberDTO";
import { IGetTeamByIdRequestDTO, IGetTeamByIdResponseDTO } from "../../useCases/Teams/GetTeamById/GetTeamByIdDTO";
import { IGetTeamMembersRequestDTO, IGetTeamMembersResponseDTO } from "../../useCases/Teams/GetTeamMembers/GetTeamMembersDTO";
import { IGetTeamsRequestDTO, IGetTeamsResponseDTO } from "../../useCases/Teams/GetTeams/GetTeamsDTO";
import { IUpdateTeamRequestDTO, IUpdateTeamResponseDTO } from "../../useCases/Teams/UpdateTeam/UpdateTeamDTO";
import { InternalServerException } from "../../utils/exceptions";
import { ITeamRepository } from "../ITeamRepository";

export class TeamRepository implements ITeamRepository {
    private team: Team[] = [];

    async getAll(): Promise<IGetTeamsResponseDTO[]> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from teams`,
            });

            const teams: IGetTeamsResponseDTO[] = results.rows.map((result: Team) => {

                return ({
                    id: result.id,
                    name: result.name,
                    leader: result.leader,
                });
            });

            return teams ?? [];
        } catch (error) {
            console.error(`TeamRepository::getAll error [${error}]`);
            throw new InternalServerException();
        }
    }

    async getTeamMembers(data: IGetTeamMembersRequestDTO): Promise<IGetTeamMembersResponseDTO[]> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from users WHERE team = $1`,
            });

            console.log("rr", results.rows);

            const members: IGetTeamMembersResponseDTO[] = results.rows.map((result: Team) => {

                return ({
                    name: result.name,
                    args: [data.team_id],
                });
            });

            return members ?? [];
        } catch (error) {
            console.error(`TeamRepository::getAll error [${error}]`);
            throw new InternalServerException();
        }
    }

    async findById(data: IGetTeamByIdRequestDTO): Promise<IGetTeamByIdResponseDTO> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from teams WHERE id = $1`,
                args: [data.team_id],
            });

            const team: IGetTeamByIdResponseDTO = results.rows[0];

            return team ?? [];
        } catch (error) {
            console.error(`TeamRepository::findById error [${error}]`);
            throw new InternalServerException();
        }
    }

    async findByName(name: string): Promise<Team> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from teams WHERE name = $1`,
                args: [name],
            });

            const team: IGetTeamsResponseDTO = results.rows[0];

            return team ?? '';
        } catch (error) {
            console.error(`TeamRepository::findById error [${error}]`);
            throw new InternalServerException();
        }
    }

    async findByLeader(leader: string): Promise<Team> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from teams WHERE leader = $1`,
                args: [leader],
            });

            const team: IGetTeamsResponseDTO = results.rows[0];

            return team ?? '';
        } catch (error) {
            console.error(`TeamRepository::findById error [${error}]`);
            throw new InternalServerException();
        }
    }

    async createTeam(data: ICreateTeamRequestDTO): Promise<ICreateTeamResponseDTO> {
        try {

            const result = await database.executeQuery({
                query: "INSERT INTO teams(id, name, leader) VALUES ($1, $2, $3) RETURNING *",
                args: [data.id, data.name, data.leader],
            });

            const createdTeam: ICreateTeamResponseDTO = ({
                id: result.rows[0].id,
                name: result.rows[0].name,
                leader: result.rows[0].leader,
            });

            return createdTeam;
        } catch (error) {
            console.error(`UserRepository::createUser error [${error}]`);
            throw new InternalServerException();
        }
    }

    async addTeamMember(data: IAddTeamMemberRequestDTO): Promise<IAddTeamMemberResponseDTO> {
        try {

            const result = await database.executeQuery({
                query: "UPDATE users SET team = $2 WHERE id = $1 RETURNING *",
                args: [data.user_id, data.team_id],
            });

            const addedMember: IAddTeamMemberResponseDTO = ({
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email,
                first_name: result.rows[0].first_name,
                last_name: result.rows[0].last_name,
            });

            return addedMember;
        } catch (error) {
            console.error(`UserRepository::createUser error [${error}]`);
            throw new InternalServerException();
        }
    }

    async updateTeam(data: IUpdateTeamRequestDTO, existingTeam: Team): Promise<IUpdateTeamResponseDTO> {
        try {

            const teamUpdate: Partial<Team> = {};
            if (data.name) teamUpdate.name = data.name;
            if (data.leader) teamUpdate.leader = data.leader;

            const newTeam = { ...existingTeam, ...teamUpdate };

            const result = await database.executeQuery({
                query: "UPDATE teams SET name = $2, leader = $3 WHERE id = $1 RETURNING *",
                args: [data.team_id, newTeam.name, newTeam.leader],
            });

            const updatedTeam: IUpdateTeamResponseDTO = ({
                id: result.rows[0].id,
                name: result.rows[0].name,
                leader: result.rows[0].leader,
            });

            return updatedTeam;
        } catch (error) {
            console.error(`UserRepository::createUser error [${error}]`);
            throw new InternalServerException();
        }
    }

    async deleteTeamMember(data: IDeleteTeamMemberRequestDTO): Promise<IDeleteTeamMemberResponseDTO> {
        try {

            const result = await database.executeQuery({
                query: "UPDATE users SET team = '' WHERE id = $1 RETURNING *",
                args: [data.user_id],
            });

            const removedMember: IDeleteTeamMemberResponseDTO = ({
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email,
                first_name: result.rows[0].first_name,
                last_name: result.rows[0].last_name,
            });

            return removedMember;
        } catch (error) {
            console.error(`UserRepository::createUser error [${error}]`);
            throw new InternalServerException();
        }
    }

    async deleteTeam(data: IDeleteRequestDTO): Promise<IDeleteResponseDTO> {
        try {

            const result = await database.executeQuery({
                query: "DELETE teams WHERE id = $1 RETURNING *",
                args: [data.team_id],
            });

            const deletedTeam: IUpdateTeamResponseDTO = ({
                id: result.rows[0].id,
                name: result.rows[0].name,
                leader: result.rows[0].leader,
            });

            return deletedTeam;
        } catch (error) {
            console.error(`UserRepository::createUser error [${error}]`);
            throw new InternalServerException();
        }
    }
}