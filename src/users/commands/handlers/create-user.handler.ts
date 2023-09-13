import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implementation/create-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import { Model } from 'mongoose';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const newUser = new this.userModel(command.createUserDto);
    return newUser.save();
  }
}
