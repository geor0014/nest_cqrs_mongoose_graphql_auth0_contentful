import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../implementation/delete-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import { Model } from 'mongoose';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const { id } = command;
    return this.userModel.findByIdAndDelete(id);
  }
}
