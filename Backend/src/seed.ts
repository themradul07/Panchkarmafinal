import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Therapist from './models/Therapist';
import Admin from './models/Admin';

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ayurveda');


    // Hash passwords
    const hashPassword = async (password: string) => {
      return await bcrypt.hash(password, 10);
    };

    // Seed Therapists
    const therapists = [
      {
        name: "Dr. Aditi Sharma",
        email: "aditi.therapist@example.com",
        password: await hashPassword("password123"),
        role: "therapist",
        specialization: "Ayurvedic Massage & Panchkarma",
        experience: "8 years",
        location: "Delhi, India"
      },
      {
        name: "Dr. Arjun Mehta",
        email: "arjun.therapist@example.com",
        password: await hashPassword("password123"),
        role: "therapist",
        specialization: "Herbal Therapy & Yoga Counseling",
        experience: "6 years",
        location: "Mumbai, India"
      },
      {
        name: "Dr. Kavita Iyer",
        email: "kavita.therapist@example.com",
        password: await hashPassword("password123"),
        role: "therapist",
        specialization: "Detox & Panchkarma Treatments",
        experience: "10 years",
        location: "Bangalore, India"
      }
    ];

    for (const therapist of therapists) {
      const existing = await Therapist.findOne({ email: therapist.email });
      if (!existing) {
        await Therapist.create(therapist);
        console.log(`Seeded therapist: ${therapist.name}`);
      }
    }

    // Seed Admins
    const admins = [
      {
        name: "Admin One",
        email: "admin1@example.com",
        password: await hashPassword("admin123"),
        role: "admin"
      },
      {
        name: "Super Admin",
        email: "superadmin@example.com",
        password: await hashPassword("superadmin123"),
        role: "admin"
      }
    ];

    for (const admin of admins) {
      const existing = await Admin.findOne({ email: admin.email });
      if (!existing) {
        await Admin.create(admin);
        console.log(`Seeded admin: ${admin.name}`);
      }
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
