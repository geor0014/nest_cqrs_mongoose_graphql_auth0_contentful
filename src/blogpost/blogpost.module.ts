import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostSchema } from './blogpost.schema';
import { BlogpostService } from './blogpost.service';
import { CreateBlogpostHandler } from './commands/handlers/create-blogpost.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateBlogPostHandler } from './commands/handlers/update-blogpost.handler';
import { GetAllBlogPostsHandler } from './queries/handlers/get-all-blogposts.handler';

export const CommandHandlers = [CreateBlogpostHandler, UpdateBlogPostHandler];
export const QueryHandlers = [GetAllBlogPostsHandler];

@Module({
  providers: [
    BlogPostResolver,
    BlogpostService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BlogPost',
        schema: BlogPostSchema,
      },
    ]),
    CqrsModule,
  ],
  exports: [BlogpostService],
})
export class BlogpostModule {}
