import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';

import { BlogpostModule } from './blogpost/blogpost.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CheckIfUserIsRegistered } from './middleware/check-if-user-is-registered.middleware';
import { CqrsModule } from '@nestjs/cqrs';
import { CommercialToolsModule } from './commercialtools/commercialtools.module';
require('dotenv').config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BlogpostModule,
    UsersModule,
    AuthModule,
    CqrsModule,
    CommercialToolsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CheckIfUserIsRegistered)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
