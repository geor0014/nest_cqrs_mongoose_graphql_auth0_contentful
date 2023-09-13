import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManyBlogPostsQuery } from '../implementation/get-many-blogposts.query';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';

@QueryHandler(GetManyBlogPostsQuery)
export class GetManyBlogPostsHandler implements IQueryHandler {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(query: GetManyBlogPostsQuery) {
    const { user } = query;
    return await this.blogPostModel.find({ user: user._id }).exec();
  }
}
