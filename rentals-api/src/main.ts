import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import * as config from 'config';

import { AppModule } from './app.module';

const serverConfig = config.get('server');

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);

    logger.log(`App listening on port ${port}..`);
}

bootstrap();
