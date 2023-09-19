import { CreateBlogPostCommand } from '../implementation/create-blogpost.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentfulService } from 'src/blogpost/contentful-service';
import { createBlogPostFromEntry } from 'src/blogpost/services/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogpostHandler
  implements ICommandHandler<CreateBlogPostCommand>
{
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(command: CreateBlogPostCommand) {
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

    const blogPost = createBlogPostFromEntry(entry);

    return blogPost;
  }
}
