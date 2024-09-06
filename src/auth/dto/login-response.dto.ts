import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoibml0aXNoIiwiaWF0IjoxNzI1NTU1Nzc0LCJleHAiOjE3MjU1NTkzNzR9.Mg4_Q2QG8H0wdZaNuGjG2ZBCDDTgHLcx7lqlUTgOYLE',
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    example: {
      userId: 1,
      username: 'nitish',
    },
  })
  userInfo: {
    userId: number;
    username: string;
  };
}
