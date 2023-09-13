import { IQuery } from '@nestjs/cqrs';
import { UserType } from 'src/users/user.type';

export class GetManyBlogPostsQuery implements IQuery {
  constructor(public readonly user: UserType) {}
}
