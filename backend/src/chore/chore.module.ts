import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChoreService } from './chore.service';
import { ChoreController } from './chore.controller';
import { RealtimeModule } from 'src/realtime/realtime.module';

@Module({
  imports: [RealtimeModule],
  controllers: [ChoreController],
  providers: [ChoreService, PrismaService],
})
export class ChoreModule {}
