import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history/entities/history.entity';
import { Client } from './history/entities/client.entity';
import { Vehicle } from './history/entities/vehicle.entity';
import { Type } from './history/entities/type.entity';

@Module({
  imports: [
    HistoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'autoPark',
      entities: [History, Client, Vehicle, Type],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([History]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
