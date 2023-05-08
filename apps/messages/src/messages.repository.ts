import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { MessageDocument } from './models/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository extends AbstractRepository<MessageDocument> {
  protected readonly logger = new Logger(MessageRepository.name);

  constructor(
    @InjectModel(MessageDocument.name)
    messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }
}
