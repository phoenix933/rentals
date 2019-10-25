import { UserRole } from '../enums';

export class UserResDto {
    id: number;
    username: string;
    role: UserRole;
}
