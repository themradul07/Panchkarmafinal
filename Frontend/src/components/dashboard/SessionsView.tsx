import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, MoreHorizontal, Edit } from "lucide-react";

export const SessionsView = () => {
  const upcomingSessions = [
    {
      id: 1,
      therapy: "Abhyanga Massage",
      date: "2025-01-15",
      time: "10:00 AM",
      duration: "60 min",
      therapist: "Dr. Priya Sharma",
      location: "Therapy Room 1",
      status: "confirmed"
    },
    {
      id: 2,
      therapy: "Shirodhara",
      date: "2025-01-17",
      time: "2:00 PM",
      duration: "45 min",
      therapist: "Dr. Raj Kumar",
      location: "Therapy Room 2",
      status: "confirmed"
    },
    {
      id: 3,
      therapy: "Panchakarma Consultation",
      date: "2025-01-20",
      time: "11:00 AM",
      duration: "30 min",
      therapist: "Dr. Priya Sharma",
      location: "Consultation Room",
      status: "pending"
    }
  ];

  const pastSessions = [
    {
      id: 4,
      therapy: "Initial Consultation",
      date: "2025-01-10",
      time: "3:00 PM",
      duration: "45 min",
      therapist: "Dr. Priya Sharma",
      location: "Consultation Room",
      status: "completed"
    },
    {
      id: 5,
      therapy: "Abhyanga Massage",
      date: "2025-01-12",
      time: "10:00 AM",
      duration: "60 min",
      therapist: "Dr. Raj Kumar",
      location: "Therapy Room 1",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-wellness text-white";
      case "pending":
        return "bg-accent text-accent-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">My Sessions</h1>
        <p className="text-muted-foreground">Manage your Panchkarma therapy appointments</p>
      </div>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-wellness-light/10 rounded-lg border border-wellness-light/30 hover:shadow-sm transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-primary">{session.therapy}</h3>
                    <Badge className={getStatusColor(session.status)} variant="secondary">
                      {session.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {session.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.time} ({session.duration})
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {session.location}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    with {session.therapist}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Reschedule
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Clock className="w-5 h-5 mr-2" />
            Past Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-muted"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-foreground">{session.therapy}</h3>
                    <Badge className={getStatusColor(session.status)} variant="secondary">
                      {session.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {session.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.time} ({session.duration})
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {session.location}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    with {session.therapist}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};