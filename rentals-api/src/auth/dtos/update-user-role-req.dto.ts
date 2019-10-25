import { IsEnum } from 'class-validator';

import { UserRole } from '../enums';

export class UpdateUserRoleReqDto {
    @IsEnum(UserRole)
    role: UserRole;
}
