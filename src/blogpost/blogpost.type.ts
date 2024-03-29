import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/users/user.type';

@ObjectType('BlogPost')
export class BlogPostType {
  @Field((type) => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field({ nullable: false })
  slug: string;
  @Field((type) => UserType, { nullable: false })
  author: string;
}
