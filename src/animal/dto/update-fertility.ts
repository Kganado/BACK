import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateFertilityDto {

    @IsNumber()
    id: number;

    @IsBoolean()
    @IsOptional()
    fertilityStatus?: boolean;

    @IsString()
    @IsOptional()
    fertilityReason?: string;

    @IsNumber()
    animalId: number;

}