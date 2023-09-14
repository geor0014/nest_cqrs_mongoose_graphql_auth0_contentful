import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManyBlogPostsQuery } from '../implementation/get-many-blogposts.query';
import { createContentfulClient } from 'src/blogpost/contentful.config';
import { log } from 'console';

@QueryHandler(GetManyBlogPostsQuery)
export class GetManyBlogPostsHandler implements IQueryHandler {
  constructor() {} // @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,

  async execute(query: GetManyBlogPostsQuery) {
    const { user } = query;
    const client = await createContentfulClient();

    //  get only the entries that have author asme as the user.token
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.author': user._id.valueOf(),
    });

    return entries.items;
  }
}
