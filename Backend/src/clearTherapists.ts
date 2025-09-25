import mongoose from 'mongoose';
import Therapist from './models/Therapist';

const clearTherapists = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ayurveda');
    await Therapist.deleteMany({});
    console.log('All therapists deleted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to delete therapists:', error);
    process.exit(1);
  }
};

clearTherapists();
