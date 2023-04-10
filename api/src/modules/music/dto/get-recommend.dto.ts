import { ApiProperty } from '@nestjs/swagger';

export class GetRecommendDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  buffer: Buffer;
}
export class GetImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
