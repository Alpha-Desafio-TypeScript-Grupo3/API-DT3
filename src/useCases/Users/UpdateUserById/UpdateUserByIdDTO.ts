export interface IUpdateUserByIdRequestDTO {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    is_admin?: boolean;
}