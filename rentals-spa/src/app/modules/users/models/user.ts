import { UserRole } from './../../../models';

export interface User {
    id: string;
    username: string;
    role: UserRole;
}
