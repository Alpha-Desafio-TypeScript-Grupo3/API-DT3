export interface IAddTeamMemberRequestDTO {
    team_id: string;
    user_id: string;
}

export interface IAddTeamMemberResponseDTO {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}