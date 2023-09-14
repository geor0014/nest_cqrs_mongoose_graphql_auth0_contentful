import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogPostsQuery } from '../implementation/get-all-blogposts.query';
import { InjectModel } from '@nestjs/mongoose';
// import { BlogPost } from 'src/blogpost/blogpost.schema';
import { Model } from 'mongoose';
import { createContentfulClient } from 'src/blogpost/contentful.config';

@QueryHandler(GetAllBlogPostsQuery)
export class GetAllBlogPostsHandler implements IQueryHandler {
  async execute(query: GetAllBlogPostsQuery): Promise<any> {
    const client = await createContentfulClient();
    const { items } = await client.getEntries({
      content_type: 'blogPost',
    });

    return items;
  }
}
