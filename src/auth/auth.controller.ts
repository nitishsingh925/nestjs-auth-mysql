import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    try {
      const { username, password } = signInDto;

      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);

      const userInfo = { userId: user.id, username: user.username };
      return { access_token, userInfo };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred during login',
        );
      }
    }
  }
}
