import { IQuery } from '@nestjs/cqrs';
import { UserType } from 'src/users/user.type';

export class getManyBlogPostsQuery implements IQuery {
  constructor(public readonly user: UserType) {}
}
