import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'nitish',
  })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strong@Password123',
  })
  password: string;
}
