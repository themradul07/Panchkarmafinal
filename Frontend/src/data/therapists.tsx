import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

export interface Therapist {
  id: string;
  user: string | null;
  name: string;
  designation: string;
  experience: number;
  clinic: string;
  specializations: string[];
  rating: number;
  totalReviews: number;
  image: string;
  location: string;
  bio: string;
  education: string[];
  languages: string[];
  consultationFee: number;
  certifications: string[];
  availableTimeSlots: string[];
  availableDays: string[]; 
  createdAt: string;
  __v: number;
 
}

export const therapistsData: Therapist[] = [
    {
      "id": "68b85d7239f5012a48864d9c",
      "user": null,
      "name": "Dr. Anjali Sharma",
      "designation": "BAMS, Panchakarma Specialist",
      "experience": 8,
      "clinic": "Ayush Panchakarma Wellness Center",
      "specializations": [
        "Panchakarma Therapy",
        "Detoxification",
        "Stress Management"
      ],
      "rating": 4.5,
      "totalReviews": 120,
      "image": "https://randomuser.me/api/portraits/women/45.jpg",
      "location": "Delhi, India",
      "certifications": [
        "Certified Panchakarma Therapist - NIA Pune"
      ],
      "bio": "Expert Ayurvedic doctor specializing in detox and rejuvenation through Panchakarma.",
      "availableDays": [
        "Monday",
        "Wednesday",
        "Friday"
      ],
      "availableTimeSlots": [
        "10:00 AM - 1:00 PM",
        "5:00 PM - 8:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.657Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 800
    },
    {
      "id": "68b85d7239f5012a48864d9d",
      "user": null,
      "name": "Dr. Ramesh Verma",
      "designation": "BAMS, MD Ayurveda",
      "experience": 12,
      "clinic": "Kerala Ayurveda Healing Center",
      "specializations": [
        "Vamana",
        "Virechana",
        "Nasya",
        "Raktamokshana"
      ],
      "rating": 4.8,
      "totalReviews": 210,
      "image": "https://randomuser.me/api/portraits/men/32.jpg",
      "location": "Mumbai, India",
      "certifications": [
        "MD in Ayurvedic Panchakarma"
      ],
      "bio": "Renowned Ayurvedic physician practicing traditional Panchakarma therapies for holistic healing.",
      "availableDays": [
        "Tuesday",
        "Thursday",
        "Saturday"
      ],
      "availableTimeSlots": [
        "9:00 AM - 12:00 PM",
        "3:00 PM - 6:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.658Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 1000
    },
    {
      "id": "68b85d7239f5012a48864d9e",
      "user": null,
      "name": "Dr. Priya Nair",
      "designation": "BAMS, Panchakarma Consultant",
      "experience": 7,
      "clinic": "Sanjeevani Ayurveda Hospital",
      "specializations": [
        "Rejuvenation Therapy",
        "Pain Management",
        "Digestive Disorders"
      ],
      "rating": 4.6,
      "totalReviews": 95,
      "image": "https://randomuser.me/api/portraits/women/33.jpg",
      "location": "Kochi, Kerala",
      "certifications": [
        "Advanced Panchakarma Therapy Course - AYUSH"
      ],
      "bio": "Dedicated therapist providing authentic Kerala Panchakarma treatments.",
      "availableDays": [
        "Monday",
        "Tuesday",
        "Thursday"
      ],
      "availableTimeSlots": [
        "11:00 AM - 2:00 PM",
        "4:00 PM - 7:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.659Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 900
    },
    {
      "id": "68b85d7239f5012a48864d9f",
      "user": null,
      "name": "Dr. Arvind Kulkarni",
      "designation": "BAMS, Ayurveda Specialist",
      "experience": 15,
      "clinic": "Ayurved Gram Panchakarma Center",
      "specializations": [
        "Body Detox",
        "Neurological Disorders",
        "Respiratory Therapies"
      ],
      "rating": 4.9,
      "totalReviews": 300,
      "image": "https://randomuser.me/api/portraits/men/45.jpg",
      "location": "Pune, India",
      "certifications": [
        "Diploma in Panchakarma Therapy"
      ],
      "bio": "Specialist in ancient Panchakarma therapies aimed at mind-body detoxification.",
      "availableDays": [
        "Monday",
        "Wednesday",
        "Friday",
        "Saturday"
      ],
      "availableTimeSlots": [
        "10:30 AM - 1:30 PM",
        "6:00 PM - 9:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.659Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 850
    },
    {
      "id": "68b85d7239f5012a48864da0",
      "user": null,
      "name": "Dr. Meera Iyer",
      "designation": "BAMS, Panchakarma Expert",
      "experience": 9,
      "clinic": "Shanti Ayurveda Panchakarma Kendra",
      "specializations": [
        "Skin Disorders",
        "Weight Management",
        "Stress Relief"
      ],
      "rating": 4.7,
      "totalReviews": 160,
      "image": "https://randomuser.me/api/portraits/women/52.jpg",
      "location": "Bangalore, India",
      "certifications": [
        "NAD Panchakarma Certification"
      ],
      "bio": "Focused on holistic healing and rejuvenation using Panchakarma therapies.",
      "availableDays": [
        "Tuesday",
        "Thursday",
        "Saturday"
      ],
      "availableTimeSlots": [
        "9:30 AM - 12:30 PM",
        "5:30 PM - 8:30 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.660Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 950
    },
    {
      "id": "68b85d7239f5012a48864da1",
      "user": null,
      "name": "Dr. Shubham Patil",
      "designation": "BAMS, MD Ayurveda",
      "experience": 11,
      "clinic": "Vedant Panchakarma Ayurved",
      "specializations": [
        "Obesity Therapy",
        "Metabolic Disorders",
        "Panchakarma Detox"
      ],
      "rating": 4.4,
      "totalReviews": 88,
      "image": "https://randomuser.me/api/portraits/men/23.jpg",
      "location": "Nagpur, India",
      "certifications": [
        "MD Ayurveda - Panchakarma Specialization"
      ],
      "bio": "Ayurvedic physician advocating natural detox therapies for a healthier lifestyle.",
      "availableDays": [
        "Monday",
        "Wednesday",
        "Friday"
      ],
      "availableTimeSlots": [
        "10:00 AM - 2:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.660Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 750
    },
    {
      "id": "68b85d7239f5012a48864da2",
      "user": null,
      "name": "Dr. Neha Joshi",
      "designation": "BAMS, Panchakarma Specialist",
      "experience": 6,
      "clinic": "Ayushakti Ayurved Health Center",
      "specializations": [
        "Migraine Relief",
        "Joint Pains",
        "Stress Relief"
      ],
      "rating": 4.3,
      "totalReviews": 75,
      "image": "https://randomuser.me/api/portraits/women/67.jpg",
      "location": "Ahmedabad, India",
      "certifications": [
        "Certified Panchakarma Healer"
      ],
      "bio": "Helping patients restore balance through Panchakarma Ayurvedic therapies.",
      "availableDays": [
        "Tuesday",
        "Thursday",
        "Sunday"
      ],
      "availableTimeSlots": [
        "8:00 AM - 11:00 AM",
        "4:00 PM - 7:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.660Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 1200
    },
    {
      "id": "68b85d7239f5012a48864da3",
      "user": null,
      "name": "Dr. Sanjay Mishra",
      "designation": "BAMS, Ayurveda Specialist",
      "experience": 20,
      "clinic": "Ayush Panchakarma Chikitsalay",
      "specializations": [
        "Respiratory Therapy",
        "Diabetes Management",
        "Vamana"
      ],
      "rating": 5,
      "totalReviews": 420,
      "image": "https://randomuser.me/api/portraits/men/56.jpg",
      "location": "Varanasi, India",
      "certifications": [
        "PhD in Ayurveda - Panchakarma Research"
      ],
      "bio": "Senior Ayurvedic consultant with two decades of experience in Panchakarma.",
      "availableDays": [
        "Monday",
        "Tuesday",
        "Thursday",
        "Saturday"
      ],
      "availableTimeSlots": [
        "9:00 AM - 12:00 PM",
        "3:00 PM - 6:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.660Z",
      "__v": 0,
      education: [],
      languages: [],
  consultationFee: 700
    },
    {
      "id": "68b85d7239f5012a48864da4",
      "user": null,
      "name": "Dr. Kavita Deshmukh",
      "designation": "BAMS, Panchakarma Therapist",
      "experience": 5,
      "clinic": "Aarogyam Ayurvedic Panchakarma",
      "specializations": [
        "Female Health",
        "Detox",
        "Skin Rejuvenation"
      ],
      "rating": 4.2,
      "totalReviews": 64,
      "image": "https://randomuser.me/api/portraits/women/21.jpg",
      "location": "Indore, India",
      "certifications": [
        "Certified Ayurvedic Wellness Therapist"
      ],
      "bio": "Dedicated Panchakarma therapist with focus on women's health & detox.",
      "availableDays": [
        "Wednesday",
        "Friday",
        "Sunday"
      ],
      "availableTimeSlots": [
        "11:00 AM - 2:00 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.661Z",
      "__v": 0,
      education: [],
      languages: [],
      consultationFee: 0
    },
    {
      "id": "68b85d7239f5012a48864da5",
      "user": null,
      "name": "Dr. Rohit Bhat",
      "designation": "BAMS, MD Ayurveda",
      "experience": 13,
      "clinic": "Swasthya Panchakarma Ayurved",
      "specializations": [
        "Neurological Disorders",
        "Panchakarma Detox",
        "Rejuvenation"
      ],
      "rating": 4.6,
      "totalReviews": 180,
      "image": "https://randomuser.me/api/portraits/men/77.jpg",
      "location": "Jaipur, India",
      "certifications": [
        "MD Ayurveda - Panchakarma"
      ],
      "bio": "Combining classical Panchakarma techniques with modern practices for better results.",
      "availableDays": [
        "Monday",
        "Thursday",
        "Saturday"
      ],
      "availableTimeSlots": [
        "10:30 AM - 1:30 PM",
        "5:30 PM - 8:30 PM"
      ],
      "createdAt": "2025-09-03T15:23:30.661Z",
      "__v": 0,
      education: [],
      languages: [],
      consultationFee: 0
    }
];