import React from "react";
import { CheckCircle, MapPin, Star, User } from "lucide-react";

type Therapist = {
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  center: string;
  status: "Pending" | "Approved";
};

const therapists: Therapist[] = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Panchakarma Specialist",
    rating: 4.8,
    experience: "8y exp",
    center: "Bangalore Center",
    status: "Pending",
  },
  {
    name: "Dr. Rajesh Kumar",
    specialty: "Ayurveda Expert",
    rating: 4.9,
    experience: "12y exp",
    center: "Mumbai Center",
    status: "Approved",
  },
  {
    name: "Dr. Anita Patel",
    specialty: "Herbal Medicine",
    rating: 4.7,
    experience: "6y exp",
    center: "Delhi Center",
    status: "Pending",
  },
  {
    name: "Dr. Suresh Gupta",
    specialty: "Panchakarma Detox",
    rating: 4.6,
    experience: "9y exp",
    center: "Bangalore Center",
    status: "Approved",
  },
];

const TherapistApprovalQueue: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-purple-600" />
        Therapist Approval Queue
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="pb-2">Therapist</th>
              <th className="pb-2">Center</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((t, index) => (
              <tr key={index} className="border-b last:border-none">
                {/* Therapist Info */}
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-gray-500 text-xs">
                      {t.specialty}
                    </span>
                    <div className="flex items-center text-xs text-gray-600 mt-1 gap-2">
                      <span className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(t.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </span>
                      <span>{t.rating}</span>
                      <span>{t.experience}</span>
                    </div>
                  </div>
                </td>

                {/* Center */}
                <td className="py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {t.center}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                {/* Action */}
                <td className="py-3">
                  {t.status === "Pending" ? (
                    <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-green-700 bg-green-100 text-xs font-medium">
                      Approved
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TherapistApprovalQueue;
