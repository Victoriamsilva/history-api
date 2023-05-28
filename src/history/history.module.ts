import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from './entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Client } from './entities/client.entity';
import { Type } from './entities/type.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [TypeOrmModule.forFeature([History, Vehicle, Client, Type])],
  exports: [TypeOrmModule],
})
export class HistoryModule {}
