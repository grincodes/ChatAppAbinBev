import {
  Injectable,
  CanActivate,
  Inject,
  Logger,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsJwtAuthGuard.name);

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    const { authorization } = client.handshake.headers || client.handshake.auth;

    if (!authorization) {
      return false;
    }

    return this.authClient
      .send('authenticate', {
        Authentication: authorization,
      })
      .pipe(
        tap((res) => {
          client.data.user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }

  static validateToken(
    client: Socket,
    authClient: ClientProxy,
  ): Observable<boolean> {
    const { authorization } = client.handshake.headers || client.handshake.auth;

    if (!authorization) {
      throw new WsException('Unauthorized');
    }

    return authClient
      .send('authenticate', { Authentication: authorization })
      .pipe(
        tap((res) => {
          client.data.user = res;
        }),
        map(() => true),
        catchError((err) => {
          throw new WsException('Unauthorized');
        }),
      );
  }
}
