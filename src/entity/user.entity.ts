import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  mobNum: number;
}

export type UserDocument = User & Document;

export const userSchema = SchemaFactory.createForClass(User);
