import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  @Get()
  async getUser(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User Not Found`);
    }
    return await this.userModel.findById(id);
  }

  @Post()
  async addUser(@Body() user: User): Promise<User> {
    const savedUser = new this.userModel(user);
    return await savedUser.save();
  }

  @Put()
  async updateUser(
    @Body() user: Partial<User & { _id: string }>,
  ): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        user._id,
        user,
      );
      return updatedUser;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new NotFoundException(`User Not Found`);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = await this.userModel.findByIdAndDelete(id);
      return 'User Deleted Sucessfully';
    } catch {
      throw new NotFoundException(`User Not Found`);
    }
  }
}
