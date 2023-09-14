import { CreateBlogpostHandler } from './create-blogpost.handler';
import { DeleteBlogPostHandler } from './delete-blogpost.handler';
import { UpdateBlogPostHandler } from './update-blogpost.handler';

export const CommandHandlers = [
  CreateBlogpostHandler,
  UpdateBlogPostHandler,
  DeleteBlogPostHandler,
];
