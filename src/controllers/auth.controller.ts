// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupDto, LoginDto } from '../dtos/auth.dto';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(loginDto);
  }
}
