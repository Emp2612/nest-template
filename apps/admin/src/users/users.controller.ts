import { Controller, Get, Request } from '@nestjs/common';
import { RequireAuth } from '@libs/decorators';

@Controller('users')
export class UsersController {
  @Get('profile')
  @RequireAuth('userProfile')
  async list(@Request() req) {
    return req.user || 123;
  }
}
