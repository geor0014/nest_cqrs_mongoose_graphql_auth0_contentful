import {
  Controller,
  Get,
  Request,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './local-guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/users/commands/implementation/create-user.command';
import { GetUserByTokenQuery } from 'src/users/queries/implementation/get-user-by-token.query';

@Controller()
// @UseGuards(LocalGuard)
export class AuthController {
  constructor() {}
  @Get('/callback')
  async callback(@Request() req, @Response() res) {}
  @Get('/')
  async home(@Request() req, @Response() res) {
    if (!req.oidc.isAuthenticated()) {
      res.send('Please login');
    } else {
      res.send(`Hello ${req.oidc.user.name}`);
    }
  }
}
