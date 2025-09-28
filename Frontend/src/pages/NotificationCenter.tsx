import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { LayoutDashboard, Calendar as CalendarIcon, Users, Bell, TrendingUp, LogOut, Plus } from "lucide-react";

const NotificationCenter = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const handleToAnalytics = () => {
    navigate("/therapist-dashboard/analytics");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Sample notifications data
  const notifications = [
    {
      id: "1",
      subject: "Follow-up Check-in",
      type: "follow-up",
      date: "Dec 21",
      status: "unread",
    },
    {
      id: "2",
      subject: "Pre-Treatment Instructions - Abhyanga Session",
      type: "pre-treatment",
      date: "Dec 20",
      status: "unread",
    },
    {
      id: "3",
      subject: "Session Reminder",
      type: "reminder",
      date: "Dec 19",
      status: "read",
    },
    {
      id: "4",
      subject: "Patient Feedback Requested",
      type: "follow-up",
      date: "Dec 18",
      status: "unread",
    },
    {
      id: "5",
      subject: "Treatment Update",
      type: "pre-treatment",
      date: "Dec 17",
      status: "read",
    },
  ];

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch = notif.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || notif.type === typeFilter;
    const matchesStatus = statusFilter === "all" || notif.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleMarkAllRead = () => {
    // Placeholder for marking all as read
    console.log("Mark all as read");
  };

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
                  <SidebarMenuButton>
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleToAnalytics}>
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
              <p className="text-gray-600">Notification Center</p>
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

          <p className="text-gray-600 mb-6">Manage patient communications and alerts</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Notification
            </Button>
            <Button variant="outline">Export</Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Input
              placeholder="Search notifications by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Type:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="pre-treatment">Pre-treatment</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              Mark All Read
            </Button>
          </div>

          {/* Notifications Table */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">All Notifications ({filteredNotifications.length})</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell className="font-medium">{notif.subject}</TableCell>
                    <TableCell>{notif.type.replace('-', ' ').toUpperCase()}</TableCell>
                    <TableCell>{notif.date}</TableCell>
                    <TableCell>
                      <Badge variant={notif.status === "unread" ? "default" : "secondary"} className={notif.status === "unread" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {notif.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredNotifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No notifications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default NotificationCenter;
