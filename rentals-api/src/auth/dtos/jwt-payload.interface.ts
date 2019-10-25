import { UserRole } from '../enums';

export interface JwtPaylaod {
    username: string;
    role: UserRole;
}
