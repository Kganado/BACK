import { IsNumber, IsString } from "class-validator";

export class OwnerDto{

    @IsString()
    userId: string;

    @IsNumber()
    animalId: number;

}