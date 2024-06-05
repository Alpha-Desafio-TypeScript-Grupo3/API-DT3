export interface ICreateTeamRequestDTO {
    id?: string;
    leader: string;
    name: string;
}
export interface ICreateTeamResponseDTO {
    id: string;
    leader: string;
    name: string;
}