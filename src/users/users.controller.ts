import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import User from '../entities/user.entity';
import { UsersService } from './users.service';
import { Session as GetSession } from '@nestjs/common';
import { UserSession } from '../app.controller';
import { Roles } from '../roles/roles.decorator';
import { RoleType } from '../entities/role.entity';

export type CreateUserBody = Omit<User, 'id'>;

export type EditActiveBody = {
  id: number;
  isActive: boolean;
};

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/')
  @Roles('admin')
  getUsers(): Promise<Array<User>> {
    return this.service.getByRoles(['user', 'premium', 'moderator']);
  }

  /**
   * Create a user
   * @param body
   */
  @Post('/')
  @Roles('admin')
  insertUser(@Body() body: CreateUserBody): Promise<User> {
    if (
      !(<Array<RoleType>>['user', 'premium', 'moderator']).includes(
        body.role.name,
      )
    )
      throw new NotAcceptableException('Cannot create user with this role');
    return this.service.insert(body);
  }

  /**
   * Change active status of a user
   * @param body
   */
  @Patch('/active/')
  @Roles('admin')
  async setActiveStatus(@Body() body: EditActiveBody): Promise<boolean> {
    return this.service.editActiveStatus(body);
  }

  /**
   * Get information from its own account
   * @param session
   */
  @Get('/@me')
  getMyUserInfo(@GetSession() session: UserSession): Promise<User> {
    return this.service.getById(session.user.id);
  }

  /**
   * Delete a user
   * @param id
   */
  @Delete('/:id')
  @Roles('admin')
  async delete(@Param() { id }) {
    return this.service.delete(id);
  }

  @Patch('/')
  @Roles('admin')
  async update(@Body() body: User): Promise<User> {
    return this.service.update(body);
  }
}
