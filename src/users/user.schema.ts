import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    type: [{ type: 'ObjectId', ref: 'BlogPost' }],
  })
  blogPosts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
