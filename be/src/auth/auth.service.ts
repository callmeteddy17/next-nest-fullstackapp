import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helper/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isValidPassword = await comparePassword(pass, user.password);

    if (!user || !isValidPassword) {
      return null;
    } else {
      return user;
    }
  }
  async login(user: any) {
    const payload = { email: user.email, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(registerDto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.register(registerDto);
    return user;
  }
}
