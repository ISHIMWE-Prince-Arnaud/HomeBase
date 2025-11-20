import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest<{ user?: { id?: number } }>();
    const id = req.user?.id;
    if (typeof id !== 'number') {
      throw new BadRequestException('user id is missing');
    }
    return id;
  },
);
