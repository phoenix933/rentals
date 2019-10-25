import { IsString, MaxLength, IsNumber, Min, Max, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { AddressReqDto } from './address-req.dto';
import { ApartmentState } from '../enums';

export class SaveApartmentReqDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(1000)
    description: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(500)
    areaSize: number;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(10000)
    price: number;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(20)
    roomsCount: number;

    @IsNumber()
    @Type(() => Number)
    realtorId: number;

    @IsEnum(ApartmentState)
    state: ApartmentState;

    @ValidateNested()
    @Type(() => AddressReqDto)
    address: AddressReqDto;
}
