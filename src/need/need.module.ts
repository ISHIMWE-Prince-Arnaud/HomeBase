import { Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';
import { NeedService } from './need.service';
import { NeedController } from './need.controller';

@Module({
  imports: [NotificationModule],
  controllers: [NeedController],
  providers: [NeedService],
})
export class NeedModule {}
