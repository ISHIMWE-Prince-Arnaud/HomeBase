import { Module } from '@nestjs/common';
import { NeedService } from './need.service';
import { NeedController } from './need.controller';

@Module({
  controllers: [NeedController],
  providers: [NeedService],
})
export class NeedModule {}
