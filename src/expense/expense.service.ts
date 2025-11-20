import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async createExpense(
    householdId: number,
    userId: number,
    dto: CreateExpenseDto,
  ) {
    if (!householdId) {
      throw new BadRequestException('User is not associated with a household.');
    }

    if (userId !== dto.paidById) {
      throw new ForbiddenException('You can only create expenses you paid for');
    }

    // Validate paidBy user is in the same household
    const payer = await this.prisma.user.findUnique({
      where: { id: dto.paidById },
      select: { id: true, householdId: true },
    });
    if (!payer || payer.householdId !== householdId) {
      throw new BadRequestException(
        'paidById must belong to the same household.',
      );
    }

    // Validate participants are all in the same household
    const participantIds = dto.participants;
    if (!participantIds || participantIds.length === 0) {
      throw new BadRequestException('participants must be a non-empty array.');
    }

    // Ensure payer is among participants
    if (!participantIds.includes(dto.paidById)) {
      throw new BadRequestException(
        'paidById must also be included in participants.',
      );
    }

    const participants = await this.prisma.user.findMany({
      where: { id: { in: participantIds } },
      select: { id: true, householdId: true },
    });

    const invalid = participants.find((p) => p.householdId !== householdId);
    if (invalid) {
      throw new BadRequestException(
        'All participants must belong to the same household.',
      );
    }

    const share = dto.totalAmount / participantIds.length;

    const data: Prisma.ExpenseUncheckedCreateInput = {
      description: dto.description,
      totalAmount: dto.totalAmount,
      date: dto.date ? new Date(dto.date) : undefined,
      paidById: dto.paidById,
      householdId,
      participants: {
        create: participantIds.map((userId) => ({
          userId,
          shareAmount: share,
        })),
      },
    };

    const created = await this.prisma.expense.create({
      data,
      include: { participants: true },
    });
    return created;
  }

  async getExpenses(householdId: number) {
    if (!householdId) {
      throw new BadRequestException('householdId missing in context.');
    }
    return this.prisma.expense.findMany({
      where: { householdId },
      orderBy: { id: 'desc' },
      include: {
        participants: true,
      },
    });
  }

  async getBalance(householdId: number) {
    if (!householdId) {
      throw new BadRequestException('householdId missing in context.');
    }

    const paid = await this.prisma.expense.groupBy({
      by: ['paidById'],
      where: { householdId },
      _sum: { totalAmount: true },
    });

    const expenseIds = await this.prisma.expense.findMany({
      where: { householdId },
      select: { id: true },
    });
    const ids = expenseIds.map((e) => e.id);

    const owes = ids.length
      ? await this.prisma.expenseParticipant.groupBy({
          by: ['userId'],
          where: { expenseId: { in: ids } },
          _sum: { shareAmount: true },
        })
      : ([] as Array<{ userId: number; _sum: { shareAmount: number | null } }>);

    const map = new Map<number, { paid: number; owes: number }>();
    for (const p of paid) {
      const cur = map.get(p.paidById) || { paid: 0, owes: 0 };
      cur.paid += p._sum.totalAmount || 0;
      map.set(p.paidById, cur);
    }
    for (const o of owes) {
      const cur = map.get(o.userId) || { paid: 0, owes: 0 };
      cur.owes += o._sum.shareAmount || 0;
      map.set(o.userId, cur);
    }

    const userIds = Array.from(map.keys());
    if (userIds.length === 0) {
      return [];
    }
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u] as const));

    const result = userIds.map((id) => {
      const v = map.get(id)!;
      const u = userMap.get(id);
      return {
        userId: id,
        name: u?.name ?? null,
        email: u?.email ?? null,
        net: Number((v.paid - v.owes).toFixed(2)),
      };
    });
    return result;
  }
}
