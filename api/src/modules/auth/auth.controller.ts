import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from './decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.signUp(registerDto);
  }
}
