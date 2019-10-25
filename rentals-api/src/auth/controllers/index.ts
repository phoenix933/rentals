import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';

export const controllers = [
    AuthController,
    UsersController
];

export * from './auth.controller';
export * from './users.controller';
