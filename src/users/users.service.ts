import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import User from '../entities/user.entity';
import { RoleType } from '../entities/role.entity';
import { EditActiveBody } from './users.controller';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(login: string, password: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        login,
        password,
        isActive: true,
      },
    });
  }

  getById(uid: number): Promise<User> {
    return this.userRepository.findOne({
      select: ['id', 'login', 'mail', 'firstName', 'lastName', 'isActive'],
      where: {
        id: uid,
      },
    });
  }

  getByRoles(role: Array<RoleType>): Promise<Array<User>> {
    return this.userRepository.find({
      select: [
        'id',
        'login',
        'mail',
        'firstName',
        'lastName',
        'isActive',
        'role',
      ],
      where: {
        role: {
          name: In(role),
        },
      },
    });
  }

  insert(body: Omit<User, 'id'>): Promise<User> {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  update(body: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userRepository
        .findOne({
          where: {
            id: body.id,
          },
        })
        .then((user: User) => {
          if (
            !(<Array<RoleType>>['user', 'premium', 'moderator']).includes(
              user.role.name,
            )
          )
            throw new NotAcceptableException(
              'Use this route for edit an common user, premium or moderator',
            );
          const newUser = this.userRepository.merge(user, body);
          this.userRepository.save(newUser).then(resolve);
        });
    });
  }

  async editActiveStatus(body: EditActiveBody): Promise<boolean> {
    const user = await this.getById(body.id);
    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: 'Cannot find this user',
        },
        HttpStatus.NOT_MODIFIED,
      );
    if (
      !(<Array<RoleType>>['user', 'premium', 'moderator']).includes(
        user.role.name,
      )
    )
      throw new NotAcceptableException(
        'Use this route for edit an common user, premium or moderator',
      );
    user.isActive = body.isActive;
    const newUser = await this.update(user);
    if (newUser instanceof User) return true;
    else
      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: 'Failed',
        },
        HttpStatus.NOT_MODIFIED,
      );
  }

  async delete(uid: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: uid,
      },
    });
    if (!user || !(user instanceof User))
      throw new HttpException('Cannot foud user', HttpStatus.NOT_MODIFIED);
    if (
      !(<Array<RoleType>>['user', 'premium', 'moderator']).includes(
        user.role.name,
      )
    )
      throw new HttpException(
        'Use this route for edit an common user, premium or moderator',
        HttpStatus.NOT_MODIFIED,
      );
    return this.userRepository
      .delete({
        id: user.id,
      })
      .then(() => true);
  }
}
