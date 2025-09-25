import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapy extends Document {
  name: string;
  description: string;
  price: number;
}

const TherapySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ITherapy>('Therapy', TherapySchema);
