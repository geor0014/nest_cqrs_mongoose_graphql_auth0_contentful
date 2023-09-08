import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserType } from './user.type';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AssignBlogPostToUserDto } from './dto/assign-blogpost-to-user-dto';
import { User } from './user.schema';
import { BlogpostService } from 'src/blogpost/blogpost.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/auth/local_guard';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/implementation/create-user.command';
import { UpdateUserCommand } from './commands/implementation/update-user.command';
import { DeleteUserCommand } from './commands/implementation/delete-user.command';
import { getAllUsersQuery } from './queries/implementation/get-all-users.query';
import { GetUserQuery } from './queries/implementation/get-user.query';

@Resolver((of) => UserType)
// @UseGuards(LocalGuard)
export class UserResolver {
  constructor(
    private userService: UsersService,
    private blogPostService: BlogpostService,
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
  getUserById(@Args('id') id: string): Promise<User> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Mutation((returns) => UserType)
  assignBlogPostToUser(
    @Args('assignBlogPostToUserDto')
    assignBlogPostToUserDto: AssignBlogPostToUserDto,
  ): Promise<User> {
    const { userId, blogPosts } = assignBlogPostToUserDto;
    return this.userService.assignBlogPostToUser(userId, blogPosts);
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

  @ResolveField()
  async blogPosts(@Parent() user: User): Promise<BlogPost[]> {
    return this.blogPostService.getManyBlogPosts(user.blogPosts);
  }
}
