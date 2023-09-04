import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './blogpost.schema';
import { Model } from 'mongoose';
import { create } from 'domain';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';

@Injectable()
export class BlogpostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async createBlogPost(
    createBlogPostDto: CreateBlogPostDto,
  ): Promise<BlogPost> {
    const newBlogPost = new this.blogPostModel(createBlogPostDto);
    return newBlogPost.save();
  }

  async getBlogPost(id: string): Promise<BlogPost> {
    return this.blogPostModel.findById(id).exec();
  }

  async getAllBlogPosts() {
    return this.blogPostModel.find().exec();
  }
}
