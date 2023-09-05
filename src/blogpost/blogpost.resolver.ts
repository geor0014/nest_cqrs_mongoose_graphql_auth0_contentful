import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogPostType } from './blogpost.type';
import { BlogpostService } from './blogpost.service';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';
import { UpdateBlogPostDto } from './dto/update-blogpost-dto';

@Resolver((of) => BlogPostType)
export class BlogPostResolver {
  constructor(private blogpostService: BlogpostService) {}

  @Query((returns) => [BlogPostType])
  getblogposts() {
    return this.blogpostService.getAllBlogPosts();
  }

  @Query((returns) => BlogPostType)
  blogpostById(@Args('id') id: string) {
    return this.blogpostService.getBlogPost(id);
  }

  @Mutation((returns) => BlogPostType)
  createBlogPost(
    @Args('createBlogPostDto') createBlogPostDto: CreateBlogPostDto,
  ) {
    return this.blogpostService.createBlogPost(createBlogPostDto);
  }

  @Mutation((returns) => BlogPostType)
  updateBlogPost(
    @Args('id') id: string,
    @Args('UpdateBlogPostDto') UpdateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogpostService.updateBlogPost(id, UpdateBlogPostDto);
  }

  @Mutation((returns) => BlogPostType)
  deleteBlogPost(@Args('id') id: string) {
    return this.blogpostService.deleteBlogPost(id);
  }
}
