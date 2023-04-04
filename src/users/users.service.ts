import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

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
  async getById(uid: number): Promise<User> {
    return this.userRepository.findOne({
      select: ['id', 'login', 'mail', 'firstName', 'lastName', 'isActive'],
      where: {
        id: uid,
        isActive: true,
      },
    });
  }
}
