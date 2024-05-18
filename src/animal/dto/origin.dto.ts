import { IsNumber, IsOptional, IsString } from "class-validator";

export class OriginDto{

    @IsString()
    @IsOptional()
    female?: string;
    
    @IsString()
    @IsOptional()
    male?: string;

    @IsNumber()
    animalId: number;

    @IsNumber()
    locationId_location: number;

}