import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetImageDto, GetRecommendDto } from './dto/get-recommend.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}
  @ApiBearerAuth('JWT-auth')
  @Post('recommend')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    description: 'Image file in binary format',
    type: GetImageDto,
  })
  recommend(@UploadedFile() getRecommendDto: any) {
    const buffer = getRecommendDto.buffer;
    return this.musicService.recommend({ buffer });
  }

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(id, updateMusicDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(id);
  }
}
