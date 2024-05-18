import { IsString, IsStrongPassword, minLength } from "class-validator";

export class LoginUserDto {

    @IsString()
    userName: string;

    @IsString()
    @IsStrongPassword()
    password: string;

}
