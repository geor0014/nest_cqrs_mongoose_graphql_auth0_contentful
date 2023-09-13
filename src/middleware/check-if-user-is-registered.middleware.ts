import { Injectable, NestMiddleware } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NextFunction } from 'express';
import { Request, Response } from '@nestjs/common';
import { CreateUserCommand } from 'src/users/commands/implementation/create-user.command';
import { GetUserByTokenQuery } from 'src/users/queries/implementation/get-user-by-token.query';

@Injectable()
export class CheckIfUserIsRegistered implements NestMiddleware {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async use(@Request() req, @Response() res, next: NextFunction) {
    const { userData } = req.appSession;

    if (userData) {
      res.send(`Hello ${userData.name}`);
      const user = await this.queryBus.execute(
        new GetUserByTokenQuery(userData.sub),
      );

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
    next();
  }
}
