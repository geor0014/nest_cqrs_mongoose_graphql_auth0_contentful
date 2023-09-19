import { UpdateBlogPostCommand } from '../implementation/update-blogpost.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentfulService } from 'src/blogpost/contentful-service';
import { createBlogPostFromEntry } from 'src/blogpost/services/craete-blogpost-from-contentful-entry.helper';

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler
  implements ICommandHandler<UpdateBlogPostCommand>
{
  constructor(private readonly contentfulService: ContentfulService) {}
  async execute(command: UpdateBlogPostCommand) {
    const entry = await this.contentfulService.environment.getEntry(command.id);

    // destructuring the fields object
    const { title, content, slug } = entry.fields;

    title['en-US'] = command.updateBlogPostDto.title;
    content['en-US'] = command.updateBlogPostDto.content;
    // convert the title to a slug and replace spaces with dashes and remove any special characters and make it lowercase
    slug['en-US'] = command.updateBlogPostDto.title
      .toLocaleLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-');

    const updatedEntry = await entry.update();

    await updatedEntry.publish();

    const blogPost = createBlogPostFromEntry(entry);

    return blogPost;
  }
}
