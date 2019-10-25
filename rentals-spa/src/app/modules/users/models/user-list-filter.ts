import { UserRole } from './../../../models';

export interface UserListFilter {
    search?: string;
    role?: UserRole;
    limit?: number;
    offset?: number;
}
