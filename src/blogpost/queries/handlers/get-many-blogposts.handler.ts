import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManyBlogPostsQuery } from '../implementation/get-many-blogposts.query';
import { ContentfulService } from 'src/blogpost/contentful.config';
import { createBlogPostFromEntry } from 'src/blogpost/services/craete-blogpost-from-contentful-entry.helper';

@QueryHandler(GetManyBlogPostsQuery)
export class GetManyBlogPostsHandler implements IQueryHandler {
  constructor(private readonly contentfulService: ContentfulService) {}

  async execute(query: GetManyBlogPostsQuery) {
    const { user } = query;

    const response = await this.contentfulService.environment.getEntries({
      content_type: 'blogPost',
      'fields.author': user._id.valueOf(),
    });

    const { items } = response;

    const mappedItems = items.map((item) => {
      return createBlogPostFromEntry(item);
    });
    return mappedItems;
  }
}
