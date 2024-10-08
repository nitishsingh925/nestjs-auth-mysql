import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    description: 'The password of the user',
    example: 'strong@Password123',
  })
  password: string;
}
