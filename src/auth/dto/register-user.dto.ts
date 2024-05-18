import { IsString, IsStrongPassword } from "class-validator";


export class RegisterUserDto {

    @IsString()
    name: string;

    @IsString()
    userName: string

    @IsString()
    @IsStrongPassword()
    password: string

}