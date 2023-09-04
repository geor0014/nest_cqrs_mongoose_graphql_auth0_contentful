import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('BlogPost')
export class BlogPostType {
    @Field(
        type => ID 
    )
    id: string;
    @Field()
    title: string;
    @Field()
    content: string;
}