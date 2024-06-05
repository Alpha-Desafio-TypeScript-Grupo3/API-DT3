export interface IUpdateTeamRequestDTO {
    team_id: string;
    name?: string;
    leader?: string;
}

export interface IUpdateTeamResponseDTO {
    id: string;
    name: string;
    leader: string;
}