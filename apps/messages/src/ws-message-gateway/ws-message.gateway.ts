import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsMessageType } from './interfaces/ws-message-type';
import { AUTH_SERVICE, MessageType } from '@app/common';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '@app/common/auth/ws-jwt-auth.guard';
import { SocketAuthMiddleware } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagesService } from '../messages.service';
import { MessageDto } from '../dto/message.dto';

@WebSocketGateway({
  namespace: 'ws-gateway',
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtAuthGuard)
export class WsMessageGateway {
  @WebSocketServer()
  server: Server<WsMessageType, WsMessageType>;
  protected readonly logger = new Logger(WsMessageGateway.name);
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  async afterInit(server: Server) {
    console.log('Socket server initialized');
    this.server.use((socket: Socket, next) => {
      WsJwtAuthGuard.validateToken(socket, this.authClient).subscribe(
        () => next(),
        (error) => next(error),
      );
    });
  }

  @SubscribeMessage('sendMessage')
  async createMessage(client: any, payload: MessageDto) {
    // const msg = await this.msgService.wsCreateMsg(payload);
    payload.timestamp = new Date();
    this.server.emit('newMessage', payload);
    return payload;
  }

  sendMessage(message: MessageType) {
    this.server.emit('newMessage', message);
  }
}
