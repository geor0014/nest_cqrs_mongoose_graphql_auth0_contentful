import {
  Controller,
  Get,
  Request,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './local_guard';

@Controller()
// @UseGuards(LocalGuard)
export class AuthController {
  @Get('/callback')
  async callback() {}

  @Get('/logout')
  async logout(@Request() req, @Response() res) {}

  @Get('/')
  async home(@Request() req, @Response() res) {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  }

  @Get('/login')
  async login(@Request() req, @Response() res) {
    res.send('Login');
  }

  @Get('/profile')
  // @UseGuards(LocalGuard)
  async profile(@Request() req, @Response() res) {
    res.send(JSON.stringify(req.oidc.user));
  }
}
