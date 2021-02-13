import { HttpExceptionFilter } from '@libs/exceptions';
import { TransformInterceptor } from '@libs/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { RequireAuthGuard } from './auth/require-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const reflector = app.get(Reflector)
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalGuards(new RequireAuthGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
  await app.listen(3000);
  console.log('http://localhost:3000');
  // todo 错误为数组时
}
bootstrap();
