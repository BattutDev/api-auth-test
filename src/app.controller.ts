import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Session as GetSession,
  UnauthorizedException,
} from '@nestjs/common';
import { Session } from 'express-session';

type UserSession = Session & Record<'user', any>;

@Controller()
export class AppController {
  @Get('me')
  getMe(@GetSession() session: UserSession) {
    if (!session.user) throw new UnauthorizedException('Not authenticated');
    return session.user;
  }
  @Post('auth')
  auth(@GetSession() session: UserSession) {
    session.user = {
      email: 'antoine@battut.dev',
    };
    return 'auth successful';
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetSession() session: UserSession) {
    if (!session.user) throw new UnauthorizedException('Not authenticated');
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}
