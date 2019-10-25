import { IsNumber, Min, Max, IsOptional, IsString, MaxLength, IsISO31661Alpha2 } from 'class-validator';
import { Type } from 'class-transformer';

export class AddressReqDto {
    @IsString()
    @MaxLength(100)
    street1: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    street2: string;

    @IsString()
    @MaxLength(100)
    city: string;

    @IsString()
    @MaxLength(100)
    state: string;

    @IsString()
    @IsISO31661Alpha2()
    country: string;

    @IsString()
    @MaxLength(20)
    postalCode: string;

    @IsNumber()
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber()
    @Type(() => Number)
    @Min(-180)
    @Max(180)
    lng: number;
}
