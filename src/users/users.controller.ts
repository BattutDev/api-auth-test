import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
} from '@nestjs/common';
import User from '../entities/user.entity';
import { UsersService } from './users.service';
import { Session as GetSession } from '@nestjs/common';
import { UserSession } from '../app.controller';
import { Roles } from '../roles/roles.decorator';
import { RoleType } from '../entities/role.entity';

export type CreateUserBody = Omit<User, 'id'>;

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/')
  @Roles('root', 'admin')
  getUsers(): Promise<Array<User>> {
    return this.service.getUsersByRoles(['user', 'premium']);
  }

  @Post('/')
  @Roles('root', 'admin')
  insertUser(@Body() body: CreateUserBody): Promise<User> {
    if (
      !(<Array<RoleType>>['user', 'premium', 'moderator']).includes(
        body.role.name,
      )
    )
      throw new NotAcceptableException('Cannot create user with this role');
    return this.service.insert(body);
  }

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

  @Post('/admins')
  @Roles('root')
  insertAdmin(@Body() body: CreateUserBody): Promise<User> {
    if (body.role.name !== 'admin')
      throw new NotAcceptableException(
        'This route is reserved for admin user insertion.',
      );
    return this.service.insert(body);
  }
}
