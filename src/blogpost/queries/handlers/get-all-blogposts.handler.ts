import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogPostsQuery } from '../implementation/get-all-blogposts.query';

import { ContentfulService } from 'src/blogpost/contentful.config';
import { createBlogPostFromEntry } from 'src/blogpost/services/craete-blogpost-from-contentful-entry.helper';

@QueryHandler(GetAllBlogPostsQuery)
export class GetAllBlogPostsHandler implements IQueryHandler {
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(query: GetAllBlogPostsQuery): Promise<any> {
    const response = await this.contentfulService.environment.getEntries({
      content_type: 'blogPost',
    });

    const { items } = response;

    const mappedItems = items.map((item) => {
      return createBlogPostFromEntry(item);
    });

    return mappedItems;
  }
}
