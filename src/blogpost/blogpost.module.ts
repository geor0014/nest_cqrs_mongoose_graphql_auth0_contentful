import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostSchema } from './blogpost.schema';
import { BlogpostService } from './blogpost.service';
import { CreateBlogpostHandler } from './commands/handlers/create-blogpost.handler';
import { CqrsModule } from '@nestjs/cqrs';

export const CommandHandlers = [CreateBlogpostHandler];

@Module({
  providers: [BlogPostResolver, BlogpostService, ...CommandHandlers],
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
