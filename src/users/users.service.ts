import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async createUser(CreateUserDto: CreateUserDto): Promise<User> {
  //   const newUser = new this.userModel(CreateUserDto);
  //   return newUser.save();
  // }

  // async getUsers(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }

  // async getUserById(id: string): Promise<User> {
  //   return this.userModel.findById(id).exec();
  // }

  // async updateUser(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
  //   return this.userModel.findByIdAndUpdate(id, UpdateUserDto);
  // }

  // async deleteUser(id: string): Promise<User> {
  //   return this.userModel.findByIdAndDelete(id);
  // }

  async assignBlogPostToUser(
    userId: string,
    blogPostId: string[],
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    user.blogPosts = [...user.blogPosts, ...blogPostId];
    return user.save();
  }
}
