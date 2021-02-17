import { HttpException } from '@nestjs/common';

// 项目规定自异常的状态码为 450~499 之间（以防和http内置状态码冲突）

export class NeedChangePasswordException extends HttpException {
  constructor(message?: string) {
    super(
      message || '当前使用的密码泄露风险高，为了你的账户安全，请立即修改密码',
      450,
    );
  }
}

export class TestException extends HttpException {
  constructor(message?: string) {
    super(message || 'test', 451);
  }
}
