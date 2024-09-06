import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('app')
@ApiSecurity('accessToken')
@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get hello message' })
  // @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Hello World!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
