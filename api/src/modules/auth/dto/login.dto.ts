import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
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
}
