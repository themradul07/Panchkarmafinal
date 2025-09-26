import React from "react";
import { MessageSquare, Star, X } from "lucide-react";

type Feedback = {
  patient: string;
  rating: number;
  treatment: string;
  doctor: string;
  date: string;
  feedback: string;
  responded?: boolean;
};

const feedbacks: Feedback[] = [
  {
    patient: "Amit Singh",
    rating: 5,
    treatment: "Abhyanga",
    doctor: "Dr. Priya Sharma",
    date: "2024-01-15",
    feedback:
      "Excellent treatment! Dr. Sharma is very knowledgeable and the massage was incredibly relaxing.",
  },
  {
    patient: "Deepika Rao",
    rating: 4,
    treatment: "Shirodhara",
    doctor: "Dr. Rajesh Kumar",
    date: "2024-01-14",
    feedback:
      "Good experience overall. The treatment was effective, though the facility could be improved.",
  },
  {
    patient: "Vikram Joshi",
    rating: 5,
    treatment: "Panchakarma Detox",
    doctor: "Dr. Anita Patel",
    date: "2024-01-13",
    feedback:
      "Amazing detox program! I feel completely rejuvenated. Dr. Patel guided me through every step professionally.",
    responded: true,
  },
];

const PatientFeedback: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-pink-600" />
          Patient Feedback
          <span className="ml-2 bg-pink-100 text-pink-700 px-2 py-0.5 text-xs rounded-full font-medium">
            {feedbacks.length} total
          </span>
        </h2>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbacks.map((f, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-xl relative shadow-sm"
          >
            {/* Remove button */}
            <button className="absolute top-3 right-3 text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>

            {/* Patient Name + Rating */}
            <div className="flex items-center gap-2 font-medium">
              {f.patient}
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < f.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {f.responded && (
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  Responded
                </span>
              )}
            </div>

            {/* Treatment + Doctor + Date */}
            <p className="text-gray-600 text-sm mt-1">
              {f.treatment} • {f.doctor} • {f.date}
            </p>

            {/* Feedback Text */}
            <p className="text-gray-700 mt-2 text-sm">{f.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientFeedback;
