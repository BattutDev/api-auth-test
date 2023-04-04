import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import User from '../entities/user.entity';
import { UsersService } from './users.service';
import { Session } from 'express-session';
import { Session as GetSession } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserSession } from '../app.controller';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/@me')
  getMyUserInfo(@GetSession() session: UserSession): Promise<User> {
    if (!session.user) throw new UnauthorizedException('Not authenticated');
    return this.service.getById(session.user.id);
  }
}
