import { ClientProxy } from '@nestjs/microservices';
import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from '../ws-jwt-auth.guard';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  authClient: ClientProxy,
): SocketIOMiddleware => {
  return (client, next) => {
    try {
      WsJwtAuthGuard.validateToken(client, authClient);
      next();
    } catch (error) {
      next(error);
    }
  };
};
