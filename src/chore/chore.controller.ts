import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChoreService } from './chore.service';
import { CreateChoreDto } from './dto/create-chore.dto';
import { UpdateChoreDto } from './dto/update-chore.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HouseholdId } from 'src/common/decorators/household-id.decorator';

@UseGuards(JwtGuard)
@Controller('chores')
export class ChoreController {
  constructor(private choreService: ChoreService) {}

  @Get()
  getAll(@HouseholdId() householdId: number) {
    return this.choreService.getChoresByHousehold(householdId);
  }

  @Post()
  create(@HouseholdId() householdId: number, @Body() dto: CreateChoreDto) {
    return this.choreService.createChore(householdId, dto);
  }

  @Patch(':id/complete')
  complete(@HouseholdId() householdId: number, @Param('id') id: string) {
    return this.choreService.markComplete(Number(id), householdId);
  }

  @Delete(':id')
  remove(@HouseholdId() householdId: number, @Param('id') id: string) {
    return this.choreService.deleteChore(Number(id), householdId);
  }

  @Get(':id')
  getOne(@HouseholdId() householdId: number, @Param('id') id: string) {
    return this.choreService.getChoreById(Number(id), householdId);
  }

  @Patch(':id')
  update(
    @HouseholdId() householdId: number,
    @Param('id') id: string,
    @Body() dto: UpdateChoreDto,
  ) {
    return this.choreService.updateChore(Number(id), householdId, dto);
  }
}
