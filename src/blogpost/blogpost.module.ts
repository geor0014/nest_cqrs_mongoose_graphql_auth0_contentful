import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  providers: [BlogPostResolver, ...CommandHandlers, ...QueryHandlers],
  imports: [CqrsModule],
})
export class BlogpostModule {}
