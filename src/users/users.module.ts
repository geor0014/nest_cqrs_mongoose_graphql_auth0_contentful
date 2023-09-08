import { Delete, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { BlogpostModule } from 'src/blogpost/blogpost.module';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';
import { getAllUsersHandler } from './queries/handlers/get-all-users.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { assignBlogPostToUserHandler } from './commands/handlers/assign-blogpost-to-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  assignBlogPostToUserHandler,
];
export const QueryHandlers = [getAllUsersHandler, GetUserHandler];

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
