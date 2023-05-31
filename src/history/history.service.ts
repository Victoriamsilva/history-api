import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}
  create(createHistoryDto: CreateHistoryDto) {
    try {
      createHistoryDto.isPaid = false;
      createHistoryDto.price = 0;
      createHistoryDto.begin = new Date();

      return this.historyRepository.save(createHistoryDto);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.historyRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  findByClient(id: number) {
    try {
      const query = this.historyRepository.createQueryBuilder('history');
      query.where('history.clientId = :id', { id: id });
      query.andWhere('history.isPaid = true', { isPaid: true });
      query.leftJoinAndSelect('history.vehicle', 'vehicle');
      query.leftJoinAndSelect('vehicle.type', 'type');
      return query.getMany();
    } catch (error) {
      console.log(error);
    }
  }

  findParked() {
    try {
      const query = this.historyRepository.createQueryBuilder('history');
      query.where('history.isPaid = false', { isPaid: false });
      query.leftJoinAndSelect('history.client', 'client');
      query.leftJoinAndSelect('history.vehicle', 'vehicle');
      query.leftJoinAndSelect('vehicle.type', 'type');
      return query.getMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: any) {
    try {
      return this.historyRepository.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    try {
      return this.historyRepository.update(id, updateHistoryDto);
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.historyRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
