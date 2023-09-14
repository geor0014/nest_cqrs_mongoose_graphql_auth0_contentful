import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogPostCommand } from '../implementation/create-blogpost.command';
// import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createContentfulClient } from 'src/blogpost/contentful.config';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogpostHandler
  implements ICommandHandler<CreateBlogPostCommand>
{
  constructor() {} // @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  async execute(command: CreateBlogPostCommand) {
    // const newBlogPost = new this.blogPostModel(command.createBlogPostDto);
    // return newBlogPost.save();
    const client = await createContentfulClient();
  }
}
