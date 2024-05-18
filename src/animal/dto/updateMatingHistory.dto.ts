import { IsBoolean, IsDate, IsNumber, IsOptional } from "class-validator";

export class UpdateMatingHistotyDto{
    
    @IsNumber()
    id: number;

    @IsDate()
    @IsOptional()
    matingDate?: Date;

    @IsBoolean()
    @IsOptional()
    result?: boolean;

    @IsNumber()
    animalId: number;
}