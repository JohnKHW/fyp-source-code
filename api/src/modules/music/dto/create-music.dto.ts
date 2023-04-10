import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMusicDto {
  @ApiProperty({
    required: true,
    description: 'Song Name',
    example: 'More Plastic & URBANO - Psycho [NCS Release]',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    description: 'Artist name',
    example: 'More Plastic & URBANO',
  })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty({
    required: true,
    description: 'Thumbnail URL',
    example: 'https://i.ytimg.com/vi/-QKgzYTPSEo/sddefault.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    required: true,
    description: 'Song URL',
    example: 'https://www.youtube.com/watch?v=-QKgzYTPSEo',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    required: true,
    description: 'Song duration in seconds',
    example: 120,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
