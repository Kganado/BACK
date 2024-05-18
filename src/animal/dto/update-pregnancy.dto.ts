import { PartialType } from "@nestjs/mapped-types";
import { PregnancyDto } from "./pregnancy.dto";
import { IsBoolean, IsDate, IsNumber, IsOptional } from "class-validator";


export class UpdatePregnancyDto extends PartialType(PregnancyDto) {

    @IsOptional()
    @IsNumber()
    id: number

    @IsBoolean()
    @IsOptional()
    isPregnant?: boolean;

    @IsNumber()
    @IsOptional()
    time?: number

}