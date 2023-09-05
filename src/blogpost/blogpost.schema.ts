import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BlogPost {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop({
    type: { type: 'ObjectId', ref: 'User' },
  })
  user: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
