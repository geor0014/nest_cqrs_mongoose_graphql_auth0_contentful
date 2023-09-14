import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManyBlogPostsQuery } from '../implementation/get-many-blogposts.query';
import { createContentfulClient } from 'src/blogpost/contentful.config';

@QueryHandler(GetManyBlogPostsQuery)
export class GetManyBlogPostsHandler implements IQueryHandler {
  constructor() {} // @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,

  async execute(query: GetManyBlogPostsQuery) {
    try {
      const { user } = query;
      const client = await createContentfulClient();

      const response = await client.getEntries({
        content_type: 'blogPost',
        'fields.author': user._id.valueOf(),
      });

      const { items } = response;

      const zoneIdentifier = 'en-US';

      const mappedItems = items.map((item) => {
        return {
          id: item.sys.id,
          title: item.fields.title[zoneIdentifier],
          slug: item.fields.slug[zoneIdentifier],
          content: item.fields.content[zoneIdentifier],
          author: item.fields.author[zoneIdentifier],
        };
      });
      return mappedItems;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw new Error('Failed to fetch blog posts');
    }
  }
}
