import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const { username, password } = signInDto;

      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);

      const COOKIE_OPTIONS = {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
      };

      res.cookie('access_token', access_token, COOKIE_OPTIONS);

      const userInfo = { userId: user.id, username: user.username };
      return res.json({ access_token, userInfo });
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res() response: Response) {
    const COOKIE_OPTIONS = {
      httpOnly: true,
      secure: true,
      maxAge: 0, // Immediately expire the cookie
    };

    response.clearCookie('access_token', COOKIE_OPTIONS);

    return response.json({ message: 'Logout successful' });
  }
}
