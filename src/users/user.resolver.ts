import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Mutation((returns) => UserType)
  createUser(@Args('createUserDto') CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @Query((returns) => [UserType])
  getUsers() {
    return this.userService.getUsers();
  }

  @Query((returns) => UserType)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }
}
