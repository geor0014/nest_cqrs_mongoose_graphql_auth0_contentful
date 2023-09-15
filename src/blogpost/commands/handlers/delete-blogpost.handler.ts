import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBlogPostCommand } from '../implementation/detele-blogpost.command';
import { ContentfulService } from 'src/blogpost/contentful.config';
import { BlogPostType } from 'src/blogpost/blogpost.type';
import { createBlogPostFromEntry } from 'src/blogpost/services/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler
  implements ICommandHandler<DeleteBlogPostCommand>
{
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(command: DeleteBlogPostCommand): Promise<BlogPostType> {
    const entry = await this.contentfulService.environment.getEntry(command.id);

    await entry.unpublish();

    entry.delete();

    const blogPost = createBlogPostFromEntry(entry);

    return blogPost;
  }
}
