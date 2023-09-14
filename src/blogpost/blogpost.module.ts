import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';
import { CreateBlogpostHandler } from './commands/handlers/create-blogpost.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateBlogPostHandler } from './commands/handlers/update-blogpost.handler';
import { GetAllBlogPostsHandler } from './queries/handlers/get-all-blogposts.handler';
import { GetBlogPostHandler } from './queries/handlers/get-blogpost.handler';
import { GetManyBlogPostsHandler } from './queries/handlers/get-many-blogposts.handler';
import { DeleteBlogPostHandler } from './commands/handlers/delete-blogpost.handler';

export const CommandHandlers = [CreateBlogpostHandler, UpdateBlogPostHandler];
export const QueryHandlers = [
  GetAllBlogPostsHandler,
  GetBlogPostHandler,
  GetManyBlogPostsHandler,
  DeleteBlogPostHandler,
];

@Module({
  providers: [BlogPostResolver, ...CommandHandlers, ...QueryHandlers],
  imports: [CqrsModule],
})
export class BlogpostModule {}
