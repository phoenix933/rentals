import { IAuthModuleOptions } from '@nestjs/passport';

export const passportConfig: IAuthModuleOptions = {
    defaultStrategy: 'jwt'
};
