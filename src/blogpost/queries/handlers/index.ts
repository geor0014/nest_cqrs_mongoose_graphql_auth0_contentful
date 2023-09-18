import { DeleteBlogPostHandler } from 'src/blogpost/commands/handlers/delete-blogpost.handler';
import { GetAllBlogPostsHandler } from './get-all-blogposts.handler';
import { GetBlogPostHandler } from './get-blogpost.handler';
import { GetManyBlogPostsHandler } from './get-many-blogposts.handler';

export const QueryHandlers = [
  GetAllBlogPostsHandler,
  GetBlogPostHandler,
  GetManyBlogPostsHandler,
  DeleteBlogPostHandler,
];
