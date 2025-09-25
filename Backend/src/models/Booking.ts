
import mongoose, { Schema, Document } from 'mongoose';


export interface IBooking extends Document {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: string;
  therapyType: string;
  medicalConditions: string;
  therapyDate: string;
  therapyTime: string;
  therapistId: string;
  consultationFee: number;
  status: string;
}


const BookingSchema: Schema = new Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientAge: { type: String, required: true },
  therapyType: { type: String, required: true },
  medicalConditions: { type: String },
  therapyDate: { type: String, required: true },
  therapyTime: { type: String, required: true },
  therapistId: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'confirmed' },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
