import { Music } from 'src/modules/music/entities/music.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MusicFavour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Music, (music) => music.id, { eager: true })
  music!: Music;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @CreateDateColumn()
  createdAt: Date;
}
