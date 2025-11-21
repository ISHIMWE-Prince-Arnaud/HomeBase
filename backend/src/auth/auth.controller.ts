import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import type { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';

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
  getProfile(@Req() req: Request & { user: { id: number } }): Promise<{
    id: number;
    email: string;
    name: string;
    profileImage: string;
  }> {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('users/me')
  updateProfile(
    @UserId() userId: number,
    @Body() dto: UpdateProfileDto,
  ): Promise<{
    id: number;
    email: string;
    name: string;
    profileImage: string;
  }> {
    return this.authService.updateProfile(userId, dto);
  }
}
