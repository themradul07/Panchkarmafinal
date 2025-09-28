import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Users,
  Calendar,
  TrendingUp,
  Heart,
  LayoutDashboard,
  Bell,
  Activity,
  LogOut,
} from "lucide-react";

/* ---------- StatCard ---------- */
const StatCard = ({ title, value, subtitle, icon: Icon, accentColor, iconBg }: any) => (
  <div className="bg-white rounded-xl border p-5 flex justify-between items-center shadow">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-green-600">{subtitle}</p>
    </div>
    <div className={`p-3 rounded-full ${iconBg}`}>
      <Icon className={`w-6 h-6 ${accentColor}`} />
    </div>
  </div>
);

/* ---------- RecentSessions ---------- */
const RecentSessionsList = ({ sessions }: any) => (
  <div className="bg-white p-5 rounded-xl border shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Recent Sessions</h2>
      <Button variant="ghost" size="sm" className="text-green-600">
        View All →
      </Button>
    </div>
    <ul className="space-y-4">
      {sessions.map((s: any) => (
        <li key={s.id} className="border rounded-lg p-4 flex justify-between items-start hover:bg-gray-50">
          <div>
            <p className="font-semibold text-gray-800">{s.patientName}</p>
            <p className="text-sm text-gray-500 flex gap-2">
              <span>{s.date}</span> • <span>{s.time}</span> •{" "}
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md text-xs">
                Room {s.room}
              </span>
            </p>
            {s.notes && <p className="text-xs text-gray-400 mt-1">{s.notes}</p>}
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 self-center">
            {s.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- Notifications ---------- */
const PendingNotificationsList = ({ notifications }: any) => (
  <div className="bg-white p-5 rounded-xl border shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Pending Notifications</h2>
      <Button variant="ghost" size="sm" className="text-green-600">
        View All →
      </Button>
    </div>
    <ul className="space-y-4">
      {notifications.map((n: any) => (
        <li key={n.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-gray-800">{n.title}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                n.priority === "high"
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-yellow-50 text-yellow-600 border border-yellow-200"
              }`}
            >
              {n.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600">{n.description}</p>
          <p className="text-xs text-gray-400 mt-1">Send at: {n.sendDate}</p>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- Main Dashboard ---------- */
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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  /* Sample Data */
  const sessions = [
    { id: "1", patientName: "Amit Patel", date: "Sep 13, 2025", time: "6:11 PM", room: "1", status: "completed" },
    { id: "2", patientName: "Unknown Patient", date: "Dec 19, 2024", time: "4:00 PM", room: "3", status: "completed", notes: "Swedana therapy completed. Good detoxification response observed." },
    { id: "3", patientName: "John Doe", date: "Dec 25, 2024", time: "2:00 PM", room: "2", status: "pending", notes: "Prepare for Abhyanga session." },
  ];

  const notifications = [
    { id: "1", title: "Follow-up Check-in", description: "How are you feeling after your recent Abhyanga therapy session? We'd love to hear about your progress...", priority: "low", sendDate: "Dec 21, 10:00 AM" },
    { id: "2", title: "Pre-Treatment Instructions - Abhyanga Session", description: "Please remember to follow these instructions before your Abhyanga session tomorrow: - Avoid heavy meals...", priority: "high", sendDate: "Dec 20, 8:00 AM" },
  ];

  const recentSessions = sessions.filter((s) => s.status === "completed");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gradient-to-b from-[#f9fff9] to-[#fffdf5]">
        {/* Sidebar */}
        <Sidebar className="bg-white border-r shadow-sm">
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 tracking-wide">
                NAVIGATION
              </SidebarGroupLabel>
              <SidebarMenu className="mt-2 space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton className="bg-green-100 text-green-700 font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/therapist-dashboard/schedule")}>
                    <Calendar className="h-4 w-4" />
                    <span>Schedule</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/therapist-dashboard/patients")}>
                    <Users className="h-4 w-4" />
                    <span>Patients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/therapist-dashboard/notifications")}>
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/therapist-dashboard/progress")}>
                    <Activity className="h-4 w-4" />
                    <span>Progress Tracking</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            {/* Quick Stats */}
            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-orange-500 tracking-wide">
                QUICK STATS
              </SidebarGroupLabel>
              <SidebarMenu className="mt-2 space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton className="bg-green-50 text-green-700 flex justify-between">
                    <span>Active Patients</span>
                    <span>0</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="bg-yellow-50 text-yellow-700 flex justify-between">
                    <span>Today's Sessions</span>
                    <span>0</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            {/* Practitioner */}
            <div className="mt-auto p-4 text-sm">
              <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                <div className="bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">
                  P
                </div>
                <div>
                  <p className="font-semibold">Practitioner</p>
                  <p className="text-xs text-gray-500">Ayurveda Specialist</p>
                </div>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="p-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Welcome to your Panchakarma management center</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2 border-green-600 text-green-600">
                <Users className="w-5 h-5" />
                Manage Patients
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">+ Schedule Session</Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 border-red-600 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Patients" value={3} subtitle="+3 registered" icon={Users} accentColor="text-blue-600" iconBg="bg-blue-100" />
            <StatCard title="Today's Sessions" value={0} subtitle="0 in progress" icon={Calendar} accentColor="text-green-600" iconBg="bg-green-100" />
            <StatCard title="Completion Rate" value="100%" subtitle="4 completed" icon={TrendingUp} accentColor="text-purple-600" iconBg="bg-purple-100" />
            <StatCard title="Avg. Rating" value={4.3} subtitle="3 reviews" icon={Heart} accentColor="text-pink-600" iconBg="bg-pink-100" />
          </div>

          {/* Bottom Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentSessionsList sessions={recentSessions} />
            </div>
            <div className="lg:col-span-1">
              <PendingNotificationsList notifications={notifications} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TherapistDashboard;
