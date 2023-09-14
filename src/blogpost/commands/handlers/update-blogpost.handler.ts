import { UpdateBlogPostCommand } from '../implementation/update-blogpost.command';
import { InjectModel } from '@nestjs/mongoose';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createContentfulClient } from 'src/blogpost/contentful.config';
import { application } from 'express';

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler
  implements ICommandHandler<UpdateBlogPostCommand>
{
  async execute(command: UpdateBlogPostCommand) {
    try {
      const client = await createContentfulClient();

      const entry = await client.getEntry(command.id);

      const zoneIdentifier = 'en-US';

      await entry.patch([
        {
          op: 'replace',
          path: 'fields/title',
          value: {
            zoneIdentifier: command.updateBlogPostDto.title,
          },
        },
        {
          op: 'replace',
          path: '/fields/content',
          value: {
            zoneIdentifier: command.updateBlogPostDto.content,
          },
        },
      ]);

      console.log('entry', entry.fields);

      const { fields } = entry;

      const blogPost = {
        id: entry.sys.id,
        title: fields.title[zoneIdentifier],
        content: fields.content[zoneIdentifier],
        slug: fields.slug[zoneIdentifier],
        author: fields.author[zoneIdentifier],
      };

      return blogPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }
}
