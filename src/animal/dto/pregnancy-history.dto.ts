import { IsNumber, IsString } from "class-validator";

export class PregnancyHistoryDto {

    @IsString()
    data: string

    @IsNumber()
    animalId: number
}