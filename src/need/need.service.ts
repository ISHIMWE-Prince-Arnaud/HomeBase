import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNeedDto } from './dto/create-need.dto';

@Injectable()
export class NeedService {
  constructor(private prisma: PrismaService) {}

  async createNeed(householdId: number, userId: number, dto: CreateNeedDto) {
    if (!householdId) {
      throw new BadRequestException('householdId missing in context.');
    }
    const created = await this.prisma.householdNeed.create({
      data: {
        name: dto.name,
        quantity: dto.quantity,
        category: dto.category,
        householdId,
        addedById: userId,
      },
    });
    return created;
  }

  async getNeeds(householdId: number) {
    if (!householdId) {
      throw new BadRequestException('householdId missing in context.');
    }
    return this.prisma.householdNeed.findMany({
      where: { householdId },
      orderBy: [{ isPurchased: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async markPurchased(needId: number, householdId: number, userId: number) {
    const updated = await this.prisma.householdNeed.updateMany({
      where: { id: needId, householdId },
      data: {
        isPurchased: true,
        purchasedAt: new Date(),
        purchasedById: userId,
      },
    });
    if (updated.count === 0) {
      throw new NotFoundException('Need not found.');
    }
    return this.prisma.householdNeed.findUnique({ where: { id: needId } });
  }

  async deleteNeed(needId: number, householdId: number) {
    const deleted = await this.prisma.householdNeed.deleteMany({
      where: { id: needId, householdId },
    });
    if (deleted.count === 0) {
      throw new NotFoundException('Need not found.');
    }
    return deleted;
  }
}
