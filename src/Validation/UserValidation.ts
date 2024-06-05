import { BadRequestException } from "../utils/exceptions";
export class UserValidation {
    private constructor() {}
  
    public static emailCheck(email: string): void {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email))
        throw new BadRequestException(`
        The email is invalid. 
        Please check the email example: 
        example@example.com
        `);
    }
  
    public static nameCheck(name: string): void {
      const cleanedName = name.trim();
  
      if (!(cleanedName.length >= 4))
        throw new BadRequestException("The name must have at least 4 characters");
    }
  
    public static passwordCheck(password: string): void {
      const hasLetter = /[a-zA-Z]/.test(password);
  
      const hasNumber = /\d/.test(password);
  
      if (!(password.length >= 8))
        throw new BadRequestException("The password must have at least 8 characters long");
  
      if (!hasNumber) throw new BadRequestException("The password must have at least 1 number");
  
      if (!hasLetter) throw new BadRequestException("The password must have at least 1 letter");
    }

    public static uuidCheck(uuid: string): void {
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidPattern.test(uuid)) {
        throw new BadRequestException("The ID provided is not a valid UUID");
      }
    }
  }