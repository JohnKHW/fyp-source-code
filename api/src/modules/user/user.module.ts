import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MusicModule } from '../music/music.module';
import { MusicFavour } from './entities/music-favour.entity';
import { MusicHistory } from './entities/music-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MusicFavour, MusicHistory]),
    MusicModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
