import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  protected readonly logger = new Logger(MessagesController.name);

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.messagesService.create(createMessageDto, user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: UserDto) {
    return this.messagesService.findAllByUserId(user._id);
  }

  @Get('all-messages')
  @UseGuards(JwtAuthGuard)
  async findAllByUserId() {
    return this.messagesService.findAll();
  }
}
