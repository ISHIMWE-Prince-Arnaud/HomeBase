import { Module } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { HouseholdController } from './household.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HouseholdController],
  providers: [HouseholdService, PrismaService],
  exports: [HouseholdService],
})
export class HouseholdModule {}
