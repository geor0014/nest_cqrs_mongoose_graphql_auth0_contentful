import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getAllBlogPostsQuery } from '../implementation/get-all-blogposts.query';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';

@QueryHandler(getAllBlogPostsQuery)
export class GetAllBlogPostsHandler implements IQueryHandler {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async execute(query: getAllBlogPostsQuery) {
    return this.blogPostModel.find().exec();
  }
}
