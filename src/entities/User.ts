import { uuid } from "uuidv4";

export class User {
    public readonly id: string | undefined;
  
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public squad: string | null;
    public isAdmin: boolean;
  
    constructor(props: Omit<User, "id" | "squad" | "isAdmin">, id?: string, squad?: string, isAdmin?: boolean) {
      this.username = props.username;
      this.firstName = props.firstName;
      this.lastName = props.lastName;
      this.email = props.email;
      this.password = props.password;
      
      if (!id) {
        this.id = uuid();
      } 
            
      this.squad = squad || null;
      this.isAdmin = isAdmin || false;
    }
  }