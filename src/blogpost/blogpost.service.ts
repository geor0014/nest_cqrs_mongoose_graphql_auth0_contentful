import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './blogpost.schema';
import { Model } from 'mongoose';
import { create } from 'domain';

@Injectable()
export class BlogpostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async createBlogPost(title: string, content: string) {
    const newBlogPost = new this.blogPostModel({ title, content });
    return newBlogPost.save();
  }

  async getBlogPost(id: string): Promise<BlogPost> {
    return this.blogPostModel.findById(id).exec();
  }

  async getAllBlogPosts() {
    return this.blogPostModel.find().exec();
  }
}
