import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'nitish',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'nitish@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'Nitish Singh',
  })
  name: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$S/wXZaoLJStvVudBeT3/JeQMReSL1x0iTLg52Nwu7l7tq8.wUrHwK',
  })
  password: string;

  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;
}
