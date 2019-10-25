import { JwtModuleOptions } from '@nestjs/jwt';

import * as config from 'config';

const jwtProjectConfig = config.get('jwt');

export const jwtConfig: JwtModuleOptions = {
    secret: process.env.JWT_SECRET || jwtProjectConfig.secret,
    signOptions: {
        expiresIn: jwtProjectConfig.expiresIn
    }
};
