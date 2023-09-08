import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './blogpost.schema';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/create-blogpost-dto';
import { UpdateBlogPostDto } from './dto/update-blogpost-dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBlogPostCommand } from './commands/implementation/create-blogpost.command';
import { UpdateBlogPostCommand } from './commands/implementation/update-blogpost.command';

@Injectable()
export class BlogpostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
    private readonly commandBus: CommandBus,
  ) {}

  // async createBlogPost(createBlogPostDto: CreateBlogPostDto) {
  //   return this.commandBus.execute(
  //     new CreateBlogPostCommand(createBlogPostDto),
  //   );
  // }

  // async getBlogPost(id: string): Promise<BlogPost> {
  //   return this.blogPostModel.findById(id).exec();
  // }

  // async getAllBlogPosts(): Promise<BlogPost[]> {
  //   return this.blogPostModel.find().exec();
  // }

  async getManyBlogPosts(blogPostIds: string[]): Promise<BlogPost[]> {
    return this.blogPostModel.find({ _id: { $in: blogPostIds } }).exec();
  }

  // async updateBlogPost(
  //   id: string,
  //   updateBlogPostDto: UpdateBlogPostDto,
  // ): Promise<BlogPost> {
  //   return this.commandBus.execute(
  //     new UpdateBlogPostCommand(id, updateBlogPostDto),
  //   );
  // }

  // async deleteBlogPost(id: string): Promise<BlogPost> {
  //   return this.blogPostModel.findByIdAndDelete(id);
  // }
}
