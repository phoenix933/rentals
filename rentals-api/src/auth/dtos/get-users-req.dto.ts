import { IsOptional, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

import { UserRole } from '../enums';

export class GetUsersReqDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    offset: number;
}
