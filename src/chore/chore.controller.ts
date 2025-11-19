import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ChoreService } from './chore.service';
import { CreateChoreDto } from './dto/create-chore.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('chores')
export class ChoreController {
  constructor(private choreService: ChoreService) {}

  @Get()
  getAll(@Req() req: Request & { user: { householdId: number } }) {
    return this.choreService.getChoresByHousehold(req.user.householdId);
  }

  @Post()
  create(
    @Req() req: Request & { user: { householdId: number } },
    @Body() dto: CreateChoreDto,
  ) {
    return this.choreService.createChore(req.user.householdId, dto);
  }

  @Patch(':id/complete')
  complete(
    @Req() req: Request & { user: { householdId: number } },
    @Param('id') id: string,
  ) {
    return this.choreService.markComplete(Number(id), req.user.householdId);
  }

  @Delete(':id')
  remove(
    @Req() req: Request & { user: { householdId: number } },
    @Param('id') id: string,
  ) {
    return this.choreService.deleteChore(Number(id), req.user.householdId);
  }
}
