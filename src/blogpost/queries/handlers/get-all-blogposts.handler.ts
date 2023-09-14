import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogPostsQuery } from '../implementation/get-all-blogposts.query';

import { createContentfulClient } from 'src/blogpost/contentful.config';

@QueryHandler(GetAllBlogPostsQuery)
export class GetAllBlogPostsHandler implements IQueryHandler {
  async execute(query: GetAllBlogPostsQuery): Promise<any> {
    try {
      const client = await createContentfulClient();

      const response = await client.getEntries({
        content_type: 'blogPost',
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
