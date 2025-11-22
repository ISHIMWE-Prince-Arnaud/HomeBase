import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }
    const cookieExtractor = (req: Request): string | null => {
      const raw = req.headers?.cookie;
      if (!raw) return null;
      const parts = raw.split(';');
      for (const part of parts) {
        const [k, ...rest] = part.trim().split('=');
        if (k === 'access_token') {
          return decodeURIComponent(rest.join('='));
        }
      }
      return null;
    };
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: secret,
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Optional: remove sensitive info like password
    const { id, email, name, householdId } = user;
    return { id, email, name, householdId } as Omit<User, 'password'>;
  }
}
