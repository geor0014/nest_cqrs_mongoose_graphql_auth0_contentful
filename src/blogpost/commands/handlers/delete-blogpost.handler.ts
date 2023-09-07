import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { DeleteBlogPostCommand } from '../implementation/detele-blogpost.command';

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler
  implements ICommandHandler<DeleteBlogPostCommand>
{
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(command: DeleteBlogPostCommand) {
    const deletedBlogPost = await this.blogPostModel.findByIdAndDelete(
      command.id,
    );
  }
}
