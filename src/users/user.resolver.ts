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
}
