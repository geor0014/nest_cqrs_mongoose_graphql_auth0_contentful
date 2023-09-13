import { UpdateBlogPostDto } from 'src/blogpost/dto/update-blogpost-dto';

export class UpdateBlogPostCommand {
  constructor(
    public readonly id: string,
    public readonly updateBlogPostDto: UpdateBlogPostDto,
  ) {}
}
