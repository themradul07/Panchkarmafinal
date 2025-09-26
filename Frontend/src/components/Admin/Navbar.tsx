import { Home, Users, MessageSquare, Settings, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
    { name: "Therapists", icon: <Users size={18} />, path: "/admin/therapists" },
    { name: "Feedback", icon: <MessageSquare size={18} />, path: "/admin/feedback" },
    { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
  ];
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
      if (parsedUser.role !== "admin") {
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

  return (

    
    <div className="h-screen  w-64 bg-gray-50  border-r border-gray-200 flex flex-col justify-between">
      {/* Top Logo Section */}
      <div>
        <div className="p-6 flex items-center gap-2">
          <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-md font-bold">
            P
          </div>
          <div>
            <h1 className="font-bold text-gray-800">Panchakarma</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium 
                hover:bg-green-100 transition
                ${isActive ? "bg-green-100 text-green-700" : "text-gray-700"}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <button onClick={handleLogout} className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

