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
    return this.historyRepository.save(createHistoryDto);
  }

  findAll() {
    return this.historyRepository.find();
  }

  findByClient(id: number) {
    const query = this.historyRepository.createQueryBuilder('history');
    query.where('history.clientId = :id', { id: id });
    query.leftJoinAndSelect('history.vehicle', 'vehicle');
    return query.getMany();
  }

  findParked() {
    const query = this.historyRepository.createQueryBuilder('history');
    query.where('history.isPaid = false', { isPaid: false });
    query.leftJoinAndSelect('history.client', 'client');
    query.leftJoinAndSelect('history.vehicle', 'vehicle');
    return query.getMany();
  }

  findOne(id: any) {
    return this.historyRepository.findOne(id);
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return this.historyRepository.update(id, updateHistoryDto);
  }

  remove(id: number) {
    return this.historyRepository.delete(id);
  }
}
