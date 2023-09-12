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
  async callback(@Request() req, @Response() res) {
    // console.log('callback');
  }

  @Get('/logout')
  async logout(@Request() req, @Response() res) {}

  @Get('/')
  async home(@Request() req, @Response() res) {
    if (req.appSession.userData) {
      res.send(`Hello ${req.appSession.userData.name}`);
    } else {
      res.send('Not Authenticated');
    }
  }

  @Get('/login')
  async login(@Request() req, @Response() res) {}

  @Get('/profile')
  // @UseGuards(LocalGuard)
  async profile(@Request() req, @Response() res) {
    return req.oidc.user;
  }
}
