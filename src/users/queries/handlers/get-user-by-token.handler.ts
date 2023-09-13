import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { GetUserByTokenQuery } from '../implementation/get-user-by-token.query';

@QueryHandler(GetUserByTokenQuery)
export class GetUserByTokenHandler implements IQueryHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(query: GetUserByTokenQuery): Promise<User> {
    const { token } = query;
    return await this.userModel.findOne({ token });
  }
}
