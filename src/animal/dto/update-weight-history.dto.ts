import { PartialType } from "@nestjs/mapped-types";
import { WeightHistoryDto } from "./weight-history.dto";
import { IsBoolean, IsDate, IsNumber } from "class-validator";


export class UpdateWeightHistoryDto extends PartialType(WeightHistoryDto) {

    @IsNumber()
    id_weight_history: number;

    // @IsDate()
    // date: Date;

    // @IsBoolean()
    // isActive: boolean;

}