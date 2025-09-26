import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import StatCard from "@/components/dashboard/StatCard";
import RecentSessionsList from "@/components/dashboard/RecentSessionsList";
import PendingNotificationsList from "@/components/dashboard/PendingNotificationsList";
import { Users, Calendar, TrendingUp, Heart, LayoutDashboard, Bell, LogOut } from "lucide-react";

const TherapistDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.role !== "therapist") {
      navigate("/therapists");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Sample data for demonstration
  const sessions: {
    id: string;
    patientName: string;
    date: string;
    time: string;
    room: string;
    status: "completed" | "in-progress" | "pending";
    notes?: string;
  }[] = [
    {
      id: "1",
      patientName: "Amit Patel",
      date: "Sep 13, 2025",
      time: "6:11 PM",
      room: "Room 1",
      status: "completed",
      notes: "",
    },
    {
      id: "2",
      patientName: "Unknown Patient",
      date: "Dec 19, 2024",
      time: "4:00 PM",
      room: "Room 3",
      status: "completed",
      notes: "Swedana therapy completed. Good detoxification response observed.",
    },
  ];

  const notifications: {
    id: string;
    type: "follow-up" | "pre-treatment";
    title: string;
    description: string;
    priority: "low" | "high";
    sendDate: string;
  }[] = [
    {
      id: "1",
      type: "follow-up",
      title: "Follow-up Check-in",
      description: "How are you feeling after your recent Abhyanga therapy session? We'd love to hear about your progress and...",
      priority: "low",
      sendDate: "Dec 21, 10:00 AM",
    },
    {
      id: "2",
      type: "pre-treatment",
      title: "Pre-Treatment Instructions - Abhyanga Session",
      description: "Please remember to follow these instructions before your Abhyanga session tomorrow: - Avoid heavy meals...",
      priority: "high",
      sendDate: "Dec 20, 8:00 AM",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Calendar className="h-4 w-4" />
                    <span>Schedule</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Users className="h-4 w-4" />
                    <span>Patients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <TrendingUp className="h-4 w-4" />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="bg-green-100 p-3 rounded mb-3">
                  <p className="text-green-800 font-semibold">Active Patients</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded">
                  <p className="text-yellow-800 font-semibold">Today's Sessions</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Therapist's Dashboard</h1>
              <p className="text-gray-600">Welcome to your Panchakarma management center</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Manage Patients
              </Button>
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                + Schedule Session
              </Button>
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Patients"
              value={3}
              description="+3 registered"
              icon={Users}
              iconBgColor="bg-blue-200"
              iconColor="text-blue-700"
            />
            <StatCard
              title="Today's Sessions"
              value={0}
              description="0 in progress"
              icon={Calendar}
              iconBgColor="bg-green-200"
              iconColor="text-green-700"
            />
            <StatCard
              title="Completion Rate"
              value="100%"
              description="4 completed"
              icon={TrendingUp}
              iconBgColor="bg-purple-200"
              iconColor="text-purple-700"
            />
            <StatCard
              title="Avg. Rating"
              value={4.3}
              description="3 reviews"
              icon={Heart}
              iconBgColor="bg-pink-200"
              iconColor="text-pink-700"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentSessionsList sessions={sessions} />
            </div>
            <div>
              <PendingNotificationsList notifications={notifications} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TherapistDashboard;
