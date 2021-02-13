import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const isHttpException = exception instanceof HttpException
    const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionRes: any = isHttpException ? exception.getResponse() : exception;

    const error = isHttpException ? exceptionRes?.error : exceptionRes?.stack
    let message = isHttpException ? exceptionRes?.message || exceptionRes : `啊哦！服务器出错了~${exceptionRes?.message}`
    if (Array.isArray(message)) {
      message = message.join('；')
    }
    
    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toLocaleString(),
      error,
      message,
      data: {}
    });
  }
}
