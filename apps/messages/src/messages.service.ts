import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { WsMessageGateway } from './ws-message-gateway/ws-message.gateway';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private wsMessageGateway: WsMessageGateway,
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const createdMsg = await this.messageRepository.create({
      ...createMessageDto,
      timestamp: new Date(),
      senderUserId: userId,
    });

    this.wsMessageGateway.sendMessage(createdMsg);
    return createdMsg;
  }

  async wsCreateMsg(createMessageDto: MessageDto) {
    const createdMsg = await this.messageRepository.create({
      ...createMessageDto,
      timestamp: new Date(),
    });
    return createdMsg;
  }
  async findAll() {
    return this.messageRepository.find({});
  }

  async findAllByUserId(userId: string) {
    return this.messageRepository.find({
      $or: [
        { receiverUserId: { $eq: userId } },
        { senderUserId: { $eq: userId } },
      ],
    });
  }
}
