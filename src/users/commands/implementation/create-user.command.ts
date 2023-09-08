import { CreateUserDto } from 'src/users/dto/create-user-dto';

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
