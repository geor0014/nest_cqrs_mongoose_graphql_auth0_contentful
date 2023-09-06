import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './blogpost.schema';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';
import { UpdateBlogPostDto } from './dto/update-blogpost-dto';

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

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostModel.find().exec();
  }

  async getManyBlogPosts(blogPostIds: string[]): Promise<BlogPost[]> {
    return this.blogPostModel.find({ _id: { $in: blogPostIds } }).exec();
  }

  async updateBlogPost(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostModel.findByIdAndUpdate(id, updateBlogPostDto);
  }

  async deleteBlogPost(id: string): Promise<BlogPost> {
    return this.blogPostModel.findByIdAndDelete(id);
  }
}
