import { Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { NeedService } from './need.service';
import { NeedController } from './need.controller';

@Module({
  imports: [NotificationModule, RealtimeModule],
  controllers: [NeedController],
  providers: [NeedService],
})
export class NeedModule {}
