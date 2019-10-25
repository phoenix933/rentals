import { UserRole } from './user-role.enum';

export interface AppUser {
    id: number;
    username: string;
    role: UserRole;
    token: string;
}
