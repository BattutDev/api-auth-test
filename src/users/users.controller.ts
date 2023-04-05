import { Controller, Get } from '@nestjs/common';
import User from '../entities/user.entity';
import { UsersService } from './users.service';
import { Session as GetSession } from '@nestjs/common';
import { UserSession } from '../app.controller';
import { Roles } from '../roles/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/@me')
  @Roles('user')
  getMyUserInfo(@GetSession() session: UserSession): Promise<User> {
    return this.service.getById(session.user.id);
  }

  @Get('/admins')
  @Roles('root')
  getAdmins(): Promise<Array<User>> {
    return this.service.getUsersByRoles(['admin']);
  }

  @Get('/all')
  @Roles('root', 'admin')
  getUsers(): Promise<Array<User>> {
    return this.service.getUsersByRoles(['user', 'premium', 'moderator']);
  }
}
