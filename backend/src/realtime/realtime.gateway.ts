import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { RealtimeService } from './realtime.service';
import { householdRoom, userRoom, RealtimeEvents } from './realtime.events';
import type { GatewaySocket, RealtimeServer } from './realtime.types';

@WebSocketGateway({ cors: { origin: true, credentials: true } })
export class RealtimeGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(RealtimeGateway.name);

  @WebSocketServer()
  private readonly server!: RealtimeServer;

  constructor(
    private readonly realtime: RealtimeService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  afterInit(server: Server) {
    this.realtime.registerServer(server);
    this.logger.log('Realtime gateway initialized');
  }

  async handleConnection(socket: GatewaySocket) {
    const token = this.extractToken(socket);
    if (!token) {
      this.logger.warn('Socket rejected: missing auth token');
      socket.disconnect(true);
      return;
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: number }>(token);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, householdId: true },
      });
      if (!user) {
        this.logger.warn('Socket rejected: user not found');
        socket.disconnect(true);
        return;
      }

      socket.data.userId = user.id;
      socket.data.householdId = user.householdId ?? undefined;
      await socket.join(userRoom(user.id));
      if (user.householdId) {
        await socket.join(householdRoom(user.householdId));
      }
      socket.emit(RealtimeEvents.CONNECTION_READY, {
        userId: user.id,
        householdId: user.householdId ?? null,
      });
      this.logger.log(`Socket connected for user ${user.id}`);
    } catch (error) {
      this.logger.warn(
        `Socket authentication failed: ${(error as Error).message}`,
      );
      socket.disconnect(true);
    }
  }

  handleDisconnect(socket: GatewaySocket) {
    if (socket.data.userId) {
      this.logger.log(`Socket disconnected for user ${socket.data.userId}`);
    }
  }

  private extractToken(socket: GatewaySocket) {
    const authHeader = socket.handshake.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    const tokenFromAuth: unknown = socket.handshake.auth?.token;
    if (typeof tokenFromAuth === 'string') {
      return tokenFromAuth.startsWith('Bearer ')
        ? tokenFromAuth.slice(7)
        : tokenFromAuth;
    }
    const tokenFromQuery: unknown = socket.handshake.query?.token;
    if (typeof tokenFromQuery === 'string') {
      return tokenFromQuery.startsWith('Bearer ')
        ? tokenFromQuery.slice(7)
        : tokenFromQuery;
    }
    return null;
  }
}
