import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import User from '../entities/user.entity';
import { UsersService } from './users.service';
import { Session } from 'express-session';
import { Session as GetSession } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserSession } from '../app.controller';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/@me')
  @Roles('root', 'user')
  getMyUserInfo(@GetSession() session: UserSession): Promise<User> {
    return this.service.getById(session.user.id);
  }
}
