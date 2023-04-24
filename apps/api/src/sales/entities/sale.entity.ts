import { Prop, Schema } from '@nestjs/mongoose';
import { uuid } from '../../utils/data/uuid';

@Schema()
export class Sale {
  @Prop({ required: true, default: uuid, unique: true })
  id: string;

  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 0 })
  discount: number;

  @Prop({ required: true, default: 0 })
  tax: number;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  paymentStatus: string;

  @Prop({ required: true })
  paymentId: string;

  @Prop({ required: true })
  paymentAmount: number;

  @Prop({ required: true })
  paymentCurrency: string;

  @Prop({ required: true })
  paymentReceiptUrl: string;

  @Prop({ required: true })
  paymentReceiptNumber: string;

  @Prop({ required: true })
  paymentReceiptStatus: string;

  @Prop({ required: true })
  paymentReceiptCreatedAt: number;

  @Prop({ required: true })
  paymentReceiptPaidAt: number;

  @Prop({ required: true, default: Date.now() })
  createdAt: number;

  @Prop()
  updatedAt?: Date;
}
