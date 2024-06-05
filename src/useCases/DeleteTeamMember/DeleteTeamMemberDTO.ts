export interface IDeleteTeamMemberRequestDTO {
    team_id: string;
    user_id: string;
}

export interface IDeleteTeamMemberResponseDTO {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}