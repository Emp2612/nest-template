import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AdminModule {}
