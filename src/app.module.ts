import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogpostModule } from './blogpost/blogpost.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
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
  ],
})
export class AppModule {}
