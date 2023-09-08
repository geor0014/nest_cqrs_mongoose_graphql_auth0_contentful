import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly updateUserDto: UpdateUserDto,
  ) {}
}
