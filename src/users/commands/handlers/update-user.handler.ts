import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implementation/update-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import { Model } from 'mongoose';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, updateUserDto } = command;

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
