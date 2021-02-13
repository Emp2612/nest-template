## 控制器中鉴权以及权限校验
导入libs中的`RequireAuth`，并且在类或者方法中装饰即可实现鉴权。当接口需要用户拥有某些权限才可访问时，在装饰器中传入权值。

权值由前后端共同约定，因为前端也要做权限校验（单独放在哪边都不太科学，存库里用id的话多租户搞死人）

未登录时，接口会返回 `401`，登录但没权限时，接口会返回 `403`
```javascript
import { RequireAuth } from '@libs/decorators';

@Controller('users')
export class UsersController {
  @Get('profile')
  @RequireAuth('userProfile') // 需要登录，并且需要有userProfile这个权限
  async list(@Request() req) {
    return req.user;
  }
}
```

## 控制器中接收数据并验证/转换类型
使用@Query,@Param,@Body来接收参数，参数少直接在装饰器中接收，如：`@Param('id') id: number`，参数多则创建dto。

项目已在main.ts开启了自动验证，并开启了自动转换类型和白名单

注意：dto中不会自动转换，需要用类似`@Type(() => Number)`来转换类型，如果dto的某个参数是可选的，要给`@IsOptional()`装饰器

## 控制器中返回结果及错误处理
#### 1. 返回正确的的结果：
直接return返回值就行，拦截器会把结果格式化为：
```javascript
{
  statusCode: 200,
  timestamp: new Date().toLocaleString(),
  message: '',
  data: '返回的结果'
}
```
#### 2.抛出错误：
直接使用[nest内置的异常](https://docs.nestjs.cn/7/exceptionfilters?id=%e5%86%85%e7%bd%aehttp%e5%bc%82%e5%b8%b8)，如 `new BadRequestException('需要验证码')`，过滤器会处理为：
```javascript
{
  statusCode: 400,
  timestamp: new Date().toLocaleString(),
  error: 'Bad Request', // 仅开发/测试环境能看到error
  message: '需要验证码',
  data: {}
}
```
如果是是处理一个未知错误，比如或在调用某个第三方API的catch里处理错误，直接抛出这个错误：
```javascript
try {
  // do something
} catch (err) {
  throw err
}
```
同样的，如果不确定该抛出哪个异常，可以直接`throw new Error('错误信息')`，这个做法是不推荐的，对用户不友好。

对于未知的错误，过滤器会处理为：
```javascript
{
  statusCode: 500,
  timestamp: "2021-1-24 1:54:27",
  error: "错误的堆栈信息", // 仅开发/测试环境能看到error
  message: "啊哦！服务器出错了~",
  data: { }
}
```
错误可以在任一地方抛出，不仅限于控制器

#### 3.自定义异常
如果业务中需要自定义一个状态，这个状态他不属于失败，也不属于成功，很纠结（前端一般会判断成功直接执行，失败直接提示并不继续执行）。那么我们可以自定义异常：

** 项目规定自异常的状态码为 450~499 之间（以防和http内置状态码冲突）**

自定义的状态码必须写成枚举放在libs（通用）或各项目（不通用）的 `exceptions/custom.exception.ts` 文件中。

比如，我要让用户必须修改密码，要给前端一个特殊的状态，前端只要一接收到这个状态就强制跳转修改密码页，则：
```javascript
export class NeedChangePasswordException extends HttpException {
  constructor() {
    super('请修改密码', 450);
  }
}
```



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
