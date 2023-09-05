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

  @IsString()
  @Field(() => ID, { nullable: false })
  user: string;
}
