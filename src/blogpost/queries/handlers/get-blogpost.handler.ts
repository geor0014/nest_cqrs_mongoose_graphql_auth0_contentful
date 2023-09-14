import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBlogPostQuery } from '../implementation/get-blogpost.query';
import { InjectModel } from '@nestjs/mongoose';
// import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';
import { createContentfulClient } from 'src/blogpost/contentful.config';

@QueryHandler(GetBlogPostQuery)
export class GetBlogPostHandler implements IQueryHandler {
  async execute(query: GetBlogPostQuery) {
    const client = await createContentfulClient();
    return await client.getEntry(query.id);
  }
}
