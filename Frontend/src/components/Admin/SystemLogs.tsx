import { UserPlus, Calendar, Bell, Database, Activity } from "lucide-react";

type LogItem = {
  id: number;
  title: string;
  by: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
};

const logs: LogItem[] = [
  {
    id: 1,
    title: "Therapist registered",
    by: "Admin",
    description: "Dr. Anita Patel registered for Mumbai Center",
    time: "11:10 PM",
    icon: <UserPlus className="w-5 h-5" />,
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Booking created",
    by: "Amit Patel",
    description: "Abhyanga session scheduled for tomorrow",
    time: "10:14 AM",
    icon: <Calendar className="w-5 h-5" />,
    color: "bg-green-400",
  },
  {
    id: 3,
    title: "Notification sent",
    by: "System",
    description: "SMS reminder sent to 15 patients",
    time: "05:36 PM",
    icon: <Bell className="w-5 h-5" />,
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "System backup completed",
    by: "Amit Patel",
    description: "Daily backup completed at 2:30 AM",
    time: "04:21 PM",
    icon: <Database className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  {
    id: 5,
    title: "Feedback received",
    by: "Amit Patel",
    description: "5-star rating received from Vikram Joshi",
    time: "03:05 PM",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-orange-500",
  },
];

const SystemLogs = () => {
  return (
    <div className="rounded-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">System Logs</h2>
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start bg-white rounded-lg p-4 shadow relative"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white ${log.color}`}
            >
              {log.icon}
            </div>
            <div className="ml-3 flex-1">
              <p className="font-medium">{log.title}</p>
              <p className="text-xs text-gray-500">by {log.by}</p>
              <p className="text-sm">{log.description}</p>
            </div>
            <span className="absolute top-3 right-3 text-xs text-gray-400">
              {log.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;
