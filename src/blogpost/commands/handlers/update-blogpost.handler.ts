import { UpdateBlogPostCommand } from '../implementation/update-blogpost.command';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler
  implements ICommandHandler<UpdateBlogPostCommand>
{
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(command: UpdateBlogPostCommand): Promise<BlogPost> {
    const updatedBlogPost = await this.blogPostModel.findByIdAndUpdate(
      command.id,
      command.updateBlogPostDto,
      { new: true },
    );
    return updatedBlogPost;
  }
}
