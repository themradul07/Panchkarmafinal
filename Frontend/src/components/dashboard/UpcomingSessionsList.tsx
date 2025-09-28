import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Session {
  id: string;
  patientName: string;
  date: string;
  time: string;
  room: string;
  status: "completed" | "in-progress" | "pending";
  notes?: string;
}

interface UpcomingSessionsListProps {
  sessions: Session[];
}

const statusColorMap = {
  "in-progress": "bg-yellow-100 text-yellow-800",
  pending: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800", // Fallback, though unlikely for upcoming
};

const UpcomingSessionsList: React.FC<UpcomingSessionsListProps> = ({ sessions }) => {
  return (
    <Card className="shadow-md rounded-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-green-700">Upcoming Sessions</CardTitle>
        <button className="text-sm text-green-600 hover:underline">View All →</button>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session.id} className="border-b border-gray-200 pb-3 last:border-none">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <User className="w-4 h-4 text-gray-500" />
                  {session.patientName}
                  <Badge className={`${statusColorMap[session.status]} ml-auto`}>{session.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">{session.room}</div>
                </div>
                {session.notes && <p className="text-sm text-gray-700 mt-1">{session.notes}</p>}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSessionsList;
