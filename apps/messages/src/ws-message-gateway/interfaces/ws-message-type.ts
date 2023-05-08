import { MessageType } from '@app/common';

export interface WsMessageType {
  newMessage: (payload: MessageType) => void;
}
