import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const PatientManagement = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleToAnalytics = () => {
    navigate("/therapist-dashboard/analytics");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Sample patients data
  const patients = [
    {
      id: "1",
      name: "Raj Kumar",
      contact: "+91-9876543210",
      status: "Active",
      dateAdded: "Sep 15, 2024",
    },
    {
      id: "2",
      name: "Priya Sharma",
      contact: "+91-9876543211",
      status: "Active",
      dateAdded: "Sep 14, 2024",
    },
    {
      id: "3",
      name: "Amit Patel",
      contact: "+91-9876543212",
      status: "Active",
      dateAdded: "Sep 13, 2024",
    },
  ];

  // Filter patients based on search
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <SidebarMenuButton>
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
              <p className="text-gray-600">Patient Management</p>
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

          {/* Search Bar */}
          <div className="mb-6">
            <Input
              placeholder="Search by name, email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Patients Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">All Patients ({filteredPatients.length})</h2>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </div>

          {/* Patients Table */}
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.contact}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {patient.status}
                      </span>
                    </TableCell>
                    <TableCell>{patient.dateAdded}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PatientManagement;
