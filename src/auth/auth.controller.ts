import {
  Controller,
  Get,
  Request,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './local_guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/users/commands/implementation/create-user.command';
import { GetUserByTokenQuery } from 'src/users/queries/implementation/get-user-by-token.query';

@Controller()
// @UseGuards(LocalGuard)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('/callback')
  async callback(@Request() req, @Response() res) {}

  @Get('/')
  async home(@Request() req, @Response() res) {
    const { userData } = req.appSession;

    if (userData) {
      res.send(`Hello ${userData.name}`);
      // if (userData.login_counts === 1) {
      //   this.commandBus.execute(
      //     new CreateUserCommand({
      //       name: userData.name,
      //       email: userData.email,
      //       token: userData.sub,
      //     }),
      //   );
      // }
      const user = await this.queryBus.execute(
        new GetUserByTokenQuery(userData.sub),
      );
      console.log(user);

      if (!user) {
        this.commandBus.execute(
          new CreateUserCommand({
            name: userData.name,
            email: userData.email,
            token: userData.sub,
          }),
        );
      }
    } else {
      res.send('Hello World!');
    }
  }
}
