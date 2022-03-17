import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, FindOneOptions } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserInput, UpdateUserInput } from './user.types';
import cryptoRandomString = require('crypto-random-string');

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userData: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    user.refreshToken = cryptoRandomString({
      length: 500,
      type: 'alphanumeric',
    });
    user.refreshTokenExpires = new Date().getDate() + 186;
    return this.userRepository.save(user);
  }

  async update(userData: UpdateUserInput, userId: number): Promise<UserEntity> {
    const user = await this.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException();
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async delete(userId: number): Promise<DeleteResult> {
    const user = await this.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException();
    return this.userRepository.delete(userId);
  }

  async getOrUpdateRefreshToken(userId: number): Promise<string> {
    const user = await this.findOne({ where: { id: userId } });
    if (user.refreshTokenExpires < new Date().getDate()) {
      user.refreshToken = cryptoRandomString({
        length: 500,
        type: 'alphanumeric',
      });
      user.refreshTokenExpires = new Date().getDate() + 186;
      this.userRepository.save(user);
    }
    return user.refreshToken;
  }

  findOne(options: FindOneOptions) {
    return this.userRepository.findOne(options);
  }

  findAll() {
    return this.userRepository.find();
  }
}
