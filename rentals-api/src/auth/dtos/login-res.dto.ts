import { UserRole } from '../enums';

export class LoginResDto {
    id: number;
    token: string;
    username: string;
    role: UserRole;
}
