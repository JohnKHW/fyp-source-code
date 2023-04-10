import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MusicFavour } from './music-favour.entity';
import { MusicHistory } from './music-history.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MusicFavour, (musicFavour) => musicFavour.user, {
    eager: true,
  })
  musicFavours: MusicFavour[];

  @OneToMany(() => MusicHistory, (musicHistory) => musicHistory.user)
  musicHistories: MusicHistory[];
}
