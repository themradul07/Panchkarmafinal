import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapist extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  specialization: string;
  experience: string;
  location: string;
}

const TherapistSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'therapist' },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ITherapist>('Therapist', TherapistSchema, 'therapists');
