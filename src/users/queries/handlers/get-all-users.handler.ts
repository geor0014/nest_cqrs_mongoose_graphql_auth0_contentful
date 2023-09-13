import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetAllUsersQuery } from '../implementation/get-all-users.query';
import { User } from 'src/users/user.schema';

@QueryHandler(GetAllUsersQuery)
export class getAllUsersHandler implements IQueryHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(query: GetAllUsersQuery): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
