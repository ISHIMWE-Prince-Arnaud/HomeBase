import { Injectable } from '@nestjs/common';
import { CreateChoreDto } from './dto/create-chore.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChoreService {
  constructor(private prisma: PrismaService) {}

  async getChoresByHousehold(householdId: number) {
    return this.prisma.chore.findMany({ where: { householdId } });
  }

  async createChore(householdId: number, dto: CreateChoreDto) {
    return this.prisma.chore.create({ data: { ...dto, householdId } });
  }

  async markComplete(choreId: number, householdId: number) {
    return this.prisma.chore.updateMany({
      where: { id: choreId, householdId },
      data: { isComplete: true },
    });
  }

  async deleteChore(choreId: number, householdId: number) {
    return this.prisma.chore.deleteMany({
      where: { id: choreId, householdId },
    });
  }
}
