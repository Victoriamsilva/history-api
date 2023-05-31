import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Client } from './client.entity';

@Entity({ name: 'history' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  begin: Date;

  @Column({
    nullable: true,
  })
  end: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.history)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @ManyToOne(() => Client, (client) => client.history)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({
    nullable: true,
    default: false,
  })
  isPaid: boolean;
}
