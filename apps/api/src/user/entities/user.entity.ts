import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from '../../utils/data/uuid';

@Schema()
export class User {
  @Prop({ required: true, default: uuid, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  accountId: string;

  @Prop()
  access: string;

  @Prop({ default: Date.now() })
  createdAt: number;

  @Prop()
  updatedAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
