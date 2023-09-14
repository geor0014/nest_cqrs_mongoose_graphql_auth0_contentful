import { UpdateBlogPostCommand } from '../implementation/update-blogpost.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createContentfulClient } from 'src/blogpost/contentful.config';
import { CreateBlogPostFromEntry } from 'src/blogpost/helpers/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler
  implements ICommandHandler<UpdateBlogPostCommand>
{
  async execute(command: UpdateBlogPostCommand) {
    try {
      const client = await createContentfulClient();

      const entry = await client.getEntry(command.id);

      await entry.patch([
        {
          op: 'replace',
          path: 'fields/title',
          value: {
            'en-US': command.updateBlogPostDto.title,
          },
        },
        {
          op: 'replace',
          path: '/fields/content',
          value: {
            'en-US': command.updateBlogPostDto.content,
          },
        },
      ]);

      await entry.publish();

      const blogPost = CreateBlogPostFromEntry(entry);

      return blogPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }
}
