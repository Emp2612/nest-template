import { Controller, Get, Post, Request, Body } from '@nestjs/common';
import { RequireAuth } from '@libs/decorators';
import { CreateTestDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @RequireAuth()
  async list(@Request() req) {
    return req.user || 123;
  }

  @Post('create')
  // @RequireAuth('users-create')
  async create(@Body() user: CreateTestDto) {
    return this.usersService.createUser(user);
  }
}
