import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private get lifecycle(): {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
  } {
    return this as unknown as {
      $connect(): Promise<void>;
      $disconnect(): Promise<void>;
    };
  }
  async onModuleInit() {
    try {
      await this.lifecycle.$connect();
      this.logger.log('Connected to the database');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
    }
  }
  async onModuleDestroy() {
    try {
      await this.lifecycle.$disconnect();
      this.logger.log('Disconnected from the database');
    } catch (error) {
      this.logger.error('Failed to disconnect from the database', error);
    }
  }
}
