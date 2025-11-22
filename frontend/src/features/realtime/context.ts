import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

export interface RealtimeContextType {
  socket: Socket | null;
  isConnected: boolean;
}

export const RealtimeContext = createContext<RealtimeContextType>({
  socket: null,
  isConnected: false,
});

export const useRealtime = () => useContext(RealtimeContext);
