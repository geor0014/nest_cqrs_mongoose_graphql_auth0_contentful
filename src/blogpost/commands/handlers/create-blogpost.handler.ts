import { CreateBlogPostCommand } from '../implementation/create-blogpost.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createContentfulClient } from 'src/blogpost/contentful.config';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogpostHandler
  implements ICommandHandler<CreateBlogPostCommand>
{
  constructor() {} // @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  async execute(command: CreateBlogPostCommand) {
    try {
      const client = await createContentfulClient();
      const zoneIdentifier = 'en-US';

      const createdBlogPost = await client.createEntry('blogPost', {
        fields: {
          title: {
            'en-US': command.createBlogPostDto.title,
          },
          content: {
            'en-US': command.createBlogPostDto.content,
          },
          slug: {
            'en-US': command.createBlogPostDto.slug,
          },
          author: {
            'en-US': command.createBlogPostDto.author,
          },
        },
      });

      await createdBlogPost.publish();

      const { fields } = createdBlogPost;

      const blogPost = {
        id: createdBlogPost.sys.id,
        title: fields.title[zoneIdentifier],
        content: fields.content[zoneIdentifier],
        slug: fields.slug[zoneIdentifier],
        author: fields.author[zoneIdentifier],
      };

      return blogPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }
}
