import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBlogPostCommand } from '../implementation/detele-blogpost.command';
import { createContentfulClient } from 'src/blogpost/contentful.config';
import { BlogPostType } from 'src/blogpost/blogpost.type';

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler
  implements ICommandHandler<DeleteBlogPostCommand>
{
  async execute(command: DeleteBlogPostCommand): Promise<BlogPostType> {
    try {
      const client = await createContentfulClient();

      const entry = await client.getEntry(command.id);
      const zoneIdentifier = 'en-US';

      const { fields } = entry;

      await entry.unpublish();

      entry.delete();

      const blogPost = {
        id: entry.sys.id,
        title: fields.title[zoneIdentifier],
        content: fields.content[zoneIdentifier],
        slug: fields.slug[zoneIdentifier],
        author: fields.author[zoneIdentifier],
      };

      return blogPost;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  }
}
