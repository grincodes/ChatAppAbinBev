import {
  Injectable,
  CanActivate,
  Inject,
  Logger,
  ExecutionContext,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.Authentication ||
      context.switchToHttp().getRequest().headers?.Authorization;

    if (!jwt) {
      return false;
    }

    return this.authClient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}
