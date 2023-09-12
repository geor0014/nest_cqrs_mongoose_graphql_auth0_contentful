import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth, ConfigParams } from 'express-openid-connect';
require('dotenv').config();

const config: ConfigParams = {
  auth0Logout: true,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email offline_access',
    audience: process.env.AUTH0_AUDIENCE,
  },
  authRequired: false,
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    login: '/login',
    logout: '/logout',
    callback: '/callback',
  },
  secret: process.env.AUTH0_SECRET,
  session: {
    name: 'appSession',
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      domain: 'localhost',
    },
  },
  async afterCallback(req, res, session, decodedState) {
    let userData;
    try {
      const user = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}userinfo`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          audience: process.env.AUTH0_AUDIENCE,
        },
      });
      userData = await user.json();
    } catch (error) {
      console.error(error);
    }

    return {
      ...session,
      userData,
    };
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(config));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
