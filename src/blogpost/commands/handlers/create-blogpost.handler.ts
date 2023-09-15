import { CreateBlogPostCommand } from '../implementation/create-blogpost.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentfulService } from 'src/blogpost/contentful.config';
import { CreateBlogPostFromEntry } from 'src/blogpost/helpers/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogpostHandler
  implements ICommandHandler<CreateBlogPostCommand>
{
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(command: CreateBlogPostCommand) {
    try {
      const { title, content, slug, author } = command.createBlogPostDto;
      const entry = await this.contentfulService.environment.createEntry(
        'blogPost',
        {
          fields: {
            title: {
              'en-US': title,
            },
            content: {
              'en-US': content,
            },
            slug: {
              'en-US': slug,
            },
            author: {
              'en-US': author,
            },
          },
        },
      );

      await entry.publish();

      const blogPost = CreateBlogPostFromEntry(entry);

      return blogPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }
}
