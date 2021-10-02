import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  constructor() {
    super();
    console.log('AuthRepository created');
  }

  async validateUserPassword(authCredentialDto: LoginUserDto): Promise<string> {
    const { email, password } = authCredentialDto;
    console.log('All ok ---->');
    console.log(email, password);

    const user = await this.findOneOrFail({ where: { id: 2 } });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  async signUp(authCredentialDto: CreateAuthDto): Promise<User> {
    console.log('indise signUp');
    const { email, password, ...result } = authCredentialDto;
    const user = new User();

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    user.firstName = result.firstName;
    user.lastName = result.lastName;

    user.email = email;
    user.mobile = result.mobile;
    user.postalCode = result.postalCode;
    user.address = result.address;

    try {
      await user.save();
      return user;
    } catch (error) {
      // console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
