import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private repo: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<any> {
    console.log('Creating user servise');
    return await this.repo.signUp(createAuthDto);

    // const accessToken = ''; //await this.generateToken(user.email);
    //
    // return { user, accessToken };
  }

  async generateToken(email: string): Promise<string> {
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const email = await this.repo.validateUserPassword(loginUserDto);
    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.generateToken(email);
    return { accessToken };
  }
}
