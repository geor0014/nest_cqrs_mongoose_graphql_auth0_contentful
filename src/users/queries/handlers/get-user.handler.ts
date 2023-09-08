import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserQuery } from '../implementation/get-user.query';
import { User } from 'src/users/user.schema';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.userModel.findById(query.id).exec();
  }
}
