export interface IGetTeamByIdRequestDTO {
    team_id: string;
}

export interface IGetTeamByIdResponseDTO {
    id: string;
    leader: string;
    name: string;
}