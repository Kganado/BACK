import { PartialType } from "@nestjs/mapped-types";
import { LittersDto } from "./litters.dto";
import { IsDate, IsNumber, IsOptional } from "class-validator";


export class UpdateLittersDto extends PartialType(LittersDto) {

    @IsNumber()
    id: number;

    @IsDate()
    @IsOptional()
    date?: Date;

}