import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class MessageDocument extends AbstractDocument {
  @Prop()
  senderUserId: string;

  @Prop()
  receiverUserId: string;

  @Prop()
  messageBody: string;

  @Prop()
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
