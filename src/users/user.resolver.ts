import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserType } from './user.type';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/auth/local_guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/implementation/create-user.command';
import { UpdateUserCommand } from './commands/implementation/update-user.command';
import { DeleteUserCommand } from './commands/implementation/delete-user.command';
import { getAllUsersQuery } from './queries/implementation/get-all-users.query';
import { GetUserQuery } from './queries/implementation/get-user.query';
import { getManyBlogPostsQuery } from 'src/blogpost/queries/implementation/get-many-blogposts.query';
import { BlogPostType } from 'src/blogpost/blogpost.type';

@Resolver((of) => UserType)
// @UseGuards(LocalGuard)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((returns) => UserType)
  createUser(
    @Args('createUserDto') CreateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(CreateUserDto));
  }

  @Query((returns) => [UserType])
  getUsers(): Promise<User[]> {
    return this.queryBus.execute(new getAllUsersQuery());
  }

  @Query((returns) => UserType)
  getUserById(@Args('id') id: string): Promise<UserType> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Mutation((returns) => UserType)
  updateUser(
    @Args('id') id: string,
    @Args('UpdateUserDto') UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, UpdateUserDto));
  }

  @Mutation((returns) => UserType)
  deleteUser(@Args('id') id: string): Promise<User> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @ResolveField('blogposts', (returns) => [BlogPostType])
  async getBlogPost(@Parent() user: UserType): Promise<BlogPostType[]> {
    return this.queryBus.execute(new getManyBlogPostsQuery(user));
  }
}
