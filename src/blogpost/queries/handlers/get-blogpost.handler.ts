import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBlogPostQuery } from '../implementation/get-blogpost.query';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';

@QueryHandler(GetBlogPostQuery)
export class GetBlogPostHandler implements IQueryHandler {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(query: GetBlogPostQuery): Promise<BlogPost> {
    return this.blogPostModel.findById(query.id).exec();
  }
}
