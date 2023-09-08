import { AssignBlogPostToUserDto } from 'src/users/dto/assign-blogpost-to-user-dto';

export class assignBlogPostToUserCommand {
  constructor(
    public readonly assignBlogPostToUserDto: AssignBlogPostToUserDto,
  ) {}
}
