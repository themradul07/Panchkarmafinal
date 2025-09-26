import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "follow-up" | "pre-treatment";
  title: string;
  description: string;
  priority: "low" | "high";
  sendDate: string;
}

interface PendingNotificationsListProps {
  notifications: Notification[];
}

const priorityColorMap = {
  low: "bg-gray-100 text-gray-800",
  high: "bg-red-100 text-red-800",
};

const iconMap = {
  "follow-up": Bell,
  "pre-treatment": Clock,
};

const PendingNotificationsList: React.FC<PendingNotificationsListProps> = ({ notifications }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Pending Notifications</CardTitle>
        <button className="text-sm text-green-600 hover:underline">→</button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <li key={notification.id} className="border-b border-gray-200 pb-3 last:border-none">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span>{notification.title}</span>
                  <Badge className={`${priorityColorMap[notification.priority]} ml-auto`}>
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mt-1">{notification.description}</p>
                <p className="text-xs text-gray-500 mt-1">Send at: {notification.sendDate}</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PendingNotificationsList;
