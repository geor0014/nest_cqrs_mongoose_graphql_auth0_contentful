import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { ContentfulService } from './contentful.config';

@Module({
  providers: [
    BlogPostResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ContentfulService,
  ],
  imports: [CqrsModule],
})
export class BlogpostModule {}
