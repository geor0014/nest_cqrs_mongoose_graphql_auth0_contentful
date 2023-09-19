import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBlogPostQuery } from '../implementation/get-blogpost.query';
import { ContentfulService } from 'src/blogpost/contentful-service';
import { createBlogPostFromEntry } from 'src/blogpost/services/craete-blogpost-from-contentful-entry.helper';

@QueryHandler(GetBlogPostQuery)
export class GetBlogPostHandler implements IQueryHandler {
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(query: GetBlogPostQuery) {
    const response = await this.contentfulService.environment.getEntry(
      query.id,
    );
    const blogpost = createBlogPostFromEntry(response);
    return blogpost;
  }
}
