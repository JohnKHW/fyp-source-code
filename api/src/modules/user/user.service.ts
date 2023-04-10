import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicService } from '../music/music.service';
import { MusicFavour } from './entities/music-favour.entity';
import { classToPlain } from 'class-transformer';
import { MusicHistory } from './entities/music-history.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(MusicFavour)
    private musicFavourRepo: Repository<MusicFavour>,
    @InjectRepository(MusicHistory)
    private musicHistoryRepo: Repository<MusicHistory>,
    private readonly musicService: MusicService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async toggleFavour(song_id: string, username: string) {
    const user = await this.findOne(username);

    const music = await this.musicService.findOne(song_id);

    if (!music) return;

    if (user.musicFavours.find((fav) => fav.music.id === music.id)) {
      user.musicFavours = user.musicFavours.filter(
        (musicFavour) => musicFavour.music.id !== music.id,
      );
    } else {
      user.musicFavours.push(await this.musicFavourRepo.save({ music, user }));
    }

    await this.userRepo.save(user);

    return { status: 'success' };
  }

  async listenSong(song_id: string, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['musicHistories'],
    });

    const music = await this.musicService.findOne(song_id);

    if (!music) return;

    user.musicHistories.push(await this.musicHistoryRepo.save({ music, user }));

    await this.userRepo.save(user);

    return { status: 'success' };
  }

  async history(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['musicHistories'],
    });

    return user;
  }
}
