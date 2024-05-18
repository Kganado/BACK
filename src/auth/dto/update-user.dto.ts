import { PartialType } from "@nestjs/mapped-types";
import { RegisterUserDto } from "./register-user.dto";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { UserRol } from "@prisma/client";



export class UpdateUserDto extends PartialType(RegisterUserDto) {
    
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    rol?: UserRol;
}