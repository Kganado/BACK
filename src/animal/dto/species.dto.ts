import { IsNumber, IsOptional, IsString } from "class-validator";

export class SpecieDto{
    
    @IsString()
    species: string;

    @IsString()
    gestationTime: string;

    @IsString()
    @IsOptional()
    avgWeightFemale?: string;

    @IsString()
    @IsOptional()
    avgWeightMale?: string;

    @IsNumber()
    @IsOptional()
    avgPricePerKilo?: number;

    @IsNumber()
    @IsOptional()
    soldKilos?: number;
}