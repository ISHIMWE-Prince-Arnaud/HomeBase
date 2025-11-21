import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HouseholdId } from 'src/common/decorators/household-id.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';

@UseGuards(JwtGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  /**
   * WebSocket: emits 'expenses:created' and 'expenses:balanceUpdated' (reason: 'expenseCreated').
   */
  create(
    @HouseholdId() householdId: number,
    @UserId() userId: number,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expenseService.createExpense(householdId, userId, dto);
  }

  @Get()
  findAll(@HouseholdId() householdId: number) {
    return this.expenseService.getExpenses(householdId);
  }

  @Get('balance')
  balance(@HouseholdId() householdId: number) {
    return this.expenseService.getBalance(householdId);
  }

  @Get('settlements')
  settlements(@HouseholdId() householdId: number) {
    return this.expenseService.getSettlements(householdId);
  }

  @Get('settlements/me')
  mySettlements(@HouseholdId() householdId: number, @UserId() userId: number) {
    return this.expenseService.getMySettlements(householdId, userId);
  }
}
