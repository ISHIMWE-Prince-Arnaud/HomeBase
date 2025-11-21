import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RealtimeService } from 'src/realtime/realtime.service';
import { RealtimeEvents } from 'src/realtime/realtime.events';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private realtime: RealtimeService,
  ) {}

  async listByHousehold(householdId: number) {
    if (!householdId) throw new BadRequestException('householdId missing');
    return await this.prisma.notification.findMany({
      where: { householdId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markRead(householdId: number, id: number) {
    const updated = await this.prisma.notification.updateMany({
      where: { id, householdId },
      data: { isRead: true },
    });
    if (updated.count === 0)
      throw new NotFoundException('Notification not found');
    this.realtime.emitToHousehold(
      householdId,
      RealtimeEvents.NOTIFICATION_READ,
      { id },
    );
    return updated;
  }

  // Helper to create a notification (household-scoped), optionally user-targeted
  async create(
    householdId: number,
    message: string,
    type?: string,
    userId?: number,
  ) {
    const created = await this.prisma.notification.create({
      data: { householdId, message, type, userId },
    });
    if (userId) {
      this.realtime.emitToUser(userId, RealtimeEvents.NOTIFICATION_CREATED, {
        notification: created,
      });
    } else {
      this.realtime.emitToHousehold(
        householdId,
        RealtimeEvents.NOTIFICATION_CREATED,
        { notification: created },
      );
    }
    return created;
  }

  async markAllRead(householdId: number) {
    if (!householdId) throw new BadRequestException('householdId missing');
    const res = await this.prisma.notification.updateMany({
      where: { householdId, isRead: false },
      data: { isRead: true },
    });
    this.realtime.emitToHousehold(
      householdId,
      RealtimeEvents.NOTIFICATION_READ,
      { all: true },
    );
    return res;
  }
}
