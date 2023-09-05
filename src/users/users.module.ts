import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { BlogpostModule } from 'src/blogpost/blogpost.module';

@Module({
  providers: [UsersService, UserResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    BlogpostModule,
  ],
})
export class UsersModule {}
