import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('users/me')
  getProfile(
    @Req() req: Request & { user: { id: number } },
  ): Promise<{ id: number; email: string; name: string }> {
    return this.authService.getProfile(req.user.id);
  }
}
