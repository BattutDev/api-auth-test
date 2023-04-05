import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import User from '../entities/user.entity';
import { RoleType } from '../entities/role.entity';
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
        isActive: true,
      },
    });
  }

  getUsersByRoles(role: Array<RoleType>): Promise<Array<User>> {
    return this.userRepository.find({
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
}
