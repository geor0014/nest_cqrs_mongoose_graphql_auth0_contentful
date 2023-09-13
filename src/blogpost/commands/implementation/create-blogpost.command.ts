import { CreateBlogPostDto } from 'src/blogpost/dto/create-blogpost-dto';

export class CreateBlogPostCommand {
  constructor(public readonly createBlogPostDto: CreateBlogPostDto) {}
}
