import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class BlogPost {
    @Prop()
    title: string;
    @Prop()
    content: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);