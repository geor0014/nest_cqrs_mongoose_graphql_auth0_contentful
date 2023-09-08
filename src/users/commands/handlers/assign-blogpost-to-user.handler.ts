import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import { Model } from 'mongoose';
import { assignBlogPostToUserCommand } from '../implementation/assign-blogpost-to-user.command';

@CommandHandler(assignBlogPostToUserCommand)
export class assignBlogPostToUserHandler implements ICommandHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: assignBlogPostToUserCommand) {
    const { userId, blogPosts } = command.assignBlogPostToUserDto;
    const user = await this.userModel.findById(userId).exec();
    user.blogPosts = [...user.blogPosts, ...blogPosts];
    return user.save();
  }
}
