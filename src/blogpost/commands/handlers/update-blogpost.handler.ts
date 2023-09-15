import { UpdateBlogPostCommand } from '../implementation/update-blogpost.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentfulService } from 'src/blogpost/contentful.config';
import { CreateBlogPostFromEntry } from 'src/blogpost/helpers/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler
  implements ICommandHandler<UpdateBlogPostCommand>
{
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(command: UpdateBlogPostCommand) {
    const entry = await this.contentfulService.environment.getEntry(command.id);
    console.log(entry);

    const body = [];
    if (command.updateBlogPostDto.title)
      body.push({
        op: 'replace',
        path: '/fields/title',
        value: {
          'en-US': command.updateBlogPostDto.title,
        },
      });

    if (command.updateBlogPostDto.content)
      body.push({
        op: 'replace',
        path: '/fields/content',
        value: {
          'en-US': command.updateBlogPostDto.content,
        },
      });

    await entry.patch(body);
    await entry.publish();

    const blogPost = CreateBlogPostFromEntry(entry);

    return blogPost;

    return { title: 'foo', content: 'bar', slug: 'test', author: 'reza' };
  }
}
