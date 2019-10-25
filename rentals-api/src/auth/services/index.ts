import { AuthService } from './auth.service';
import { UsersService } from './users.service';

export const services = [
    AuthService,
    UsersService
];

export * from './auth.service';
export * from './users.service';
