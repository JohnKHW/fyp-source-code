import { Injectable } from '@nestjs/common';

import { CreateMusicDto } from './dto/create-music.dto';

import { UpdateMusicDto } from './dto/update-music.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Music } from './entities/music.entity';

import { GetRecommendDto } from './dto/get-recommend.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import * as FormData from 'form-data';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepo: Repository<Music>,

    private readonly httpService: HttpService,
  ) {}

  create(createMusicDto: CreateMusicDto) {
    return this.musicRepo.save(createMusicDto);
  }

  findAll() {
    return this.musicRepo.find();
  }

  findOne(id: string) {
    return this.musicRepo.findOneBy({ id });
  }

  update(id: string, updateMusicDto: UpdateMusicDto) {
    return this.musicRepo.update({ id }, updateMusicDto);
  }

  remove(id: string) {
    return this.musicRepo.delete({ id });
  }

  async recommend(image: GetRecommendDto) {
    const { buffer } = image;
    const formData = new FormData();
    formData.append('selfie', buffer as any, 'selfie.png');
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .post<any>(`${process.env.FER_API}/expression`, formData, {
            headers,
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error.response.data);
              throw new Error('An error happened!');
            }),
          ),
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('An error happened!');
    }
  }
}
