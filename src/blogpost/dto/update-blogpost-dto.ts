import { InputType, Field, ID } from '@nestjs/graphql';
@InputType()
export class UpdateBlogPostDto {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;
}
