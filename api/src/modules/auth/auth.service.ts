import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user: User = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user: User = await this.userService.create(createUserDto);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
