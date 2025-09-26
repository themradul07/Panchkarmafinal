import { useState, useEffect } from "react";
import { Activity, Clock, MapPin, User } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SystemLogs from "@/components/Admin/SystemLogs";
import Navbar from "@/components/Admin/Navbar";

export default function Dashboard() {
  // Mock session data
  const [active , setActive ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(!active);
      
    }, 3000);
  }, [active]);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      patient: "Priya Sharma",
      therapy: "Shirodhara",
      time: "02:47 AM",
      center: "Delhi Center",
      therapist: "Dr. Kumar",
      duration: "120min",
      status: "Scheduled",
    },
    {
      id: 2,
      patient: "Priya Sharma",
      therapy: "Shirodhara",
      time: "03:00 AM",
      center: "Delhi Center",
      therapist: "Dr. Gupta",
      duration: "120min",
      status: "Ongoing",
    },
    {
      id: 3,
      patient: "Deepika Singh",
      therapy: "Abhyanga",
      time: "04:00 AM",
      center: "Mumbai Center",
      therapist: "Dr. Gupta",
      duration: "90min",
      status: "Ongoing",
    },
     {
      id: 1,
      patient: "Priya Sharma",
      therapy: "Shirodhara",
      time: "02:47 AM",
      center: "Delhi Center",
      therapist: "Dr. Kumar",
      duration: "120min",
      status: "Scheduled",
    },
    {
      id: 2,
      patient: "Priya Sharma",
      therapy: "Shirodhara",
      time: "03:00 AM",
      center: "Delhi Center",
      therapist: "Dr. Gupta",
      duration: "120min",
      status: "Ongoing",
    },
    {
      id: 3,
      patient: "Deepika Singh",
      therapy: "Abhyanga",
      time: "04:00 AM",
      center: "Mumbai Center",
      therapist: "Dr. Gupta",
      duration: "90min",
      status: "Ongoing",
    },
  ]);

  // Mock analytics data
  const analytics = [
    { day: "Mon", sessions: 22 },
    { day: "Tue", sessions: 26 },
    { day: "Wed", sessions: 31 },
    { day: "Thu", sessions: 20 },
    { day: "Fri", sessions: 34 },
    { day: "Sat", sessions: 42 },
    { day: "Sun", sessions: 36 },
  ];

  // Real-time simulation: update sessions every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.status === "Scheduled" ? { ...s, status: "Ongoing" } : s
        )
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="flex">
      <Navbar />

    

    <div className='max-h-screen flex-1  bg-green-50  overflow-y-auto'>
    <div className="p-8 min-h-screen  w-[100%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">
            Live overview of clinic activities and performance.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white shadow text-sm">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Live Updates
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Sessions */}
        <div className="lg:col-span-1">

        
        <div className=" bg-white rounded-xl shadow p-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Activity size={18} className="text-green-600" />
            Live Sessions
            <img src="./Loader.svg" className={`size-6 ${active? '': 'hidden'}`} alt="" />
          </h2>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="border rounded-lg p-4 flex flex-col gap-1 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium flex items-center gap-2">
                    <User size={16} /> {s.patient}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "Ongoing"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{s.therapy}</p>
                <div className="flex items-center text-xs text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {s.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {s.center}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Therapist: {s.therapist} • {s.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Analytics Overview */}
        <div className="flex-col  gap-20 lg:col-span-2">
          <div className="  bg-white rounded-xl shadow p-4">

            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Activity size={18} className="text-green-600" />
              Analytics Overview
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-700">245</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-700">4.5</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-xl shadow p-4 mt-4">
            <SystemLogs />
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
