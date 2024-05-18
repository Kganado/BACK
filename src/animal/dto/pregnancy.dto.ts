import { IsDate, IsNumber, IsOptional } from "class-validator";

export class PregnancyDto {

    @IsNumber()
    animalId: number

}