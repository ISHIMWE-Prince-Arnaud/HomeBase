import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

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
    return updated;
  }

  // Helper to create a notification (household-scoped), optionally user-targeted
  async create(
    householdId: number,
    message: string,
    type?: string,
    userId?: number,
  ) {
    return await this.prisma.notification.create({
      data: { householdId, message, type, userId },
    });
  }

  async markAllRead(householdId: number) {
    if (!householdId) throw new BadRequestException('householdId missing');
    return await this.prisma.notification.updateMany({
      where: { householdId, isRead: false },
      data: { isRead: true },
    });
  }
}
