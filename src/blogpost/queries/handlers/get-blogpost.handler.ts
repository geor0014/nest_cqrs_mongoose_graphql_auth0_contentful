import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBlogPostQuery } from '../implementation/get-blogpost.query';
import { ContentfulService } from 'src/blogpost/contentful.config';

@QueryHandler(GetBlogPostQuery)
export class GetBlogPostHandler implements IQueryHandler {
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(query: GetBlogPostQuery) {
    try {
      const response = await this.contentfulService.environment.getEntry(
        query.id,
      );
      const { fields } = response;
      const zoneIdentifier = 'en-US';
      const blogpost = {
        id: response.sys.id,
        title: fields.title[zoneIdentifier],
        slug: fields.slug[zoneIdentifier],
        content: fields.content[zoneIdentifier],
        author: fields.author[zoneIdentifier],
      };
      return blogpost;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw new Error('Failed to fetch blog post');
    }
  }
}
