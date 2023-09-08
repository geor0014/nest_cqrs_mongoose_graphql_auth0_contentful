import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { BlogpostModule } from 'src/blogpost/blogpost.module';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';

export const CommandHandlers = [CreateUserHandler, UpdateUserHandler];
export const QueryHandlers = [];

@Module({
  providers: [UsersService, UserResolver, ...CommandHandlers, ...QueryHandlers],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    CqrsModule,
    BlogpostModule,
  ],
})
export class UsersModule {}
