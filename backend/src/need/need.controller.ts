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
import { NeedService } from './need.service';
import { CreateNeedDto } from './dto/create-need.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HouseholdId } from 'src/common/decorators/household-id.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { MarkPurchasedDto } from './dto/mark-purchased.dto';
import { UpdateNeedDto } from './dto/update-need.dto';

@UseGuards(JwtGuard)
@Controller('needs')
export class NeedController {
  constructor(private readonly needService: NeedService) {}

  @Post()
  /**
   * WebSocket: emits 'needs:itemAdded' to household room after creation.
   */
  create(
    @HouseholdId() householdId: number,
    @UserId() userId: number,
    @Body() dto: CreateNeedDto,
  ) {
    return this.needService.createNeed(householdId, userId, dto);
  }

  @Get()
  findAll(@HouseholdId() householdId: number) {
    return this.needService.getNeeds(householdId);
  }

  @Patch(':id/purchase')
  /**
   * WebSocket: emits 'needs:itemPurchased' to household room.
   * If auto-expense is created, also emits 'needs:expenseCreated'.
   */
  purchase(
    @HouseholdId() householdId: number,
    @UserId() userId: number,
    @Param('id') id: string,
    @Body() dto: MarkPurchasedDto,
  ) {
    return this.needService.markPurchased(Number(id), householdId, userId, dto);
  }

  @Patch(':id')
  /**
   * WebSocket: emits 'needs:itemUpdated' to household room after update.
   */
  update(
    @HouseholdId() householdId: number,
    @Param('id') id: string,
    @Body() dto: UpdateNeedDto,
  ) {
    return this.needService.updateNeed(Number(id), householdId, dto);
  }

  @Delete(':id')
  remove(@HouseholdId() householdId: number, @Param('id') id: string) {
    return this.needService.deleteNeed(Number(id), householdId);
  }
}
