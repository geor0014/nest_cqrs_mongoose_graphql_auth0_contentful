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
import { LocalGuard } from 'src/auth/local-guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/implementation/create-user.command';
import { UpdateUserCommand } from './commands/implementation/update-user.command';
import { DeleteUserCommand } from './commands/implementation/delete-user.command';
import { GetAllUsersQuery } from './queries/implementation/get-all-users.query';
import { GetUserQuery } from './queries/implementation/get-user.query';
import { GetManyBlogPostsQuery } from 'src/blogpost/queries/implementation/get-many-blogposts.query';
import { BlogPostType } from 'src/blogpost/blogpost.type';
import { GetUserByTokenQuery } from './queries/implementation/get-user-by-token.query';

@Resolver((of) => UserType)
// @UseGuards(LocalGuard)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((returns) => UserType)
  async createUser(@Args('User') CreateUserDto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(CreateUserDto));
  }

  @Query((returns) => [UserType])
  async getUsers(): Promise<User[]> {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Query((returns) => UserType)
  async getUserById(@Args('id') id: string): Promise<UserType> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Query((returns) => UserType)
  async getUserByToken(@Args('token') token: string): Promise<UserType> {
    return await this.queryBus.execute(new GetUserByTokenQuery(token));
  }

  @Mutation((returns) => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('UpdateUserDto') UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, UpdateUserDto));
  }

  @Mutation((returns) => UserType)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @ResolveField('blogposts', (returns) => [BlogPostType])
  async getBlogPost(@Parent() user: UserType): Promise<BlogPostType[]> {
    return this.queryBus.execute(new GetManyBlogPostsQuery(user));
  }
}
