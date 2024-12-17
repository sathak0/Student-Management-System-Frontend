import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, User } from 'src/entity/user.entity';
import { UserController } from 'src/user/user.controller';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
})
export class UserModule {}
