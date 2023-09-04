import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogPostType } from './blogpost.type';
import { BlogpostService } from './blogpost.service';

@Resolver((of) => BlogPostType)
export class BlogPostResolver {
  constructor(private blogpostService: BlogpostService) {}
  @Query((returns) => BlogPostType)
  blogPost() {
    return {
      id: 'some-id',
      title: 'some-title',
      content: 'some-content',
    };
  }

  @Mutation((returns) => BlogPostType)
  createBlogPost() {}
}
