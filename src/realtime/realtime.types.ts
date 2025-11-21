import type { DefaultEventsMap, RemoteSocket, Server, Socket } from 'socket.io';

export type SocketEventsMap = DefaultEventsMap;

export interface RealtimeSocketData {
  userId?: number;
  householdId?: number;
}

export type RealtimeServer = Server<
  SocketEventsMap,
  SocketEventsMap,
  SocketEventsMap,
  RealtimeSocketData
>;

export type GatewaySocket = Socket<
  SocketEventsMap,
  SocketEventsMap,
  SocketEventsMap,
  RealtimeSocketData
>;

export type HouseholdRemoteSocket = RemoteSocket<
  SocketEventsMap,
  RealtimeSocketData
>;
