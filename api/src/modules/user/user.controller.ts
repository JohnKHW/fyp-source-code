import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('JWT-auth')
  @Get('favour/:song_id')
  toggleFavour(@Param('song_id') song_id: string, @Req() req) {
    const username: string = req.user.username;
    return this.userService.toggleFavour(song_id, username);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('listen/:song_id')
  listenSong(@Param('song_id') song_id: string, @Req() req) {
    const username: string = req.user.username;
    return this.userService.listenSong(song_id, username);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('history')
  history(@Req() req) {
    const username: string = req.user.username;
    return this.userService.history(username);
  }

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
