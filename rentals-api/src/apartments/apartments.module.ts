import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { controllers } from './controllers';
import { services } from './services';
import { repositories } from './repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ...repositories
        ]),

        AuthModule
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services
    ]
})
export class ApartmentsModule {}
