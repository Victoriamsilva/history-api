/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { History } from './history.entity';
import { Type } from './type.entity';

@Entity({ name: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  licensePlate: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Type, (type) => type.vehicle)
  @JoinColumn({ name: 'typeId' })
  type: Type;

  @OneToMany(() => History, (history) => history.vehicle)
  history: History[];
}
