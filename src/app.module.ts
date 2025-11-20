import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HouseholdModule } from './household/household.module';
import { ChoreModule } from './chore/chore.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, HouseholdModule, ChoreModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
