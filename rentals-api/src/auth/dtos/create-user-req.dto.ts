import { IsEnum } from 'class-validator';

import { UserRole } from '../enums';
import { BaseCreateUserReqDto } from './base-create-user-req.dto';

export class CreateUserReqDto extends BaseCreateUserReqDto {
    @IsEnum(UserRole)
    role: UserRole;
}
