import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'User name',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Password123!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'admin@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
