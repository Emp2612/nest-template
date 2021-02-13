import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RequireAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const requireAuth = this.reflector.getAllAndOverride<string[]>('requireAuth', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireAuth) {
      return true;
    }
    const res = await super.canActivate(context);
    if (res && requireAuth.length) {
      const { user } = context.switchToHttp().getRequest();
      return requireAuth.some(permission => user.permission?.includes(permission) || false);
    }
    return !!res
  }
}