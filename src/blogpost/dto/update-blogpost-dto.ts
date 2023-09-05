import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
@InputType()
export class UpdateBlogPostDto {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;
}
