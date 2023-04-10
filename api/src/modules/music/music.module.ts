import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { Music } from './entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), HttpModule],
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService],
})
export class MusicModule {}
