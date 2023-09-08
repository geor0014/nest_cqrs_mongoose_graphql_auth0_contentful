import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BlogPostType } from './blogpost.type';
import { BlogpostService } from './blogpost.service';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';
import { UpdateBlogPostDto } from './dto/update-blogpost-dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogPostCommand } from './commands/implementation/create-blogpost.command';
import { UpdateBlogPostCommand } from './commands/implementation/update-blogpost.command';
import { DeleteBlogPostCommand } from './commands/implementation/detele-blogpost.command';
import { getAllBlogPostsQuery } from './queries/implementation/get-all-blogposts.query';
import { getBlogPostQuery } from './queries/implementation/get-blogpost.query';
import { GetUserQuery } from 'src/users/queries/implementation/get-user.query';
import { BlogPost } from './blogpost.schema';
import { UserType } from 'src/users/user.type';

@Resolver((of) => BlogPostType)
export class BlogPostResolver {
  constructor(
    private blogpostService: BlogpostService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query((returns) => [BlogPostType])
  getblogposts() {
    return this.queryBus.execute(new getAllBlogPostsQuery());
  }

  @Query((returns) => BlogPostType)
  blogpostById(@Args('id') id: string) {
    return this.queryBus.execute(new getBlogPostQuery(id));
  }

  @Mutation((returns) => BlogPostType)
  createBlogPost(
    @Args('createBlogPostDto') createBlogPostDto: CreateBlogPostDto,
  ) {
    return this.commandBus.execute(
      new CreateBlogPostCommand(createBlogPostDto),
    );
  }

  @Mutation((returns) => BlogPostType)
  updateBlogPost(
    @Args('id') id: string,
    @Args('UpdateBlogPostDto') UpdateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.commandBus.execute(
      new UpdateBlogPostCommand(id, UpdateBlogPostDto),
    );
  }

  @Mutation((returns) => BlogPostType)
  deleteBlogPost(@Args('id') id: string) {
    this.commandBus.execute(new DeleteBlogPostCommand(id));
  }

  @ResolveField('user', (returns) => UserType)
  async user(@Parent() blogpost: BlogPost): Promise<UserType> {
    return this.queryBus.execute(new GetUserQuery(blogpost.user));
  }
}
