import { IsIn } from 'class-validator';

import { UserRole } from '../enums';
import { BaseCreateUserReqDto } from './base-create-user-req.dto';

export class RegisterReqDto extends BaseCreateUserReqDto {
    @IsIn([ UserRole.Client, UserRole.Realtor ])
    role: UserRole;
}
