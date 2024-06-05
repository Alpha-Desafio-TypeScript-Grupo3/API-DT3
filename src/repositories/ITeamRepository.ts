import { Team } from "../entities/Team";

export interface ITeamRepository {
    getAll(): Promise<Team[]>;

    findById(id: string): Promise<Team>;

    findByName(name: string): Promise<Team>;

    create(team: Team): Promise<Team>;
}