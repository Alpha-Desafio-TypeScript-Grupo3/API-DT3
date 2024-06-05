import { v4 as uuid } from "uuid";

export class User {
    public readonly id: string | undefined;

    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public username: string;
    public squad: string;
    public is_admin: boolean;

    constructor(props: Omit<User, "id" | "squad" | "is_admin">, is_admin?: boolean, squad?: string , id?: string)  {
        this.first_name = props.first_name;
        this.last_name = props.last_name;
        this.email = props.email;
        this.password = props.password;
        this.username = props.username;
        this.squad = squad || "";
        this.is_admin = is_admin || false;
        
        if (!id){
            this.id = uuid();
        }
    }
}
