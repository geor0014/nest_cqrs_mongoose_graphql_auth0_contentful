import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.schema';
import { UserType } from 'src/users/user.type';

@ObjectType('BlogPost')
export class BlogPostType {
  @Field((type) => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field((type) => UserType)
  user: string;
}
