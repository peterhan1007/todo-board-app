import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from './auth.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { constants } from 'src/constants';
import { LoginUserInput, RegisterUserInput } from './dto/auth.input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createToken(payload: JwtPayload): any {
    const secretOrKey = constants.secret;
    const token = jwt.sign(payload, secretOrKey, {
      expiresIn: 604800,
    });
    return token;
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.getUserById(payload.id);
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async register(userInfo: RegisterUserInput): Promise<User> {
    const duplicate = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });
    if (duplicate !== null) {
      throw new HttpException('username already taken', HttpStatus.CONFLICT);
    }

    userInfo.password = await bcrypt.hash(userInfo.password, 10);

    const user = await this.userRepository.save(userInfo);
    return user;
  }

  async login(userInfo: LoginUserInput): Promise<User> {
    if (userInfo.password === '' || userInfo.email === '') {
      throw new HttpException(
        'Email or Password are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });

    if (user === null) return null;

    const isValid = await bcrypt.compare(userInfo.password, user.password);

    if (isValid) {
      return user;
    }
  }
}
