import { User } from './user';

export interface GetUsersRes {
    count: number;
    users: User[];
}
