import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { NotificationModule } from 'src/notification/notification.module';
import { RealtimeModule } from 'src/realtime/realtime.module';

@Module({
  imports: [NotificationModule, RealtimeModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
