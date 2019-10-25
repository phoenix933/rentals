import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApartmentsModule } from './apartments/apartments.module';
import { AuthModule } from './auth/auth.module';

import { typeormConfig } from './config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),

        ApartmentsModule,
        AuthModule
    ],
})
export class AppModule {}
