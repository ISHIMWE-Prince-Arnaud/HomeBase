import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HouseholdId } from 'src/common/decorators/household-id.decorator';

@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  list(@HouseholdId() householdId: number) {
    return this.notificationService.listByHousehold(householdId);
  }

  @Patch(':id/read')
  markRead(@HouseholdId() householdId: number, @Param('id') id: string) {
    return this.notificationService.markRead(householdId, Number(id));
  }

  @Patch('read-all')
  markAll(@HouseholdId() householdId: number) {
    return this.notificationService.markAllRead(householdId);
  }
}
