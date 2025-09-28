import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Lightbulb, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const NotificationsView = () => {
  const notifications = [
    {
      id: 1,
      type: "reminder",
      title: "Session Reminder",
      message: "Abhyanga Massage scheduled for tomorrow at 10:00 AM",
      time: "2 hours ago",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "tip",
      title: "Daily Wellness Tip",
      message: "Start your day with warm water and lemon for better digestion",
      time: "6 hours ago",
      read: true,
      priority: "normal"
    },
    {
      id: 3,
      type: "alert",
      title: "Preparation Required",
      message: "Please fast for 2 hours before your Shirodhara session on Jan 17",
      time: "1 day ago",
      read: false,
      priority: "high"
    },
    {
      id: 4,
      type: "system",
      title: "Report Available",
      message: "Your progress assessment report is ready for download",
      time: "2 days ago",
      read: true,
      priority: "normal"
    },
    {
      id: 5,
      type: "reminder",
      title: "Medication Reminder",
      message: "Take your prescribed herbal supplements with evening meal",
      time: "3 days ago",
      read: true,
      priority: "normal"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="w-5 h-5" />;
      case "tip":
        return <Lightbulb className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      case "system":
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") {
      return "text-destructive";
    }
    switch (type) {
      case "reminder":
        return "text-primary";
      case "tip":
        return "text-accent";
      case "alert":
        return "text-destructive";
      case "system":
        return "text-wellness";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "normal":
        return <Badge variant="secondary" className="text-xs">Normal</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your treatment schedule and wellness tips</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Total Notifications</h3>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Unread</h3>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-wellness/30">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-wellness/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-wellness" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">This Week</h3>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Bell className="w-5 h-5 mr-2" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  flex items-start space-x-4 p-4 rounded-lg border transition-colors
                  ${notification.read 
                    ? 'bg-muted/30 border-muted' 
                    : 'bg-wellness-light/10 border-wellness-light/30'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${notification.read ? 'bg-muted' : 'bg-wellness-light/20'}
                  ${getNotificationColor(notification.type, notification.priority)}
                `}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${
                      notification.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(notification.priority)}
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                  <p className={`text-sm ${
                    notification.read ? 'text-muted-foreground' : 'text-muted-foreground'
                  }`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-wellness hover:text-wellness/80">
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};