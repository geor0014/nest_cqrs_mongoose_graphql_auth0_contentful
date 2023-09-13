import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { auth0_config } from './auth/auth0.config';
import { Check } from 'typeorm';
import { CheckIfUserIsRegistered } from './middleware/check-if-user-is-registered.middleware';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0_config));
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
