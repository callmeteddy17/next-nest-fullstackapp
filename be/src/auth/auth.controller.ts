import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local/local-auth.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JWTAuthGuard } from './passport/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard) // check password for login
  @Post('login')
  async create(@Request() req) {
    return this.authService.login(req.user); //gen jwt
  }
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(createAuthDto.email, createAuthDto.password);
  // }
  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
