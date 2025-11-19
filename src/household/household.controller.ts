import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HouseholdService } from './household.service';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { JoinHouseholdDto } from './dto/join-household.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import type { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @Post()
  async create(
    @Req() req: Request & { user: { id: number } },
    @Body() dto: CreateHouseholdDto,
  ) {
    const userId = req.user.id;
    return this.householdService.createHousehold(userId, dto);
  }

  @Post('join')
  @HttpCode(200)
  async join(
    @Req() req: Request & { user: { id: number } },
    @Body() dto: JoinHouseholdDto,
  ) {
    const userId = req.user.id;
    return this.householdService.joinHousehold(userId, dto);
  }

  @Get('me')
  async getMyHousehold(@Req() req: Request & { user: { id: number } }) {
    const userId = req.user.id;
    return this.householdService.getMyHousehold(userId);
  }
}
