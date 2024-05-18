import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateAnimalDto {

    @IsNumber()
    initialWeight: number;

    @IsBoolean()
    gender: boolean;

    @IsString()
    animalCode: string;

    @IsBoolean()
    @IsOptional()
    isAlive?: boolean;

    @IsNumber()
    speciesId: number;

    @IsNumber()
    locationId_location: number;

    @IsOptional()
    @IsNumber()
    functionalCurrencyBuyPrice?: number
    
    @IsOptional()
    @IsNumber()
    functionalCurrencySellPrice?: number
    
    @IsOptional()
    @IsString()
    differentiatedTreatment?: string
    
    @IsOptional()
    @IsNumber()
    localCurrencyBuyPrice?: number
    
    @IsOptional()
    @IsNumber()
    localCurrencySellPrice?: number
    
    @IsOptional()
    @IsString()
    reasonForRemoval?: string

    @IsString()
    birthdate: string;
}
