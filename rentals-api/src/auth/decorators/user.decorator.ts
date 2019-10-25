import { createParamDecorator } from '@nestjs/common';

import { UserEntity } from '../entities';

export const User = createParamDecorator((data, req): UserEntity => req.user);
