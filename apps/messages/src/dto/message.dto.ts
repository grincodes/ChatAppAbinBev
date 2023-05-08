import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  senderUserId: string;

  @IsString()
  @IsNotEmpty()
  receiverUserId: string;

  @IsString()
  @IsNotEmpty()
  messageBody: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  timestamp: Date;
}
