import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getBlogPostQuery } from '../implementation/get-blogpost.query';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';

@QueryHandler(getBlogPostQuery)
export class GetBlogPostHandler implements IQueryHandler {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(query: getBlogPostQuery): Promise<BlogPost> {
    return this.blogPostModel.findById(query.id).exec();
  }
}
