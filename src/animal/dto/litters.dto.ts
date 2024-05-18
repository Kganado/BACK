import { IsNumber, IsOptional } from "class-validator";


export class LittersDto{
    
    @IsNumber()
    @IsOptional()
    alive?: number;

    @IsNumber()
    @IsOptional()
    dead?: number;

    @IsNumber()
    animalId: number;
}