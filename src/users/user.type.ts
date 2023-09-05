import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BlogPost } from 'src/blogpost/blogpost.schema';
import { BlogPostType } from 'src/blogpost/blogpost.type';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => [BlogPostType], { nullable: true })
  blogPosts: BlogPost[];
}
