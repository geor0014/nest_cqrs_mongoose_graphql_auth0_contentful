import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignBlogPostToUserDto {
  @Field((type) => ID)
  userId: string;

  @Field((type) => [ID])
  blogPosts: string[];
}
