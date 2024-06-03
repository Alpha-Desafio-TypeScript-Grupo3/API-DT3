/* import { User } from "../entities/userEntity";

const nameRegex = /^(?=(?:[^\p{L}]*\p{L}){4})[\p{L}\s]+$/u;
const name4CharacterRegex = /^(?=(?:[^\p{L}]*\p{L}){4})/u;
const nameLettersAndSpacesRegex = /^[\p{L}\s]+$/u;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/u;
const password8CharecterRegex = /^.{8,}$/u;
const passwordOnlyLettersAndNumbersRegex = /^[a-zA-Z\d]+$/u;
const passwordOneLetterAndNumberRegex = /^(?=.*[a-zA-Z])(?=.*\d)/u;

class ValidateForm {

    create(user: Partial<User>): string | undefined {
        if (!user.name) return "User name must be a non-empty string";
        if (!user.email) return "User email must be a non-empty string";
        if (!user.password) return "User password must be a non-empty string";

        if (!nameLettersAndSpacesRegex.test(user.name.trim())) return "Only letters and spaces are allowed for name";
        if (!name4CharacterRegex.test(user.name.trim())) return "Name must contain at least 4 characters";

        if (!emailRegex.test(user.email.trim())) return "Invalid e-mail";

        if (!password8CharecterRegex.test(user.password.trim())) return "Password must contain at least 8 characters";
        if (!passwordOnlyLettersAndNumbersRegex.test(user.password.trim())) return "Only letters and numbers are allowed for password";
        if (!passwordOneLetterAndNumberRegex.test(user.password.trim())) return "Password must contain at least one letter and one number";
    }

    update(user: Partial<User>): string | undefined {

        if (!user.id) return 'The id was not specified or is invalid';
        else if (isNaN(user.id)) return 'User id must be a number';

        if (user.name && !nameLettersAndSpacesRegex.test(user.name.trim())) return "Only letters and spaces are allowed for name";
        if (user.name && !name4CharacterRegex.test(user.name.trim())) return "Name must contain at least 4 characters";

        if (user.email && !emailRegex.test(user.email.trim())) return "Invalid e-mail";

        if (user.password && !password8CharecterRegex.test(user.password.trim())) return "Password must contain at least 8 characters";
        if (user.password && !passwordOnlyLettersAndNumbersRegex.test(user.password.trim())) return "Only letters and numbers are allowed for password";
        if (user.password && !passwordOneLetterAndNumberRegex.test(user.password.trim())) return "Password must contain at least one letter and one number";
    }
}

const validateForm = new ValidateForm();

export default validateForm; */