import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './passport/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './passport/local/local-auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard) // check password for login
  @Post('login')
  @Public()
  async create(@Request() req) {
    return this.authService.login(req.user); //gen jwt
  }
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(createAuthDto.email, createAuthDto.password);
  // }
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.register(registerDto);
  }
}
