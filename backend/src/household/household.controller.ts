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
@Controller('households')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @Post()
  @HttpCode(201)
  /**
   * WebSocket: emits 'household:memberJoined' and syncs user socket into household room.
   */
  async create(
    @Req() req: Request & { user: { id: number } },
    @Body() dto: CreateHouseholdDto,
  ) {
    const userId = req.user.id;
    return this.householdService.createHousehold(userId, dto);
  }

  @Post('join')
  @HttpCode(200)
  /**
   * WebSocket: emits 'household:memberJoined' and syncs user socket into household room.
   */
  async join(
    @Req() req: Request & { user: { id: number } },
    @Body() dto: JoinHouseholdDto,
  ) {
    const userId = req.user.id;
    return this.householdService.joinHousehold(userId, dto);
  }

  @Post('leave')
  @HttpCode(200)
  /**
   * WebSocket: emits 'household:memberLeft'. If the household is deleted (last member), also emits 'household:deleted'.
   * Room sync: user socket leaves the household room.
   */
  async leave(@Req() req: Request & { user: { id: number } }) {
    const userId = req.user.id;
    await this.householdService.leaveHousehold(userId);
  }

  @Get('me')
  @HttpCode(200)
  async getMyHousehold(@Req() req: Request & { user: { id: number } }) {
    const userId = req.user.id;
    return this.householdService.getMyHousehold(userId);
  }
}
