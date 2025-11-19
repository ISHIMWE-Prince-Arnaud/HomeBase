import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChoreService } from './chore.service';
import { ChoreController } from './chore.controller';

@Module({
  controllers: [ChoreController],
  providers: [ChoreService, PrismaService],
})
export class ChoreModule {}
