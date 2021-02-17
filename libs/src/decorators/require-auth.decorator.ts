import { SetMetadata } from '@nestjs/common';

export const RequireAuth = (...args: string[]) =>
  SetMetadata('requireAuth', args);
