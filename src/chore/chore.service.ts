import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateChoreDto } from './dto/create-chore.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChoreService {
  constructor(private prisma: PrismaService) {}

  async getChoresByHousehold(householdId: number) {
    return this.prisma.chore.findMany({ where: { householdId } });
  }

  async createChore(householdId: number, dto: CreateChoreDto) {
    if (dto.assignedToId !== undefined) {
      const assigned = await this.prisma.user.findUnique({
        where: { id: dto.assignedToId },
        select: { id: true, householdId: true },
      });
      if (!assigned || assigned.householdId !== householdId) {
        throw new BadRequestException(
          'Assigned user must belong to the same household.',
        );
      }
    }
    const data: Prisma.ChoreUncheckedCreateInput = {
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      householdId,
      assignedToId: dto.assignedToId,
    };
    return this.prisma.chore.create({ data });
  }

  async markComplete(choreId: number, householdId: number) {
    const res = await this.prisma.chore.updateMany({
      where: { id: choreId, householdId },
      data: { isComplete: true },
    });
    if (res.count === 0) {
      throw new NotFoundException('Chore not found.');
    }
    return res;
  }

  async deleteChore(choreId: number, householdId: number) {
    const res = await this.prisma.chore.deleteMany({
      where: { id: choreId, householdId },
    });
    if (res.count === 0) {
      throw new NotFoundException('Chore not found.');
    }
    return res;
  }

  async getChoreById(choreId: number, householdId: number) {
    const chore = await this.prisma.chore.findFirst({
      where: { id: choreId, householdId },
    });
    if (!chore) {
      throw new NotFoundException('Chore not found.');
    }
    return chore;
  }

  async updateChore(
    choreId: number,
    householdId: number,
    dto: { isComplete?: boolean; assignedToId?: number | null },
  ) {
    const existing = await this.prisma.chore.findFirst({
      where: { id: choreId, householdId },
      select: { id: true },
    });
    if (!existing) {
      throw new NotFoundException('Chore not found.');
    }

    const data: Prisma.ChoreUpdateInput = {};
    if (dto.isComplete !== undefined) {
      data.isComplete = dto.isComplete;
    }
    if (dto.assignedToId !== undefined) {
      if (dto.assignedToId === null) {
        data.assignedTo = { disconnect: true };
      } else {
        const assigned = await this.prisma.user.findUnique({
          where: { id: dto.assignedToId },
          select: { id: true, householdId: true },
        });
        if (!assigned || assigned.householdId !== householdId) {
          throw new BadRequestException(
            'Assigned user must belong to the same household.',
          );
        }
        data.assignedTo = { connect: { id: dto.assignedToId } };
      }
    }

    return this.prisma.chore.update({ where: { id: choreId }, data });
  }
}
