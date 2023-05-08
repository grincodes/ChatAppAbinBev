import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  receiverUserId: string;

  @IsString()
  @IsNotEmpty()
  messageBody: string;
}
