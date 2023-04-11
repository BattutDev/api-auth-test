import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Session as GetSession,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { Session } from 'express-session';
import { UsersService } from './users/users.service';
import User, { SessionUserType } from './entities/user.entity';

export type UserSession = Session & Record<'user', SessionUserType>;

type LoginBodyType = {
  login: string;
  password: string;
};

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(
    @GetSession() session: UserSession,
    @Body() body: LoginBodyType,
  ): Promise<SessionUserType> {
    return this.usersService
      .login(body.login, body.password)
      .then((user: User) => {
        if (user) {
          delete user.password;
          session.user = user;
          return user;
        } else throw new UnauthorizedException('Bad credentials');
      });
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetSession() session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}
