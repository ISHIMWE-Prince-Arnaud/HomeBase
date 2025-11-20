import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
