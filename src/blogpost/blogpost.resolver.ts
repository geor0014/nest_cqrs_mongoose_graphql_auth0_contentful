import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BlogPostType } from './blogpost.type';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';
import { UpdateBlogPostDto } from './dto/update-blogpost-dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogPostCommand } from './commands/implementation/create-blogpost.command';
import { UpdateBlogPostCommand } from './commands/implementation/update-blogpost.command';
import { DeleteBlogPostCommand } from './commands/implementation/detele-blogpost.command';
import { GetAllBlogPostsQuery } from './queries/implementation/get-all-blogposts.query';
import { GetBlogPostQuery } from './queries/implementation/get-blogpost.query';
import { GetUserQuery } from 'src/users/queries/implementation/get-user.query';
import { UserType } from 'src/users/user.type';

@Resolver((of) => BlogPostType)
export class BlogPostResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query((returns) => [BlogPostType])
  async getblogposts(): Promise<BlogPostType[]> {
    return await this.queryBus.execute(new GetAllBlogPostsQuery());
  }

  @Query((returns) => BlogPostType)
  async blogpostById(@Args('id') id: string): Promise<BlogPostType> {
    return await this.queryBus.execute(new GetBlogPostQuery(id));
  }

  @Mutation((returns) => BlogPostType)
  async createBlogPost(
    @Args('createBlogPostDto') createBlogPostDto: CreateBlogPostDto,
  ): Promise<BlogPostType> {
    return this.commandBus.execute(
      new CreateBlogPostCommand(createBlogPostDto),
    );
  }

  @Mutation((returns) => BlogPostType)
  async updateBlogPost(
    @Args('id') id: string,
    @Args('UpdateBlogPostDto') UpdateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPostType> {
    return this.commandBus.execute(
      new UpdateBlogPostCommand(id, UpdateBlogPostDto),
    );
  }

  @Mutation((returns) => BlogPostType)
  async deleteBlogPost(@Args('id') id: string) {
    return this.commandBus.execute(new DeleteBlogPostCommand(id));
  }

  @ResolveField('author', (returns) => UserType)
  async user(@Parent() blogpost: any): Promise<UserType> {
    return this.queryBus.execute(new GetUserQuery(blogpost.author));
  }
}
