import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class WeightHistoryDto {
    
    @IsNumber()
    weight: number

    @IsString()
    userId: string

    @IsNumber()
    animalId: number

    @IsString()
    @IsOptional()
    comment?: string

    ageMonths: number
}