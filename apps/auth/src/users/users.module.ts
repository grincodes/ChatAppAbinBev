import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule, UserDocument, UserSchema } from '@app/common';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
