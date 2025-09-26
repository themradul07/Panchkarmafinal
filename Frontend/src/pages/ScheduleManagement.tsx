import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
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
import { LayoutDashboard, Calendar as CalendarIcon, Users, Bell, TrendingUp, LogOut, Plus, Eye, Filter } from "lucide-react";
import { format } from "date-fns";

const ScheduleManagement = () => {
  const [user, setUser] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
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

  const handleBackToDashboard = () => {
    navigate("/therapist-dashboard");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Sample empty sessions data
  const sessions: {
    id: string;
    patientName: string;
    date: string;
    time: string;
    status: "scheduled" | "completed" | "cancelled";
  }[] = [];

  const selectedDate = date ? format(date, "MMMM do, yyyy") : "";

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleBackToDashboard}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <CalendarIcon className="h-4 w-4" />
                    <span>Schedule</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/therapist-dashboard/patients')}>
                    <Users className="h-4 w-4" />
                    <span>Patients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/therapist-dashboard/notifications')}>
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/therapist-dashboard/analytics')}>
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
              <h1 className="text-3xl font-bold text-gray-900">Panchakarma Manager</h1>
              <p className="text-gray-600">Schedule Management</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Manage Patients
              </Button>
              <Button onClick={handleBackToDashboard} variant="outline" className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Back to Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <CalendarIcon className="h-6 w-6 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Select Date</label>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </div>

          {/* Sessions Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sessions {selectedDate}</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                All Status
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button size="sm" className="flex items-center gap-1 bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4" />
                New Session
              </Button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions scheduled</h3>
                <p className="text-gray-500">There are no sessions scheduled for this date.</p>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ScheduleManagement;
