import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class BlogPost {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  slug: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
