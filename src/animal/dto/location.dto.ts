import { IsString } from "class-validator";

export class LocationDto{

    @IsString()
    location: string;
    
}