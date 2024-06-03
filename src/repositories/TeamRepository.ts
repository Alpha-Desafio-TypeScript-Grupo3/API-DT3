import { database } from "../database/postgres";
import { Team } from "../entities/Team";
import { ICreateTeamResponseDTO } from "../useCases/CreateTeam/CreateTeamDTO";
import { IGetTeamResponseDTO } from "../useCases/GetTeam/GetTeamDTO";
import { InternalServerException } from "../utils/exceptions";
import { ITeamRepository } from "./ITeamRepository";

export class TeamRepository implements ITeamRepository {
    private team: Team[] = [];

    async getAll(): Promise<Team[]> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from teams`,
            });

            const teams: IGetTeamResponseDTO[] = results.rows.map((result: Team) => {

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

    async findById(team_id: string): Promise<Team> {
        try {
            const results = await database.executeQuery({
                query: `SELECT * from teams WHERE id = $1`,
                args: [team_id],
            });

            const team: IGetTeamResponseDTO = results.rows[0];

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

            const team: IGetTeamResponseDTO = results.rows[0];

            return team ?? '';
        } catch (error) {
            console.error(`TeamRepository::findById error [${error}]`);
            throw new InternalServerException();
        }
    }

    async create(team: Team): Promise<Team> {
        //this.team.push(team);
        try {

            const result = await database.executeQuery({
                query: "INSERT INTO teams(id, name, leader) VALUES ($1, $2, $3) RETURNING *",
                args: [team.id, team.name, team.leader],
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
}