import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogPostCommand } from '../implementation/create-blogpost.command';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogpostHandler
  implements ICommandHandler<CreateBlogPostCommand>
{
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}
  async execute(command: CreateBlogPostCommand): Promise<BlogPost> {
    const newBlogPost = new this.blogPostModel(command.createBlogPostDto);
    return newBlogPost.save();
  }
}
