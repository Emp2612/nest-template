import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [AdminService],
})
export class AdminModule {}
