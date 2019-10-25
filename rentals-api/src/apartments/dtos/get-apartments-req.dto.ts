import { IsOptional, IsEnum, IsNumber, IsArray, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { ApartmentStateFilter } from '../enums';

// tslint:disable-next-line: max-classes-per-file
export class GetApartmentsReqDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(500)
    @Type(() => Number)
    minAreaSize: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(500)
    @Type(() => Number)
    maxAreaSize: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    minPrice: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    maxPrice: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(20)
    @Type(() => Number)
    minRoomsCount: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(20)
    @Type(() => Number)
    maxRoomsCount: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset: number;

    @IsOptional()
    @IsEnum(ApartmentStateFilter)
    state: ApartmentStateFilter = ApartmentStateFilter.Available;
}
