import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogPostType } from './blogpost.type';
import { BlogpostService } from './blogpost.service';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';

@Resolver((of) => BlogPostType)
export class BlogPostResolver {
  constructor(private blogpostService: BlogpostService) {}

  @Query((returns) => [BlogPostType])
  blogposts() {
    return this.blogpostService.getAllBlogPosts();
  }

  @Query((returns) => BlogPostType)
  blogpost(@Args('id') id: string) {
    return this.blogpostService.getBlogPost(id);
  }

  @Mutation((returns) => BlogPostType)
  createBlogPost(
    @Args('createBlogPostDto') createBlogPostDto: CreateBlogPostDto,
  ) {
    return this.blogpostService.createBlogPost(createBlogPostDto);
  }
}
