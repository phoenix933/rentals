import { UserRole } from '../enums';

export interface ICreateUserReq {
    username: string;
    password: string;
    role?: UserRole;
}
