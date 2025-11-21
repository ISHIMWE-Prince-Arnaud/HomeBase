import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HouseholdId } from 'src/common/decorators/household-id.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@UseGuards(JwtGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  /**
   * WebSocket: emits 'payments:recorded' and 'expenses:balanceUpdated' (reason: 'paymentRecorded').
   */
  create(
    @HouseholdId() householdId: number,
    @UserId() userId: number,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(householdId, userId, dto);
  }

  @Get()
  list(@HouseholdId() householdId: number) {
    return this.paymentService.getPayments(householdId);
  }
}
