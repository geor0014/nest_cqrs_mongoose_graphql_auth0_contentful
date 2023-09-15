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
    try {
      return await this.queryBus.execute(new GetAllBlogPostsQuery());
    } catch (error) {
      console.log(' error in getblogposts resolver', error);
      throw new Error('error in getblogposts resolver');
    }
  }

  @Query((returns) => BlogPostType)
  async blogpostById(@Args('id') id: string): Promise<BlogPostType> {
    try {
      return await this.queryBus.execute(new GetBlogPostQuery(id));
    } catch (error) {
      console.log('error in blogpostById resolver', error);
      throw new Error('error in blogpostById resolver');
    }
  }

  @Mutation((returns) => BlogPostType)
  async createBlogPost(
    @Args('createBlogPostDto') createBlogPostDto: CreateBlogPostDto,
  ): Promise<BlogPostType> {
    try {
      return this.commandBus.execute(
        new CreateBlogPostCommand(createBlogPostDto),
      );
    } catch (error) {
      console.log('error in createBlogPost resolver', error);
      throw new Error('error in createBlogPost resolver');
    }
  }

  @Mutation((returns) => BlogPostType)
  async updateBlogPost(
    @Args('id') id: string,
    @Args('UpdateBlogPostDto') UpdateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPostType> {
    try {
      return this.commandBus.execute(
        new UpdateBlogPostCommand(id, UpdateBlogPostDto),
      );
    } catch (error) {
      console.log('error in updateBlogPost resolver', error);
      throw new Error('error in updateBlogPost resolver');
    }
  }

  @Mutation((returns) => BlogPostType)
  async deleteBlogPost(@Args('id') id: string) {
    try {
      return this.commandBus.execute(new DeleteBlogPostCommand(id));
    } catch (error) {
      console.log('error in deleteBlogPost resolver', error);
      throw new Error('error in deleteBlogPost resolver');
    }
  }

  @ResolveField('author', (returns) => UserType)
  async user(@Parent() blogpost: any): Promise<UserType> {
    try {
      return this.queryBus.execute(new GetUserQuery(blogpost.author));
    } catch (error) {
      console.log('error in user resolver', error);
      throw new Error('error in user resolver');
    }
  }
}
