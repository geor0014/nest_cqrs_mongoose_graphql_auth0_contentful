import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManyBlogPostsQuery } from '../implementation/get-many-blogposts.query';
import { ContentfulService } from 'src/blogpost/contentful.config';

@QueryHandler(GetManyBlogPostsQuery)
export class GetManyBlogPostsHandler implements IQueryHandler {
  constructor(private readonly contentfulService: ContentfulService) {}

  async execute(query: GetManyBlogPostsQuery) {
    try {
      const { user } = query;

      const response = await this.contentfulService.environment.getEntries({
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
