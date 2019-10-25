
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtConfig, passportConfig } from './config';
import { controllers } from './controllers';
import { guards } from './guards';
import { repositories } from './repositories';
import { services } from './services';
import { strategies, JwtStrategy } from './strategies';

@Module({
    imports: [
        PassportModule.register(passportConfig),
        JwtModule.register(jwtConfig),
        TypeOrmModule.forFeature([
            ...repositories
        ])
    ],
    providers: [
        ...guards,
        ...services,
        ...strategies
    ],
    controllers: [
        ...controllers
    ],
    exports: [
        PassportModule,
        JwtStrategy
    ]
})
export class AuthModule {}
