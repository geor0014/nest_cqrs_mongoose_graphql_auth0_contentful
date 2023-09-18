import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsString } from 'class-validator';
@InputType()
export class CreateBlogPostDto {
  @MinLength(5)
  @IsString()
  @Field()
  title: string;

  @MinLength(5)
  @IsString()
  @Field()
  content: string;

  @Field({ nullable: false })
  slug: string;

  @Field(() => ID, { nullable: false })
  author: string;
}
