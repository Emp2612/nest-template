import { NeedChangePasswordException, TestException } from '@libs/exceptions';
import { Controller, Get, BadRequestException, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto'

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) {}

  @Get()
  list(@Query() createTestDto: CreateTestDto) {
    // return createTestDto
    // throw new HttpException({
    //   error: '',
    //   message: '无权限',
    // }, HttpStatus.FORBIDDEN);
    // return 'abc'
    try {
      throw new Error('请填写姓名')
    } catch (e) {
      throw new TestException('123')
      throw new NeedChangePasswordException()
      throw e
      throw new Error()
      throw new Error('错误信息')
      throw new BadRequestException(e.message);
    }
  }
  @Get('/a')
  detail(@Query('id') id: number) {
    return id
  }
}
