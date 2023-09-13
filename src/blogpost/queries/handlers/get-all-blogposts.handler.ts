import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogPostsQuery } from '../implementation/get-all-blogposts.query';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';

@QueryHandler(GetAllBlogPostsQuery)
export class GetAllBlogPostsHandler implements IQueryHandler {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(query: GetAllBlogPostsQuery): Promise<BlogPost[]> {
    return this.blogPostModel.find().exec();
  }
}
