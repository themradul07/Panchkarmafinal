import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
import { LayoutDashboard, Calendar as CalendarIcon, Users, Bell, TrendingUp, LogOut } from "lucide-react";

const ProgressTracking = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("last-30-days");
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

  const handleToSchedule = () => {
    navigate("/therapist-dashboard/schedule");
  };

  const handleToPatients = () => {
    navigate("/therapist-dashboard/patients");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Sample data for charts
  const overviewData = [
    { value: "1", label: "Completed", color: "bg-pink-500" },
    { value: "4.3", label: "Avg Rating", color: "bg-purple-500" },
    { value: "3.8", label: "Sessions", color: "bg-blue-500" },
    { value: "7.1", label: "Hours", color: "bg-indigo-500" },
    { value: "100%", label: "Effectiveness", color: "bg-green-500" },
  ];

  const individualProgress = [
    { name: "Patient A", progress: 80, color: "bg-green-500" },
    { name: "Patient B", progress: 60, color: "bg-blue-500" },
    { name: "Patient C", progress: 90, color: "bg-purple-500" },
  ];

  const therapyDistribution = [
    { type: "Abhyanga", percentage: 60, color: "bg-green-500" },
    { type: "Swedana", percentage: 40, color: "bg-blue-500" },
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
                  <SidebarMenuButton onClick={handleBackToDashboard}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleToSchedule}>
                    <CalendarIcon className="h-4 w-4" />
                    <span>Schedule</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleToPatients}>
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
                  <p className="text-2xl font-bold">3</p>
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
              <p className="text-gray-600">Progress Tracking</p>
            </div>
            <div className="flex gap-4">
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

          <p className="text-gray-600 mb-6">Monitor outcomes and treatment effectiveness</p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Period:</span>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Search by patient name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline">Export</Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {overviewData.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border shadow-sm text-center">
                <div className={`mx-auto w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-2`}>
                  <span className="text-white text-sm font-bold">{item.value}</span>
                </div>
                <p className="text-xs text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Individual Progress */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Individual Progress</h3>
              {individualProgress.map((prog, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{prog.name}</span>
                    <span className="text-sm text-gray-600">{prog.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${prog.color}`}
                      style={{ width: `${prog.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Therapy Distribution - Simple Pie */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Therapy Distribution</h3>
              <div className="relative w-48 h-48 mx-auto">
                {/* Outer pie */}
                <div className="absolute inset-0 w-full h-full rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(0 0, 60% 0, 60% 60%, 0 60%)' }} />
                <div className="absolute inset-0 w-full h-full rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 60% 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">100%</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Abhyanga: 60%</p>
                <p className="text-sm text-gray-600">Swedana: 40%</p>
              </div>
            </div>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Treatment Effectiveness - Placeholder Line */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Treatment Effectiveness</h3>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Line Chart Placeholder</p>
              </div>
            </div>

            {/* Patient Rating Distribution - Vertical Bars */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Patient Rating Distribution</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="w-6 text-sm">{rating}</span>
                    <div className="flex-1 h-8 bg-gray-200 rounded">
                      <div
                        className="h-8 bg-green-500 rounded"
                        style={{ width: `${rating * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProgressTracking;
