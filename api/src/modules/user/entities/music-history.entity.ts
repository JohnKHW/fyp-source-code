import { Music } from 'src/modules/music/entities/music.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MusicHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Music, (music) => music.id, { eager: true })
  music: Music;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
