import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";
import { OriginDto } from "./origin.dto";


export class UpdateOriginDto extends PartialType(OriginDto) {

    @IsNumber()
    id_origin: number;

}