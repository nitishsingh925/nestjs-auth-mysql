import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile successfully retrieved',
    type: UserResponseDto,
  })
  // @ApiSecurity('accessToken')
  @ApiBearerAuth('accessToken')
  @ApiCookieAuth('access_token')
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const userId = req.user.id;
    return this.usersService.findOneById(userId);
  }
}
