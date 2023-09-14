import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBlogPostCommand } from '../implementation/detele-blogpost.command';
import { createContentfulClient } from 'src/blogpost/contentful.config';
import { BlogPostType } from 'src/blogpost/blogpost.type';
import { CreateBlogPostFromEntry } from 'src/blogpost/helpers/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(DeleteBlogPostCommand)
export class DeleteBlogPostHandler
  implements ICommandHandler<DeleteBlogPostCommand>
{
  async execute(command: DeleteBlogPostCommand): Promise<BlogPostType> {
    try {
      const client = await createContentfulClient();

      const entry = await client.getEntry(command.id);

      await entry.unpublish();

      entry.delete();

      const blogPost = CreateBlogPostFromEntry(entry);

      return blogPost;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  }
}
