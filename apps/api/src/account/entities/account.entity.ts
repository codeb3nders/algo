import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from '../../utils/data/uuid';

@Schema()
export class Account {
  @Prop({ required: true, default: uuid, unique: true })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  middleName: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true, unique: true })
  businessEmail: string;

  @Prop({ required: true })
  businessAddress: string;

  @Prop({ required: true })
  businessContactNumber: string;

  @Prop({ default: Date.now() })
  createdAt: number;

  @Prop()
  updatedAt?: Date;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
